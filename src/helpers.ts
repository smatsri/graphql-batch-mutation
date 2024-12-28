import type { Operation } from './types';

export function buildVariableDefinitions(operations: Operation[]): string {
  return operations
    .map((op, index) =>
      Object.entries(op.variables).map(([key, variable]) =>
        `$${key}${index + 1}: ${variable.type}`
      ),
    )
    .flat()
    .join(', ');
}

export function buildMutationStatements(operations: Operation[]): string[] {
  return operations.map((op, index) => {
    const alias = op.alias || `m${index + 1}`;
    const graphql = op.graphql.replace(/\$(\w+)/g, (_, varName) => `$${varName}${index + 1}`);

    return `
  ${alias}: ${graphql} {
    clientMutationId
  }`;
  });
}

export function buildVariablesObject(operations: Operation[]): Record<string, unknown> {
  return operations.reduce(
    (vars, op, index) => {
      Object.entries(op.variables).forEach(([key, variable]) => {
        vars[`${key}${index + 1}`] = variable.value;
      });
      return vars;
    },
    {} as Record<string, unknown>,
  );
}

export function validateOperations(operations: Operation[]): void {
  operations.forEach((op, index) => {
    if (!op.graphql) {
      throw new Error(`Operation at index ${index} is missing graphql query`);
    }

    Object.entries(op.variables).forEach(([key, variable]) => {
      if (!variable.type) {
        throw new Error(`Missing type for variable "${key}" in operation ${index}`);
      }
    });
  });
}
