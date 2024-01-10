use anchor_lang::prelude::*;

#[account]
pub struct VaultDepositor {
    pub bump: u8,
}

impl VaultDepositor {
    /// static prefix seed string used to derive the PDAs
    pub const PREFIX_SEED: &[u8] = b"vault-depositor";

    /// total on-chain space needed to allocate the account
    pub const SPACE: usize =
        // anchor descriminator + all static variables
        8 + std::mem::size_of::<Self>();
}
