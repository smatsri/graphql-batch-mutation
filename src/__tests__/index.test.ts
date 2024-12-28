import { buildBatchOperation } from '../index';
import { Operation, OperationVariable } from '../types';

describe('buildBatchOperation', () => {
  it('should build an empty mutation when no operations are provided', () => {
    const result = buildBatchOperation([]);

    expect(result).toEqual({
      graphql: '',
      variables: {},
    });
  });

  it('should build a single mutation correctly', () => {
    const result = buildBatchOperation([
      Operation(
        'subscriberUnsubscribeEmail(input: { uid: $uid })',
        {
          uid: OperationVariable('String!', 'user123'),
        },
      ),
    ]);

    const expected = `mutation BatchOperation($uid1: String!) {
  m1: subscriberUnsubscribeEmail(input: { uid: $uid1 }) {
    clientMutationId
  }
}`;

    expect(result.graphql).toBe(expected);
    expect(result.variables).toEqual({
      uid1: 'user123',
    });
  });

  it('should handle custom aliases', () => {
    const result = buildBatchOperation([
      Operation(
        'testMutation(input: { uid: $uid })',
        {
          uid: OperationVariable('String!', 'user123'),
        },
        'customAlias'
      ),
    ]);

    expect(result.graphql).toContain('customAlias: testMutation');
  });

  it('should build multiple mutations with correct variable indexing', () => {
    const result = buildBatchOperation([
      Operation(
        'subscriberUnsubscribeEmail(input: { uid: $uid })',
        {
          uid: OperationVariable('String!', 'zykECZHChXcT8Jxi0xtmtFywa8I2'),
        },
      ),
      Operation(
        'subscriberUnsubscribePhone(input: { uid: $uid })',
        {
          uid: OperationVariable('String!', 'zykECZHChXcT8Jxi0xtmtFywa8I2'),
        },
      ),
    ]);

    const expected = `mutation BatchOperation($uid1: String!, $uid2: String!) {
  m1: subscriberUnsubscribeEmail(input: { uid: $uid1 }) {
    clientMutationId
  }

  m2: subscriberUnsubscribePhone(input: { uid: $uid2 }) {
    clientMutationId
  }
}`;

    expect(result.graphql).toBe(expected);
    expect(result.variables).toEqual({
      uid1: 'zykECZHChXcT8Jxi0xtmtFywa8I2',
      uid2: 'zykECZHChXcT8Jxi0xtmtFywa8I2',
    });
  });

  it('should handle multiple variables per operation', () => {
    const result = buildBatchOperation([
      Operation(
        'updateUser(input: { id: $id, name: $name })',
        {
          id: OperationVariable('ID!', '123'),
          name: OperationVariable('String!', 'John Doe'),
        },
      ),
    ]);

    const expected = `mutation BatchOperation($id1: ID!, $name1: String!) {
  m1: updateUser(input: { id: $id1, name: $name1 }) {
    clientMutationId
  }
}`;

    expect(result.graphql).toBe(expected);
    expect(result.variables).toEqual({
      id1: '123',
      name1: 'John Doe',
    });
  });
});
