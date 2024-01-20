use anchor_lang::prelude::*;

use crate::{Depositor, User};

pub fn is_authority_for_depositor(
    depositor: &Account<Depositor>,
    signer: &Signer,
) -> anchor_lang::Result<bool> {
    Ok(depositor.authority.eq(signer.key))
}

pub fn is_authority_for_user(user: &Account<User>, signer: &Signer) -> anchor_lang::Result<bool> {
    Ok(user.authority.eq(signer.key))
}

pub fn is_token_mint_for_vault(
    vault_token_mint: &Pubkey,
    token_mint: &Pubkey,
) -> anchor_lang::Result<bool> {
    Ok(vault_token_mint.eq(token_mint))
}
