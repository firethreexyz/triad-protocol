use anchor_lang::prelude::*;

use crate::state::{Depositor, Vault};

#[derive(Accounts)]
pub struct CreateDepositor<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    pub vault: Account<'info, Vault>,

    #[account(init, payer = signer, space = Depositor::SPACE, seeds = [Depositor::PREFIX_SEED.as_ref(), vault.key().as_ref(), signer.key().as_ref()], bump)]
    pub depositor: Account<'info, Depositor>,

    pub system_program: Program<'info, System>,
}

pub fn create_depositor(ctx: Context<CreateDepositor>) -> Result<()> {
    let depositor = &mut ctx.accounts.depositor;

    depositor.bump = *ctx.bumps.get("depositor").unwrap();
    depositor.authority = ctx.accounts.signer.key();
    depositor.vault = ctx.accounts.vault.key();
    depositor.total_deposit = 0;
    depositor.total_withdrawal = 0;
    depositor.net_deposit = 0;
    depositor.lp_shares = 0;

    Ok(())
}
