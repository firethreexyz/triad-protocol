use crate::state::{Vault, VaultDepositor};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreateVaultDepositor<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    pub vault: AccountLoader<'info, Vault>,

    #[account(init, payer = payer, space = VaultDepositor::SPACE, seeds = [VaultDepositor::PREFIX_SEED.as_ref(), vault.key().as_ref(), payer.key.as_ref()], bump)]
    pub vault_depositor: Account<'info, VaultDepositor>,

    pub system_program: Program<'info, System>,
}

pub fn create_vault_depositor(ctx: Context<CreateVaultDepositor>) -> Result<()> {
    let vault_depositor = &mut ctx.accounts.vault_depositor;

    vault_depositor.bump = *ctx.bumps.get("vault-depositor").unwrap();

    Ok(())
}
