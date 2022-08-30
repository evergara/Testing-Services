import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

fdescribe('Test Services MasterService', () => {
  let masterService: MasterService;
  let valueService: ValueService;

  beforeEach(() => {
    valueService = new ValueService();
    masterService = new MasterService(valueService);
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  it('should return "My value" from the services Valueservice', () => {
    expect(masterService.getValue()).toBe('my value');
  });

  it('should return "Other value" from the fake object', () => {
    const fake = { getValue: () => 'face from object' };
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('face from object');
  });

  it('should return "Other value" from the fake object', () => {
    const fake = { getValue: () => 'face from object' };
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('face from object');
  });

  it('should call to getValue since ValueServices', () => {
    //Aqui creamos el spy
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    //Lo que esperamos que nos devuelve
    valueServiceSpy.getValue.and.returnValue('Face Value');
    masterService = new MasterService(valueServiceSpy);

    expect(masterService.getValue()).toBe('Face Value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

});
