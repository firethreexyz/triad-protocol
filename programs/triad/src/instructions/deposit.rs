use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::constraints::{is_authority_for_depositor, is_token_mint_for_vault};
use crate::cpi::TokenTransferCPI;
use crate::errors::GenericError;
use crate::state::{Depositor, Vault};

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        seeds = [Depositor::PREFIX_SEED.as_ref(), vault.key().as_ref(), signer.key.as_ref()],
        bump,
        constraint = is_authority_for_depositor(&depositor, &signer)?,
    )]
    pub depositor: Account<'info, Depositor>,

    #[account(
        mut,
        seeds = [Vault::PREFIX_SEED_VAULT_TOKEN_ACCOUNT.as_ref(), vault.key().as_ref()],
        bump,
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        token::authority = depositor.authority,
        token::mint = vault_token_account.mint
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,
}

pub fn deposit<'info>(ctx: Context<'_, '_, '_, 'info, Deposit<'info>>, amount: u64) -> Result<()> {
    let depositor = &mut ctx.accounts.depositor;

    if depositor.authority != *ctx.accounts.signer.key {
        return Err(GenericError::InvalidAccount.into());
    }

    if !is_token_mint_for_vault(
        &ctx.accounts.vault_token_account.mint,
        &ctx.accounts.user_token_account.mint,
    )? {
        return Err(GenericError::InvalidMintAddress.into());
    }

    ctx.token_transfer(amount)?;

    Ok(())
}

impl<'info> TokenTransferCPI for Context<'_, '_, '_, 'info, Deposit<'info>> {
    fn token_transfer(&self, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: self.accounts.user_token_account.to_account_info().clone(),
            to: self.accounts.vault_token_account.to_account_info().clone(),
            authority: self.accounts.signer.to_account_info().clone(),
        };
        let token_program = self.accounts.token_program.to_account_info().clone();
        let cpi_context = CpiContext::new(token_program, cpi_accounts);

        token::transfer(cpi_context, amount)?;

        Ok(())
    }
}
