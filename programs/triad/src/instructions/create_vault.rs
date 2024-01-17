use anchor_lang::prelude::*;

use crate::errors::GenericError;
use crate::state::{CreateVaultArgs, Vault};

#[derive(Accounts)]
#[instruction(args: CreateVaultArgs)]
pub struct CreateVault<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    pub authority: Signer<'info>,

    #[account(init, payer = payer, space = Vault::SPACE, seeds = [Vault::PREFIX_SEED.as_ref(), args.name.as_ref()], bump)]
    pub vault: AccountLoader<'info, Vault>,

    /// CHECK: checked in `create_vault`
    pub triad_signer: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

pub fn create_vault(ctx: Context<CreateVault>, args: CreateVaultArgs) -> Result<()> {
    let vault = &mut ctx.accounts.vault.load_init()?;

    let (triad_signer, triad_signer_nonce) =
        Pubkey::find_program_address(&[b"triad_signer".as_ref()], ctx.program_id);

    if vault.authority != triad_signer {
        return Err(GenericError::InvalidAccount.into());
    }

    vault.bump = *ctx.bumps.get("vault").unwrap();
    vault.authority = *ctx.accounts.payer.key;
    vault.name = args.name;
    vault.token = args.token;
    vault.triad_signer = triad_signer;
    vault.triad_signer_nonce = triad_signer_nonce;

    Ok(())
}
