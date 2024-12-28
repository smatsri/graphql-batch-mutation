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

/**
 * Creates an operation variable for use in GraphQL operations
 * @param {OperationVariableType} type - The GraphQL type (e.g., 'String!', 'Int', 'Boolean')
 * @param {unknown} value - The value of the variable
 * @param {string} [alias] - Optional alias for the variable
 * @returns {OperationVariable} A typed operation variable
 * 
 * @example
 * const stringVar = OperationVariable('String!', 'hello');
 * const intVar = OperationVariable('Int!', 42);
 */
export const OperationVariable = (
  type: OperationVariableType,
  value: unknown,
  alias?: string,
) => ({
  type,
  value,
  alias,
});

/**
 * Creates a GraphQL operation with variables
 * @param {string} graphql - The GraphQL operation string
 * @param {Record<string, OperationVariable>} variables - Map of variable names to their definitions
 * @param {string} [alias] - Optional alias for the operation
 * @returns {Operation} A complete operation object
 * 
 * @example
 * const operation = Operation(
 *   'updateUser(input: { id: $id, name: $name })',
 *   {
 *     id: OperationVariable('ID!', '123'),
 *     name: OperationVariable('String!', 'John Doe'),
 *   }
 * );
 */
export const Operation = (
  graphql: string,
  variables: Record<string, OperationVariable>,
  alias?: string,
) => ({
  graphql,
  variables,
  alias,
});

