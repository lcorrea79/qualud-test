import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://gorest.co.in/public/v2/graphql', 
  generates: {
    './src/app/graphql/generated.ts': {
        config: { withHooks: true },
        plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular']
    }
  }
}
export default config