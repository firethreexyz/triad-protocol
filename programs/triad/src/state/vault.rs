use anchor_lang::prelude::*;

#[account]
pub struct Vault {
    pub bump: u8,
    pub authority: Pubkey,
    pub name: [u8; 32],
    pub token: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CreateVaultArgs {
    pub name: [u8; 32],
    pub token: Pubkey,
}

impl Vault {
    /// static prefix seed string used to derive the PDAs
    pub const PREFIX_SEED: &[u8] = b"vault";

    /// total on-chain space needed to allocate the account
    pub const SPACE: usize =
        // anchor descriminator + all static variables
        8 + std::mem::size_of::<Self>();
}
