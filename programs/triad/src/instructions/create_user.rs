use anchor_lang::prelude::*;

use crate::state::{CreateUserArgs, User};

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(init, payer = signer, space = User::SPACE, seeds = [User::PREFIX_SEED.as_ref(), signer.key.as_ref()], bump)]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

pub fn create_user(ctx: Context<CreateUser>, args: CreateUserArgs) -> Result<()> {
    let user = &mut ctx.accounts.user;

    user.bump = *ctx.bumps.get("user").unwrap();
    user.authority = *ctx.accounts.signer.key;
    user.referral = args.referral;

    Ok(())
}
