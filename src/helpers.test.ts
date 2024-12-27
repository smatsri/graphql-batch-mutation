import { buildMutationStatements, buildVariableDefinitions, buildVariablesObject } from './helpers';

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