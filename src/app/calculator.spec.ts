import { Calculator } from './calculator';

describe('Test for calculator', () => {
  describe('Test for Multiply', () => {
    it('#should return a nine', () => {
      //Arrange
      const calulator = new Calculator();
      //Act
      const rest = calulator.multiplicar(3, 3);
      //Assert
      expect(rest).toEqual(9);
    });

    it('#should return a 0', () => {
      //Arrange
      const calulator = new Calculator();
      //Act
      const rest = calulator.multiplicar(3, 0);
      //Assert
      expect(rest).toEqual(0);
    });
  });
  describe('Test for Dividir', () => {
    it('#should return a null', () => {
      //Arrange
      const calulator = new Calculator();
      //Act
      const rest = calulator.dividir(3, 0);
      //Assert
      expect(rest).toBeNull();
    });
    it('should return a 4', () => {
      //Arrange
      const calulator = new Calculator();
      //Act
      const rest = calulator.dividir(8, 2);
      //Assert
      expect(rest).toEqual(4);
    });
  });
});

describe('Test for matchers', () => {
  it('Test matchers', () => {
    const name = 'emerson';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 2 === 3).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();
    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(10);

    expect('123456').toMatch(/123/);
    expect(['apples', 'Orange', 'Pears']).toContain('Orange');
  });
});
