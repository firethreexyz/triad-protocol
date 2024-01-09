use anchor_lang::prelude::*;

use instructions::*;
use state::*;

pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("Fire3T9ABT33UYoVJZwWUnbPR3rgoVw98y82UgHZ8Bm");

#[program]
pub mod triad {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, args: CreateUserArgs) -> Result<()> {
        instructions::create_user(ctx, args)
    }

    pub fn add_plan(ctx: Context<AddPlan>, args: AddPlanArgs) -> Result<()> {
        instructions::add_plan(ctx, args)
    }
}
