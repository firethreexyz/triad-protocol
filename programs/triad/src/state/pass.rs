use anchor_lang::prelude::*;

#[derive(Clone, Copy, AnchorSerialize, AnchorDeserialize, PartialEq, Eq)]
pub enum Pass {
    Expired,
    Monthly,
    Semiannual,
    Annual,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct PayPassArgs {
    pub pass: Pass,
}
