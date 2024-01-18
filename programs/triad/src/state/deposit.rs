use anchor_lang::prelude::*;

#[account]
pub struct Depositor {
    pub bump: u8,
    pub authority: Pubkey,
}

impl Depositor {
    /// static prefix seed string used to derive the PDAs
    pub const PREFIX_SEED: &[u8] = b"depositor";

    /// total on-chain space needed to allocate the account
    pub const SPACE: usize =
        // anchor descriminator + all static variables
        8 + std::mem::size_of::<Self>();
}
