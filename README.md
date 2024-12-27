# graphql-batch-mutation

A utility package for building batched GraphQL mutations. This package helps you combine multiple GraphQL mutations into a single request, improving performance and reducing network overhead.

## Installation

```bash
npm install graphql-batch-mutation
```

## Usage

```typescript
import { buildBatchMutation } from "graphql-batch-mutation";

const { gql, variables } = buildBatchOperation([
  {
    graphql: "createUser(input: { name: $name })",
    variables: {
      name: {
        type: "String!",
        value: "John Doe",
      },
    },
  },
]);
```
