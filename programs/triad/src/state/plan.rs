use anchor_lang::prelude::*;

#[derive(Clone, Copy, AnchorSerialize, AnchorDeserialize, PartialEq, Eq)]
pub enum Plan {
    Expired,
    Monthly,
    Semiannual,
    Annual,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct AddPlanArgs {
    pub plan: Plan,
}
