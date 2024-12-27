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

export function buildBatchOperation(operations: Operation[]): {
  gql: string;
  variables: Record<string, unknown>;
} {
  if (operations.length === 0) {
    return { gql: '', variables: {} };
  }

  // Build variable definitions
  const varDefs = operations
    .map((op, index) =>
      Object.entries(op.variables)
        .map(([key, variable]) => `$${key}${index + 1}: ${variable.type}`)
    )
    .flat()
    .join(', ');

  // Build mutations
  const mutations = operations.map((op, index) => {
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

  // Build variables object
  const variables = operations.reduce((vars, op, index) => {
    Object.entries(op.variables).forEach(([key, variable]) => {
      vars[`${key}${index + 1}`] = variable.value;
    });
    return vars;
  }, {} as Record<string, unknown>);

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