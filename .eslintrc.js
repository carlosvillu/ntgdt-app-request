module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['prettier', 'react', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    'prettier/prettier': [
      2,
      {
        semi: false,
        tabWidth: 2,
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'none'
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'error',
    'no-console': 'error',
    'react/display-name': 0,
    'prefer-const': 'error',
    'arrow-parens': ['error', 'always', { requireForBlockBody: true }],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'newline-before-return': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: ['variable'],
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'will']
      }
    ]
  },
  settings: { react: { version: 'detect' } }
}
