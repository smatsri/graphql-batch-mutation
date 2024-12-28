# graphql-batch-mutation

A utility package for building batched GraphQL mutations. This package helps you combine multiple GraphQL mutations into a single request, improving performance and reducing network overhead.

## Installation

```bash
npm install graphql-batch-mutation
```

## Usage

```typescript
import { buildBatchMutation } from 'graphql-batch-mutation';

const { gql, variables } = buildBatchMutation([
  Operation('createUser(input: { name: $name })', {
    name: OperationVariable('String!', 'John Doe'),
  }),
  Operation('updateUser(input: { id: $id, name: $name })', {
    id: OperationVariable('ID!', '123'),
    name: OperationVariable('String!', 'John Doe'),
  }),
]);
```
