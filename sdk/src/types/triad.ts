export type Triad = {
  version: '0.1.0'
  name: 'triad'
  instructions: [
    {
      name: 'createUser'
      accounts: [
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'authority'
          isMut: false
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
      name: 'addPlan'
      accounts: [
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'user'
          isMut: false
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
            defined: 'AddPlanArgs'
          }
        }
      ]
    },
    {
      name: 'createVault'
      accounts: [
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'vault'
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
            defined: 'CreateVaultArgs'
          }
        }
      ]
    }
  ]
  accounts: [
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
            name: 'plan'
            type: {
              defined: 'Plan'
            }
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
            name: 'token'
            type: 'publicKey'
          }
        ]
      }
    }
  ]
  types: [
    {
      name: 'AddPlanArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'plan'
            type: {
              defined: 'Plan'
            }
          }
        ]
      }
    },
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
          },
          {
            name: 'token'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'Plan'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Expired'
          },
          {
            name: 'Monthly'
          },
          {
            name: 'Semiannual'
          },
          {
            name: 'Annual'
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
          name: 'payer',
          isMut: true,
          isSigner: true
        },
        {
          name: 'authority',
          isMut: false,
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
      name: 'addPlan',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true
        },
        {
          name: 'user',
          isMut: false,
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
            defined: 'AddPlanArgs'
          }
        }
      ]
    },
    {
      name: 'createVault',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true
        },
        {
          name: 'vault',
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
            defined: 'CreateVaultArgs'
          }
        }
      ]
    }
  ],
  accounts: [
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
            name: 'plan',
            type: {
              defined: 'Plan'
            }
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
            name: 'token',
            type: 'publicKey'
          }
        ]
      }
    }
  ],
  types: [
    {
      name: 'AddPlanArgs',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'plan',
            type: {
              defined: 'Plan'
            }
          }
        ]
      }
    },
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
          },
          {
            name: 'token',
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'Plan',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Expired'
          },
          {
            name: 'Monthly'
          },
          {
            name: 'Semiannual'
          },
          {
            name: 'Annual'
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
    }
  ]
}
