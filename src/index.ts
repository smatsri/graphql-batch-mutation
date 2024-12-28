import type { Operation, BatchOperationResult } from './types';
export * from './types';
import {
  buildVariableDefinitions,
  buildMutationStatements,
  buildVariablesObject,
  validateOperations,
} from './helpers';

/**
 * Builds a batched GraphQL mutation operation from multiple individual operations
 * @param {Operation[]} operations - Array of operations to combine
 * @returns {BatchOperationResult} Object containing the combined query and variables
 * @throws {Error} If any operation is missing required fields or is malformed
 *
 * @example
 * const { graphql, variables } = buildBatchOperation([
 *   Operation(
 *     'testMutation(input: { id: $id })',
 *     { id: OperationVariable('ID!', '123') },
 *   ),
 *   Operation(
 *     'testMutation(input: { id: $id })',
 *     { id: OperationVariable('ID!', '456') },
 *   ),
 * ]);
 */
export function buildBatchOperation(operations: Operation[]): BatchOperationResult {
  validateOperations(operations);

  if (operations.length === 0) {
    return { graphql: '', variables: {} };
  }

  const varDefs = buildVariableDefinitions(operations);
  const mutations = buildMutationStatements(operations);
  const variables = buildVariablesObject(operations);

  return {
    graphql: `mutation BatchOperation(${varDefs}) {${mutations.join('\n')}\n}`,
    variables,
  };
}
