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
 * const result = buildBatchOperation([
 *   {
 *     graphql: 'subscriberUnsubscribeEmail(input: { uid: $uid })',
 *     variables: {
 *       uid: {
 *         type: 'String!',
 *         value: 'zykECZHChXcT8Jxi0xtmtFywa8I2'
 *       }
 *     }
 *   }
 * ]);
 */
export function buildBatchOperation(operations: Operation[]): BatchOperationResult {
  validateOperations(operations);

  if (operations.length === 0) {
    return { gql: '', variables: {} };
  }

  const varDefs = buildVariableDefinitions(operations);
  const mutations = buildMutationStatements(operations);
  const variables = buildVariablesObject(operations);

  return {
    gql: `mutation BatchOperation(${varDefs}) {${mutations.join('\n')}\n}`,
    variables,
  };
}
