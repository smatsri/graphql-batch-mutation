type BaseVariableType = 'String' | 'Int' | 'Boolean' | 'Float' | 'ID';
type OperationVariableType = BaseVariableType | `${BaseVariableType}!` | (string & {});

type OperationVariable = {
  type: OperationVariableType;
  value: unknown;
};

type Operation = {
  graphql: string;
  variables: Record<string, OperationVariable>;
  alias?: string;
};

export function buildVariableDefinitions(operations: Operation[]): string {
  return operations
    .map((op, index) =>
      Object.entries(op.variables).map(([key, variable]) => {
        if (!variable.type) {
          throw new Error(`Missing type for variable "${key}" in operation ${index}`);
        }
        return `$${key}${index + 1}: ${variable.type}`;
      })
    )
    .flat()
    .join(', ');
}

export function buildMutationStatements(operations: Operation[]): string[] {
  return operations.map((op, index) => {
    const alias = op.alias || `m${index + 1}`;
    const graphql = op.graphql.replace(
      /\$(\w+)/g,
      (_, varName) => `$${varName}${index + 1}`
    );

    return `
  ${alias}: ${graphql} {
    clientMutationId
  }`;
  });
}

export function buildVariablesObject(operations: Operation[]): Record<string, unknown> {
  return operations.reduce((vars, op, index) => {
    Object.entries(op.variables).forEach(([key, variable]) => {
      vars[`${key}${index + 1}`] = variable.value;
    });
    return vars;
  }, {} as Record<string, unknown>);
}

export function buildBatchOperation(operations: Operation[]): {
  gql: string;
  variables: Record<string, unknown>;
} {
  // Validate operation structure
  operations.forEach((op, index) => {
    if (!op.graphql) {
      throw new Error(`Operation at index ${index} is missing graphql query`);
    }
    if (!op.variables || typeof op.variables !== 'object') {
      throw new Error(`Operation at index ${index} has invalid variables`);
    }
  });

  if (operations.length === 0) {
    return { gql: '', variables: {} };
  }

  const varDefs = buildVariableDefinitions(operations);
  const mutations = buildMutationStatements(operations);
  const variables = buildVariablesObject(operations);

  return {
    gql: `mutation BatchOperation(${varDefs}) {${mutations.join('\n')}\n}`,
    variables
  };
}

/* Usage example:
const result = buildBatchOperation([
  {
    graphql: 'subscriberUnsubscribeEmail(input: { uid: $uid })',
    variables: {
      uid: {
        type: 'String!',
        value: 'zykECZHChXcT8Jxi0xtmtFywa8I2'
      }
    }
  },
  {
    graphql: 'subscriberUnsubscribePhone(input: { uid: $uid })',
    variables: {
      uid: {
        type: 'String!',
        value: 'zykECZHChXcT8Jxi0xtmtFywa8I2'
      }
    }
  }
]);
*/