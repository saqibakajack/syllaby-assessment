/* eslint-disable unicorn/prefer-module */
module.exports = {
  root: true,
  ignorePatterns: ['!**/*'],
  extends: [
    'plugin:@nx/react',
    'standard-with-typescript',
    'plugin:sonarjs/recommended',
    'plugin:jest/style',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.app.json'
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'simple-import-sort', '@nx'],
  rules: {
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'consistent-return': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    'no-func-assign': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-labels': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: [/\$[A-Za-z]+\.tsx/]
      }
    ],
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-null': 'off',
    '@typescript-eslint/semi': ['off'],
    '@typescript-eslint/consistent-type-definitions': ['off']
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript']
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript']
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            semi: false
          }
        ]
      }
    }
  ]
}
