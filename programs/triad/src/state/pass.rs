use anchor_lang::prelude::*;

#[derive(Clone, AnchorSerialize, AnchorDeserialize, PartialEq)]
pub enum Pass {
    EXPIRED,
    MONTHLY,
    SEMIANNUAL,
    ANNUAL,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct PayPassArgs {
    pub pass: Pass,
}
