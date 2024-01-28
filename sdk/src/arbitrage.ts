import { Program, Wallet } from '@coral-xyz/anchor'
import { Connection } from '@solana/web3.js'
import { encodeName } from './utils/name'
import { getVaultAddressSync } from './utils/addresses'
import { Triad } from 'triad'
import { } from '@firethreexyz/firethree-protocol'

export default class ArbitrageClient {
  program: Program<Triad>
  connection: Connection
  wallet: Wallet

  constructor(connection: Connection, wallet: Wallet) {
    this.connection = connection
    this.wallet = wallet
  }

  public async getHistoryByUser() {}

  public async getLogsByVault(vaultName: string) {}

  public async getVaultChart(vaultName: string) {
    const encodeVaultName = encodeName(vaultName)
    const VaultPDA = getVaultAddressSync(
      this.program.programId,
      encodeVaultName
    )
  }
}
