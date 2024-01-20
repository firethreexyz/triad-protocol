use anchor_lang::prelude::*;

#[account]
pub struct Depositor {
    pub bump: u8,
    pub authority: Pubkey,
    pub vault: Pubkey,
    pub total_deposit: u64,
    pub total_withdrawal: u64,
    pub net_deposit: i64,
    pub lp_shares: u64,
    pub user: Pubkey,
}

impl Depositor {
    /// static prefix seed string used to derive the PDAs
    pub const PREFIX_SEED: &[u8] = b"depositor";

    /// total on-chain space needed to allocate the account
    pub const SPACE: usize =
        // anchor descriminator + all static variables
        8 + std::mem::size_of::<Self>();
}
