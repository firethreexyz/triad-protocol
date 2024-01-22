import {
  Connection,
  PublicKey,
  TransactionInstruction,
  VersionedTransaction,
  TransactionMessage
} from '@solana/web3.js'
import { IDL, Triad } from './types/triad'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { decodeName, encodeName } from './utils/name'
import { TRIAD_PROGRAM_ID } from './constants/program'
import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import {
  getDepositorAddressSync,
  getTokenVaultAddressSync,
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
   * Get all vaults
   */
  async getVaults() {
    const vaults = await this.program.account.vault.all()

    return vaults.map((vault) => ({
      name: decodeName(vault.account.name),
      tokenAccount: vault.account.tokenAccount
    }))
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

    const DepositorPDA = getDepositorAddressSync(
      this.program.programId,
      VaultPDA,
      this.wallet.publicKey
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
          depositor: DepositorPDA
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
        vaultTokenAccount: VaultTokenAccountPDA,
        userTokenAccount
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
