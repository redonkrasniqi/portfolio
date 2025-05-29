module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    plugins: ['react', '@typescript-eslint', 'import'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }]
    },
  };
  