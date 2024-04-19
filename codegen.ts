import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/api/graphql',
  documents: ['src/**/mutations.ts', 'src/**/queries.ts'],
  generates: {
    'src/graphql/generated/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        reactApolloVersion: 3,
        // withHooks: false,
        // withHOC: false,
        // withComponent: false,
        // exportFragmentSpreadSubTypes: true,
        // documentMode: 'graphQLTag',

        useIndexSignature: true,
        namingConvention: {
          typeNames: 'change-case-all#pascalCase', // PascalCase
          enumValues: 'change-case-all#upperCase', // UPPERCASE
        },
      },
    },
  },
  // hooks: {
  //   afterAllFileWrite: ['prettier --write'],
  // },
};

export default config;
