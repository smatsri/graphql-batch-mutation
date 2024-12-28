import type { Operation, BatchOperationResult as BatchMutationResult } from './types';
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
 * @returns {BatchMutationResult} Object containing the combined query and variables
 * @throws {Error} If any operation is missing required fields or is malformed
 *
 * @example
 * const { graphql, variables } = buildBatchMutation([
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
export function buildBatchMutation(operations: Operation[]): BatchMutationResult {
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
