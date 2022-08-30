import { ValueService } from './value.service';

describe('Test Services ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('Should be create', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "My value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue', () => {
    it('should return the value change "My value change', () => {
      let value: string = 'My value change';
      service.setValue(value);
      let respuestaExpect: string = service.getValue();
      expect(respuestaExpect).toBe(value);
    });
  });

  describe('Test for getPromiseValue', () => {
    it('should return "Promise value" from promise with then', (doneFn) => {
      let respustaExpect: string = 'Promise value';
      service.getPromiseValue().then((value) => {
        //Assert
        expect(value).toBe(respustaExpect);
        doneFn();
      });
    });

    it('should return "Promise value" from promise usin async', async () => {
      const rtaExpect = 'Promise value';
      const rta = await service.getPromiseValue();
      expect(rta).toBe(rtaExpect);
    });
  });

  describe('Test for getObservableValue', () => {
    it('should return "Observable value" from promise with then', (doneFn) => {
      const rtaExpect: string = 'Observable value';
      service.getObservable().subscribe((value) => {
        //Assert
        expect(value).toBe(rtaExpect);
        doneFn();
      });
    });

    it('should return "Observable value" from promise usin async', async () => {
      const rtaExpect: string = 'Observable value';
      let rta: string = '';
      await service.getObservable().subscribe((value) => {
        rta = value;
      });

      expect(rta).toBe(rtaExpect);
    });
  });
});
