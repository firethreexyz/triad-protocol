use anchor_lang::prelude::*;

use crate::{
    errors::GenericError,
    state::{PayPassArgs, User},
};

#[derive(Accounts)]
pub struct PayPass<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    pub authority: Signer<'info>,

    #[account(
        seeds = [
            User::PREFIX_SEED.as_ref(),
            payer.key.as_ref()
        ],
        bump = user.bump,
        has_one = authority @ GenericError::Unauthorized
    )]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn pay_pass(ctx: Context<PayPass>, args: PayPassArgs) -> Result<()> {
    if ctx.accounts.payer.key != ctx.accounts.authority.key {
        return Err(GenericError::Unauthorized.into());
    }

    let user = &mut ctx.accounts.user;

    user.pass = args.pass;

    Ok(())
}
