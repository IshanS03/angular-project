import { Sale } from './sale';
//this file is what willbe run when we use the ng test comand
//along with all other test files
//each "describe" is a separate unit test
//this one fails without alternation because it's expecting arguments in its constructor

describe('Sale', () => {
  it('should create an instance', () => {
    expect(new Sale(2, '', '', '', 0, 0)).toBeTruthy();
  });

  it('should properly use the constructor for the total property', () => {
    expect(new Sale(0, '', '', '', 150.75, 0).total).toEqual(150.75); 
  }) 
  });