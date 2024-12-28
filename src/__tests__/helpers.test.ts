import {
  buildMutationStatements,
  buildVariableDefinitions,
  buildVariablesObject,
} from '../helpers';
import { Operation, OperationVariable } from '../types';

describe('buildVariableDefinitions', () => {
  it('should build variable definitions with correct indexing', () => {
    const operations = [
      Operation('testMutation', {
        id: OperationVariable('ID!', '123'),
        name: OperationVariable('String!', 'test'),
      }),
    ];

    const result = buildVariableDefinitions(operations);
    expect(result).toBe('$id1: ID!, $name1: String!');
  });

  it('should handle multiple operations', () => {
    const operations = [
      Operation('test1', { id: OperationVariable('ID!', '123') }),
      Operation('test2', { id: OperationVariable('ID!', '456') }),
    ];

    const result = buildVariableDefinitions(operations);
    expect(result).toBe('$id1: ID!, $id2: ID!');
  });
});

describe('buildMutationStatements', () => {
  it('should build mutation with default alias', () => {
    const operations = [
      Operation(
        'testMutation(input: { id: $id })',
        { id: OperationVariable('ID!', '123') },
      ),
    ];

    const result = buildMutationStatements(operations);
    expect(result[0]).toContain('m1: testMutation(input: { id: $id1 })');
  });

  it('should respect   alias', () => {
    const operations = [
      Operation(
        'testMutation(input: { id: $id })',
        { id: OperationVariable('ID!', '123') },
        'custom',
      ),
    ];

    const result = buildMutationStatements(operations);
    expect(result[0]).toContain('custom: testMutation(input: { id: $id1 })');
  });
});

describe('buildVariablesObject', () => {
  it('should build variables object with correct indexing', () => {
    const operations = [
      Operation('test', { id: OperationVariable('ID!', '123') }),
    ];

    const result = buildVariablesObject(operations);
    expect(result).toEqual({
      id1: '123',
    });
  });

  it('should handle multiple operations', () => {
    const operations = [
      Operation('test1', { id: OperationVariable('ID!', '123') }),
      Operation('test2', { id: OperationVariable('ID!', '456') }),
    ];

    const result = buildVariablesObject(operations);
    expect(result).toEqual({
      id1: '123',
      id2: '456',
    });
  });
});
