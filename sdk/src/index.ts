import { AnchorProvider, Program } from '@project-serum/anchor'
import { Wallet } from './types/wallet'
import { Connection } from '@solana/web3.js'
import { IDL, Triad } from './types/triad'

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

  public async createUser() {
    this.program.methods.createUser().transaction()
  }

  public async payPass() {}

  public async createVault() {}

  public async deposit() {}

  public async withdraw() {}

  public async withdrawFees() {}
}
