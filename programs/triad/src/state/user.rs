use anchor_lang::prelude::*;

#[account]
pub struct User {
    pub bump: u8,
    pub pass_type: PassType,
    pub authority: Pubkey,
    pub referral: Pubkey,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize, PartialEq)]
pub enum PassType {
    EXPIRED,
    MONTHLY,
    SEMIANNUAL,
    ANNUAL,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CreateUserArgs {
    pub referral: Pubkey,
}

impl User {
    /// static prefix seed string used to derive the PDAs
    pub const PREFIX_SEED: &[u8] = b"user";

    /// total on-chain space needed to allocate the account
    pub const SPACE: usize =
        // anchor descriminator + all static variables
        8 + std::mem::size_of::<Self>();
}
