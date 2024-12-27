import { buildBatchOperation, buildVariableDefinitions, buildMutationStatements, buildVariablesObject } from './index';

describe('buildBatchOperation', () => {
  it('should build an empty mutation when no operations are provided', () => {
    const result = buildBatchOperation([]);

    expect(result).toEqual({
      gql: '',
      variables: {}
    });
  });

  it('should build a single mutation correctly', () => {
    const result = buildBatchOperation([{
      graphql: 'subscriberUnsubscribeEmail(input: { uid: $uid })',
      variables: {
        uid: {
          type: 'String!',
          value: 'user123'
        }
      }
    }]);

    const expected = `mutation BatchOperation($uid1: String!) {
  m1: subscriberUnsubscribeEmail(input: { uid: $uid1 }) {
    clientMutationId
  }
}`;

    expect(result.gql).toBe(expected);
    expect(result.variables).toEqual({
      uid1: 'user123'
    });
  });

  it('should handle custom aliases', () => {
    const result = buildBatchOperation([{
      alias: 'customAlias',
      graphql: 'testMutation(input: { uid: $uid })',
      variables: {
        uid: {
          type: 'String!',
          value: 'user123'
        }
      }
    }]);

    expect(result.gql).toContain('customAlias: testMutation');
  });

  it('should build multiple mutations with correct variable indexing', () => {
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

    const expected = `mutation BatchOperation($uid1: String!, $uid2: String!) {
  m1: subscriberUnsubscribeEmail(input: { uid: $uid1 }) {
    clientMutationId
  }

  m2: subscriberUnsubscribePhone(input: { uid: $uid2 }) {
    clientMutationId
  }
}`;

    expect(result.gql).toBe(expected);
    expect(result.variables).toEqual({
      uid1: 'zykECZHChXcT8Jxi0xtmtFywa8I2',
      uid2: 'zykECZHChXcT8Jxi0xtmtFywa8I2'
    });
  });

  it('should handle multiple variables per operation', () => {
    const result = buildBatchOperation([{
      graphql: 'updateUser(input: { id: $id, name: $name })',
      variables: {
        id: {
          type: 'ID!',
          value: '123'
        },
        name: {
          type: 'String!',
          value: 'John Doe'
        }
      }
    }]);

    const expected = `mutation BatchOperation($id1: ID!, $name1: String!) {
  m1: updateUser(input: { id: $id1, name: $name1 }) {
    clientMutationId
  }
}`;

    expect(result.gql).toBe(expected);
    expect(result.variables).toEqual({
      id1: '123',
      name1: 'John Doe'
    });
  });
});

describe('buildVariableDefinitions', () => {
  it('should build variable definitions with correct indexing', () => {
    const operations = [{
      graphql: 'testMutation',
      variables: {
        id: { type: 'ID!', value: '123' },
        name: { type: 'String!', value: 'test' }
      }
    }];

    const result = buildVariableDefinitions(operations);
    expect(result).toBe('$id1: ID!, $name1: String!');
  });

  it('should handle multiple operations', () => {
    const operations = [
      {
        graphql: 'test1',
        variables: { id: { type: 'ID!', value: '123' } }
      },
      {
        graphql: 'test2',
        variables: { id: { type: 'ID!', value: '456' } }
      }
    ];

    const result = buildVariableDefinitions(operations);
    expect(result).toBe('$id1: ID!, $id2: ID!');
  });
});

describe('buildMutationStatements', () => {
  it('should build mutation with default alias', () => {
    const operations = [{
      graphql: 'testMutation(input: { id: $id })',
      variables: { id: { type: 'ID!', value: '123' } }
    }];

    const result = buildMutationStatements(operations);
    expect(result[0]).toContain('m1: testMutation(input: { id: $id1 })');
  });

  it('should respect custom alias', () => {
    const operations = [{
      alias: 'custom',
      graphql: 'testMutation(input: { id: $id })',
      variables: { id: { type: 'ID!', value: '123' } }
    }];

    const result = buildMutationStatements(operations);
    expect(result[0]).toContain('custom: testMutation(input: { id: $id1 })');
  });
});

describe('buildVariablesObject', () => {
  it('should build variables object with correct indexing', () => {
    const operations = [{
      graphql: 'test',
      variables: {
        id: { type: 'ID!', value: '123' },
        name: { type: 'String!', value: 'test' }
      }
    }];

    const result = buildVariablesObject(operations);
    expect(result).toEqual({
      id1: '123',
      name1: 'test'
    });
  });

  it('should handle multiple operations', () => {
    const operations = [
      {
        graphql: 'test1',
        variables: { id: { type: 'ID!', value: '123' } }
      },
      {
        graphql: 'test2',
        variables: { id: { type: 'ID!', value: '456' } }
      }
    ];

    const result = buildVariablesObject(operations);
    expect(result).toEqual({
      id1: '123',
      id2: '456'
    });
  });
});