import { greet } from '../index';

describe('greet', () => {
  it('should return greeting with name', () => {
    expect(greet('John')).toBe('Hello, John!');
  });

  it('should work with empty string', () => {
    expect(greet('')).toBe('Hello, !');
  });
}); 