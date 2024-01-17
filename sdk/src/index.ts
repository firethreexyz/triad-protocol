import { AnchorProvider, Program } from '@project-serum/anchor'
import { Wallet } from './types/wallet'
import { Connection, PublicKey } from '@solana/web3.js'
import { IDL, Triad } from './types/triad'
import { encodeName } from './utils/name'
import { TRIAD_PROGRAM_ID } from './constants/program'

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

  public async createUser({ referral }: { referral: PublicKey }) {
    const [UserPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('user'), this.wallet.publicKey.toBuffer()],
      this.program.programId
    )

    return this.program.methods
      .createUser({
        referral
      })
      .accounts({
        payer: this.wallet.publicKey,
        authority: this.wallet.publicKey,
        user: UserPDA
      })
      .rpc()
  }

  public async createVault() {
    const [VaultPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('vault'), this.wallet.publicKey.toBuffer()],
      this.program.programId
    )

    return this.program.methods
      .createVault({
        name: encodeName('Vault'),
        token: new PublicKey('')
      })
      .accounts({
        payer: this.wallet.publicKey,
        authority: this.wallet.publicKey,
        vault: VaultPDA
      })
      .rpc()
  }

  public async deposit() {}

  public async withdraw() {}

  public async withdrawFees() {}
}

export class Plan {
  static readonly EXPIRED = { expired: {} }
  static readonly MONTHLY = { monthly: {} }
  static readonly SEMIANNUAL = { semiannual: {} }
  static readonly ANNUAL = { annual: {} }
}
