use anchor_lang::prelude::*;

use crate::Depositor;

pub fn is_authority_for_depositor(
    depositor: &Account<Depositor>,
    signer: &Signer,
) -> anchor_lang::Result<bool> {
    Ok(depositor.authority.eq(signer.key))
}
