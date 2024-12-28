/** Base GraphQL scalar types */
export type BaseVariableType = 'String' | 'Int' | 'Boolean' | 'Float' | 'ID';

/** GraphQL variable type that can be nullable or non-nullable */
export type OperationVariableType = BaseVariableType | `${BaseVariableType}!` | (string & {});

/** Represents a GraphQL operation variable with its type and value */
export type OperationVariable = {
  readonly type: OperationVariableType;
  readonly value: unknown;
};

/** Represents a complete GraphQL operation */
export type Operation = {
  readonly graphql: string;
  readonly variables: Readonly<Record<string, OperationVariable>>;
  readonly alias?: string;
};

/** Result of a batched GraphQL operation */
export type BatchOperationResult = {
  readonly graphql: string; // Changed from 'gql' for consistency
  readonly variables: Readonly<Record<string, unknown>>;
};
