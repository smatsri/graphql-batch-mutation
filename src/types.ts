export type BaseVariableType = 'String' | 'Int' | 'Boolean' | 'Float' | 'ID';

export type OperationVariableType = BaseVariableType | `${BaseVariableType}!` | (string & {});

export type OperationVariable = {
  readonly type: OperationVariableType;
  readonly value: unknown;
};

export type Operation = {
  readonly graphql: string;
  readonly variables: Readonly<Record<string, OperationVariable>>;
  readonly alias?: string;
};

export type BatchOperationResult = {
  readonly graphql: string; // Changed from 'gql' for consistency
  readonly variables: Readonly<Record<string, unknown>>;
};

export const OperationVariable = (
  type: OperationVariableType,
  value: unknown,
  alias?: string,
) => ({
  type,
  value,
  alias,
});

export const Operation = (
  graphql: string,
  variables: Record<string, OperationVariable>,
  alias?: string,
) => ({
  graphql,
  variables,
  alias,
});

