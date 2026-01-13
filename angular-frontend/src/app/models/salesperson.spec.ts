import { Salesperson } from './salesperson';

describe('Salesperson', () => {
  it('should create an instance', () => {
    expect(new Salesperson(0, '', '', '', '', 0)).toBeTruthy();
  });
});
