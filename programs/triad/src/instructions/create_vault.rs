use anchor_lang::prelude::*;

use crate::state::{CreateVaultArgs, Vault};

#[derive(Accounts)]
#[instruction(args: CreateVaultArgs)]
pub struct CreateVault<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    pub authority: Signer<'info>,

    #[account(init, payer = payer, space = Vault::SPACE, seeds = [Vault::PREFIX_SEED.as_ref(), args.name.as_ref()], bump)]
    pub vault: AccountLoader<'info, Vault>,

    pub system_program: Program<'info, System>,
}

pub fn create_vault(ctx: Context<CreateVault>, args: CreateVaultArgs) -> Result<()> {
    let vault = &mut ctx.accounts.vault.load_init()?;

    vault.bump = *ctx.bumps.get("vault").unwrap();
    vault.authority = *ctx.accounts.payer.key;
    vault.name = args.name;
    vault.token = args.token;

    Ok(())
}
