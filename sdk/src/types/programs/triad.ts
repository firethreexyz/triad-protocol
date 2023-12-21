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
      args: []
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
            name: 'passType'
            type: {
              defined: 'PassType'
            }
          },
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'manager'
            type: 'publicKey'
          }
        ]
      }
    }
  ]
  types: [
    {
      name: 'PassType'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'MONTHLY'
          },
          {
            name: 'QUARTERLY'
          },
          {
            name: 'SEMIANNUAL'
          },
          {
            name: 'ANNUAL'
          },
          {
            name: 'TRIAL'
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
      args: []
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
            name: 'passType',
            type: {
              defined: 'PassType'
            }
          },
          {
            name: 'authority',
            type: 'publicKey'
          },
          {
            name: 'manager',
            type: 'publicKey'
          }
        ]
      }
    }
  ],
  types: [
    {
      name: 'PassType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'MONTHLY'
          },
          {
            name: 'QUARTERLY'
          },
          {
            name: 'SEMIANNUAL'
          },
          {
            name: 'ANNUAL'
          },
          {
            name: 'TRIAL'
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
