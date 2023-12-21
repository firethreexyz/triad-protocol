use anchor_lang::prelude::*;

use crate::state::User;

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(init, payer = payer, space = User::SPACE, seeds = [User::PREFIX_SEED.as_ref(), payer.key.as_ref()], bump)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn create_user(ctx: Context<CreateUser>) -> Result<()> {
    let user = &mut ctx.accounts.user;

    user.bump = *ctx.bumps.get("user").unwrap();
    user.authority = *ctx.accounts.payer.key;

    Ok(())
}
