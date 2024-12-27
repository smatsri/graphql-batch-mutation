export type BaseVariableType = 'String' | 'Int' | 'Boolean' | 'Float' | 'ID';

export type OperationVariableType = BaseVariableType | `${BaseVariableType}!` | (string & {});

export type OperationVariable = {
  type: OperationVariableType;
  value: unknown;
};

export type Operation = {
  graphql: string;
  variables: Record<string, OperationVariable>;
  alias?: string;
};

export type BatchOperationResult = {
  gql: string;
  variables: Record<string, unknown>;
}; 