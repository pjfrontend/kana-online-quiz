// .eslintrc.js

module.exports = {
  env: {
    es6: true,
    browser: true, // Allows for the use of predefined global variables for browsers (document, window, etc.)
    jest: true, // Allows for the use of predefined global variables for Jest (describe, test, etc.)
    node: true, // Allows for the use of predefined global variables for Node.js (module, process, etc.)
  },
  extends: [
    'airbnb', // Use the rules from eslint-config-airbnb, commonly used in the industry
    'react-app', // Use the recommended rules from eslint-config-react-app (bundled with Create React App)
    'react-app/jest', // Use rules from jest
    'eslint:recommended', // Use the recommended rules from eslint
    'plugin:@typescript-eslint/recommended', // Use recommended typescript rules
    'plugin:react/recommended', // Use the recommended rules from eslint-plugin-react
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier to display Prettier errors as ESLint errors
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: [
    '@typescript-eslint',
    '@babel',
    'prettier',
    'react', // Allows for manually setting react/* rules
  ],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.graphql', '.json'],
      },
    },
  },
  overrides: [
    {
      // Create React App allows configuration of global jest via src/setupTests.js
      // This is poor design as tests files should not be in src
      // Read https://github.com/airbnb/javascript/pull/1999
      // eslint error originally from airbnb
      files: ['src/setupTests.js', 'mocks.jsx'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
          },
        ],
      },
    },
  ],
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md#configuring-in-a-mixed-jsts-codebase
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off', // allows components to be in any order, as throughout the project the parent components are often before child components

    'prettier/prettier': 2,
    'no-param-reassign': [2, {props: false}],
    'no-return-assign': [2, 'except-parens'],
    'no-shadow': 0, // https://github.com/typescript-eslint/typescript-eslint/issues/2466#issuecomment-685119395
    '@typescript-eslint/no-shadow': 2,
    camelcase: 0,
    'react/require-default-props': 0,
    'react/prop-types': [2, {skipUndeclared: true}],
    'react/jsx-fragments': [0, 'element'], // We prefer the shorthand
    'import/prefer-default-export': 0, // We prefer to use both where it makes sense
    indent: 0, // Rely on Prettier
    quotes: 0, // Rely on Prettier
    'react-hooks/exhaustive-deps': 0, // TODO(raffclar): Turn to 1 when requirements are refactored
    'react/forbid-prop-types': 0,

    'consistent-return': 1,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.tsx']}],
    '@typescript-eslint/no-explicit-any': 0,
    // '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/ban-types': 1,
    'import/extensions': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-warning-comments': [
      'error',
      {
        terms: ['fixme'],
      },
    ],
    'no-new': 0,
    'react/destructuring-assignment': 0,
    'react/display-name': 0,
    'prefer-destructuring': 1,
    'no-debugger': 0,
    'no-control-regex': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-console': 0,
  },
  ignorePatterns: [
    'node_modules/*',
    'src/setupTests.js',
    'src/testUtils.js',
    'src/reportWebVitals.js',
    'src/aws-exports.js',
  ],
};
