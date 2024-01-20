import {
  Connection,
  PublicKey,
  TransactionInstruction,
  VersionedTransaction,
  TransactionMessage
} from '@solana/web3.js'
import { IDL, Triad } from './types/triad'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { encodeName } from './utils/name'
import { TRIAD_PROGRAM_ID } from './constants/program'
import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import {
  getDepositorAddressSync,
  getTokenVaultAddressSync,
  getUserAddressSync,
  getVaultAddressSync
} from './utils/addresses'
import { BN } from 'bn.js'

export default class TriadClient {
  program: Program<Triad>
  provider: AnchorProvider
  connection: Connection
  wallet: Wallet

  constructor(connection: Connection, wallet: Wallet) {
    this.connection = connection
    this.wallet = wallet
    this.provider = new AnchorProvider(
      this.connection,
      this.wallet,
      AnchorProvider.defaultOptions()
    )
    this.program = new Program<Triad>(IDL, TRIAD_PROGRAM_ID, this.provider)
  }

  /**
   * Create a new user
   *  @param referral - The user's referral
   */
  public async createUser({ referral }: { referral: PublicKey }) {
    const UserPDA = getUserAddressSync(
      this.program.programId,
      this.wallet.publicKey
    )

    return this.program.methods
      .createUser({
        referral
      })
      .accounts({
        signer: this.wallet.publicKey,
        user: UserPDA
      })
      .rpc()
  }

  /**
   * Create a new vault
   *  @param name - The vault's name
   *  @param mint - Token mint for the vault (e.g. USDC)
   */
  public async createVault({ name, mint }: { name: string; mint: PublicKey }) {
    const vaultName = encodeName(name)

    const VaultPDA = getVaultAddressSync(this.program.programId, vaultName)
    const TokenAccountPDA = getTokenVaultAddressSync(
      this.program.programId,
      VaultPDA
    )

    return this.program.methods
      .createVault({
        name: vaultName
      })
      .accounts({
        signer: this.wallet.publicKey,
        triadSigner: this.wallet.publicKey,
        vault: VaultPDA,
        tokenAccount: TokenAccountPDA,
        payerTokenMint: mint
      })
      .rpc()
  }

  /**
   * Create a new vault
   *  @param vault - The vault's name
   *  @param amount - The amount to deposit
   *  @param mint - Token mint for the vault (e.g. USDC)
   */
  public async deposit({
    vault,
    amount,
    mint
  }: {
    vault: string
    amount: string
    mint: PublicKey
  }) {
    const vaultName = encodeName(vault)

    const VaultPDA = getVaultAddressSync(this.program.programId, vaultName)

    let vaultData = null
    try {
      vaultData = await this.program.account.vault.fetch(VaultPDA)
    } catch {
      throw new Error('Vault does not exist')
    }

    const UserPDA = getUserAddressSync(
      this.program.programId,
      this.wallet.publicKey
    )

    const DepositorPDA = getDepositorAddressSync(
      this.program.programId,
      VaultPDA,
      UserPDA
    )

    let hasDepositor = true
    try {
      await this.program.account.depositor.fetch(DepositorPDA)
    } catch {
      hasDepositor = false
    }

    let ix: TransactionInstruction[] = []

    if (!hasDepositor) {
      const depositorIx = await this.program.methods
        .createDepositor()
        .accounts({
          vault: VaultPDA,
          depositor: DepositorPDA,
          user: UserPDA
        })
        .instruction()

      ix.push(depositorIx)
    }

    const VaultTokenAccountPDA = getTokenVaultAddressSync(
      this.program.programId,
      VaultPDA
    )

    const userTokenAccount = await getAssociatedTokenAddress(
      mint,
      this.wallet.publicKey
    )

    const depositIx = await this.program.methods
      .deposit(new BN(amount))
      .accounts({
        depositor: DepositorPDA,
        vault: VaultPDA,
        user: UserPDA,
        vaultTokenAccount: VaultTokenAccountPDA,
        userTokenAccount: userTokenAccount
      })
      .instruction()

    ix.push(depositIx)

    const { blockhash } = await this.connection.getLatestBlockhash()

    const message = new TransactionMessage({
      payerKey: this.wallet.publicKey,
      recentBlockhash: blockhash,
      instructions: ix
    }).compileToV0Message()

    const transaction = new VersionedTransaction(message)

    await this.wallet.signTransaction(transaction)

    return this.connection.sendRawTransaction(transaction.serialize())
  }

  public async withdraw() {}

  public async withdrawFees() {}
}
