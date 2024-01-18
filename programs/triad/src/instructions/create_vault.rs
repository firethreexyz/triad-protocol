use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::errors::GenericError;
use crate::state::{CreateVaultArgs, Vault};

#[derive(Accounts)]
#[instruction(args: CreateVaultArgs)]
pub struct CreateVault<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    pub authority: Signer<'info>,

    #[account(init, payer = payer, space = Vault::SPACE, seeds = [Vault::PREFIX_SEED.as_ref(), args.name.as_ref()], bump)]
    pub vault: Account<'info, Vault>,

    pub payer_token_mint: Box<Account<'info, Mint>>,

    #[account(
        init,
        seeds = [Vault::PREFIX_SEED_VAULT_TOKEN_ACCOUNT.as_ref(), vault.key().as_ref()],
        bump,
        payer = payer,
        token::mint = payer_token_mint,
        token::authority = vault
    )]
    pub token_account: Box<Account<'info, TokenAccount>>,

    pub triad_signer: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,
}

pub fn create_vault(ctx: Context<CreateVault>, args: CreateVaultArgs) -> Result<()> {
    let vault = &mut ctx.accounts.vault;

    let (triad_signer, triad_signer_nonce) =
        Pubkey::find_program_address(&[b"triad_signer".as_ref()], ctx.program_id);

    if vault.authority != triad_signer {
        return Err(GenericError::InvalidAccount.into());
    }

    vault.bump = *ctx.bumps.get("vault").unwrap();
    vault.authority = *ctx.accounts.authority.key;
    vault.name = args.name;
    vault.triad_signer = triad_signer;
    vault.triad_signer_nonce = triad_signer_nonce;
    vault.token_account = *ctx.accounts.token_account.to_account_info().key;

    Ok(())
}
