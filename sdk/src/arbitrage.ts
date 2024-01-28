import { Program, Wallet } from '@coral-xyz/anchor'
import { Connection } from '@solana/web3.js'
import { encodeName } from './utils/name'
import { getVaultAddressSync } from './utils/addresses'
import { Triad } from 'triad'
import { mockLogs } from './utils/logs'

export default class ArbitrageClient {
  program: Program<Triad>
  connection: Connection
  wallet: Wallet

  constructor(connection: Connection, wallet: Wallet) {
    this.connection = connection
    this.wallet = wallet
  }

  public async getHistoryByUser() {}

  public async getLogsByVault(vaultName: string) {
    const encodeVaultName = encodeName(vaultName)
    const VaultPDA = getVaultAddressSync(
      this.program.programId,
      encodeVaultName
    )

    const logs = {
      data: {
        items: mockLogs
      }
    }

    return logs
  }

  public async getVaultChart(vaultName: string) {
    const encodeVaultName = encodeName(vaultName)
    const VaultPDA = getVaultAddressSync(
      this.program.programId,
      encodeVaultName
    )

    const charts = Array.from({ length: 1000 }, (_, i) => {
      return {
        t: new Date().getTime() - i * 24 * 60 * 60 * 1000,
        v: Math.random() * 1000
      }
    })

    return charts
  }
}
