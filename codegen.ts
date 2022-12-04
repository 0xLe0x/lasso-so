import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./gql-schema.json", // Set this to a remote schema if you want e.g. http://api.gql/gql
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
