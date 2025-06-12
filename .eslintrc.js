module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json', // Ensure tsconfig.json exists
    warnOnUnsupportedTypeScriptVersion: false // Suppress warnings about TS version if any
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended', // Basic ESLint recommendations
    'plugin:@typescript-eslint/recommended' // Basic TypeScript recommendations
  ],
  rules: {
    // Add specific problematic rule with a known good config or disable it
    '@typescript-eslint/no-unused-expressions': ['error', {
      'allowShortCircuit': true,
      'allowTernary': true,
      'allowTaggedTemplates': true // Added this one as it was in the previous config
    }],
    // Add other rules as needed for basic linting
    'semi': ['error', 'always'],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2]
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/'], // Ignore build and deps
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};
