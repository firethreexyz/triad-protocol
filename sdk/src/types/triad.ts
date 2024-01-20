export type Triad = {
  version: '0.1.0'
  name: 'triad'
  instructions: [
    {
      name: 'createUser'
      accounts: [
        {
          name: 'signer'
          isMut: true
          isSigner: true
        },
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: 'CreateUserArgs'
          }
        }
      ]
    },
    {
      name: 'createVault'
      accounts: [
        {
          name: 'signer'
          isMut: true
          isSigner: true
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'payerTokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'triadSigner'
          isMut: false
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: 'CreateVaultArgs'
          }
        }
      ]
    },
    {
      name: 'deposit'
      accounts: [
        {
          name: 'signer'
          isMut: true
          isSigner: true
        },
        {
          name: 'vault'
          isMut: false
          isSigner: false
        },
        {
          name: 'user'
          isMut: false
          isSigner: false
        },
        {
          name: 'depositor'
          isMut: true
          isSigner: false
        },
        {
          name: 'vaultTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'userTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        }
      ]
    },
    {
      name: 'createDepositor'
      accounts: [
        {
          name: 'signer'
          isMut: true
          isSigner: true
        },
        {
          name: 'user'
          isMut: false
          isSigner: false
        },
        {
          name: 'vault'
          isMut: false
          isSigner: false
        },
        {
          name: 'depositor'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    }
  ]
  accounts: [
    {
      name: 'depositor'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'vault'
            type: 'publicKey'
          },
          {
            name: 'totalDeposit'
            type: 'u64'
          },
          {
            name: 'totalWithdrawal'
            type: 'u64'
          },
          {
            name: 'netDeposit'
            type: 'i64'
          },
          {
            name: 'lpShares'
            type: 'u64'
          },
          {
            name: 'user'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'user'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'referral'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'vault'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'name'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'tokenAccount'
            type: 'publicKey'
          }
        ]
      }
    }
  ]
  types: [
    {
      name: 'CreateUserArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'referral'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'CreateVaultArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'name'
            type: {
              array: ['u8', 32]
            }
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 6000
      name: 'InvalidAccount'
      msg: 'Invalid account'
    },
    {
      code: 6001
      name: 'Unauthorized'
      msg: 'Unauthorized access'
    },
    {
      code: 6002
      name: 'InvalidPassType'
      msg: 'Invalid pass type'
    },
    {
      code: 6003
      name: 'InvalidVaultDepositorAuthority'
      msg: 'Invalid vault depositor authority'
    },
    {
      code: 6004
      name: 'InvalidOwnerAuthority'
      msg: 'Invalid owner authority'
    },
    {
      code: 6005
      name: 'InvalidMintAddress'
      msg: 'Invalid mint address'
    }
  ]
}

export const IDL: Triad = {
  version: '0.1.0',
  name: 'triad',
  instructions: [
    {
      name: 'createUser',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: 'CreateUserArgs'
          }
        }
      ]
    },
    {
      name: 'createVault',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false
        },
        {
          name: 'payerTokenMint',
          isMut: false,
          isSigner: false
        },
        {
          name: 'tokenAccount',
          isMut: true,
          isSigner: false
        },
        {
          name: 'triadSigner',
          isMut: false,
          isSigner: true
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: 'CreateVaultArgs'
          }
        }
      ]
    },
    {
      name: 'deposit',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true
        },
        {
          name: 'vault',
          isMut: false,
          isSigner: false
        },
        {
          name: 'user',
          isMut: false,
          isSigner: false
        },
        {
          name: 'depositor',
          isMut: true,
          isSigner: false
        },
        {
          name: 'vaultTokenAccount',
          isMut: true,
          isSigner: false
        },
        {
          name: 'userTokenAccount',
          isMut: true,
          isSigner: false
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'amount',
          type: 'u64'
        }
      ]
    },
    {
      name: 'createDepositor',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true
        },
        {
          name: 'user',
          isMut: false,
          isSigner: false
        },
        {
          name: 'vault',
          isMut: false,
          isSigner: false
        },
        {
          name: 'depositor',
          isMut: true,
          isSigner: false
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        }
      ],
      args: []
    }
  ],
  accounts: [
    {
      name: 'depositor',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8'
          },
          {
            name: 'authority',
            type: 'publicKey'
          },
          {
            name: 'vault',
            type: 'publicKey'
          },
          {
            name: 'totalDeposit',
            type: 'u64'
          },
          {
            name: 'totalWithdrawal',
            type: 'u64'
          },
          {
            name: 'netDeposit',
            type: 'i64'
          },
          {
            name: 'lpShares',
            type: 'u64'
          },
          {
            name: 'user',
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'user',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8'
          },
          {
            name: 'authority',
            type: 'publicKey'
          },
          {
            name: 'referral',
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'vault',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8'
          },
          {
            name: 'authority',
            type: 'publicKey'
          },
          {
            name: 'name',
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'tokenAccount',
            type: 'publicKey'
          }
        ]
      }
    }
  ],
  types: [
    {
      name: 'CreateUserArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'referral',
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'CreateVaultArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: {
              array: ['u8', 32]
            }
          }
        ]
      }
    }
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidAccount',
      msg: 'Invalid account'
    },
    {
      code: 6001,
      name: 'Unauthorized',
      msg: 'Unauthorized access'
    },
    {
      code: 6002,
      name: 'InvalidPassType',
      msg: 'Invalid pass type'
    },
    {
      code: 6003,
      name: 'InvalidVaultDepositorAuthority',
      msg: 'Invalid vault depositor authority'
    },
    {
      code: 6004,
      name: 'InvalidOwnerAuthority',
      msg: 'Invalid owner authority'
    },
    {
      code: 6005,
      name: 'InvalidMintAddress',
      msg: 'Invalid mint address'
    }
  ]
}
