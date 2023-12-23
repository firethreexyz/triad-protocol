use anchor_lang::prelude::*;

use instructions::*;
use state::*;

pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("2PgNpnkxketjx182nMSq9HeX24Wc5ZLEe55nwPgETvA6");

#[program]
pub mod triad {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, args: CreateUserArgs) -> Result<()> {
        instructions::create_user(ctx, args)
    }
}
