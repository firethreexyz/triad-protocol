use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::constraints::is_authority_for_depositor;
use crate::cpi::TokenTransferCPI;
use crate::errors::GenericError;
use crate::state::{Depositor, Vault};

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        seeds = [Depositor::PREFIX_SEED.as_ref(), vault.key().as_ref(), authority.key.as_ref()],
        bump,
        constraint = is_authority_for_depositor(&depositor, &authority)?,
    )]
    pub depositor: Account<'info, Depositor>,

    #[account(
        mut,
        seeds = [Vault::PREFIX_SEED_VAULT_TOKEN_ACCOUNT.as_ref(), vault.key().as_ref()],
        bump,
    )]
    pub vault_token_account: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::authority = authority,
        token::mint = vault_token_account.mint
    )]
    pub user_token_account: Box<Account<'info, TokenAccount>>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,
}

pub fn deposit<'info>(ctx: Context<'_, '_, '_, 'info, Deposit<'info>>, amount: u64) -> Result<()> {
    let depositor = &mut ctx.accounts.depositor;

    if depositor.authority != *ctx.accounts.authority.key {
        return Err(GenericError::InvalidAccount.into());
    }

    ctx.token_transfer(amount)?;

    Ok(())
}

impl<'info> TokenTransferCPI for Context<'_, '_, '_, 'info, Deposit<'info>> {
    fn token_transfer(&self, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: self.accounts.user_token_account.to_account_info().clone(),
            to: self.accounts.vault_token_account.to_account_info().clone(),
            authority: self.accounts.authority.to_account_info().clone(),
        };
        let token_program = self.accounts.token_program.to_account_info().clone();
        let cpi_context = CpiContext::new(token_program, cpi_accounts);

        token::transfer(cpi_context, amount)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateDepositor<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    pub authority: Signer<'info>,

    pub vault: Account<'info, Vault>,

    #[account(init, payer = payer, space = Depositor::SPACE, seeds = [Depositor::PREFIX_SEED.as_ref(), vault.key().as_ref(), authority.key.as_ref()], bump)]
    pub depositor: Account<'info, Depositor>,

    pub system_program: Program<'info, System>,
}

pub fn create_depositor(ctx: Context<CreateDepositor>) -> Result<()> {
    let depositor = &mut ctx.accounts.depositor;

    depositor.bump = *ctx.bumps.get("vault-depositor").unwrap();
    depositor.authority = *ctx.accounts.authority.key;

    Ok(())
}
