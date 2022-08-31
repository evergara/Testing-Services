import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('Test Services MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        {
          provide: ValueService,
          useValue: spy,
        },
      ],
    });

    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  it('should return "My value" from the services Valueservice', () => {
    valueServiceSpy.getValue.and.returnValue('Face Value');
    expect(masterService.getValue()).toBe('Face Value');
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
    //Lo que esperamos que nos devuelve
    valueServiceSpy.getValue.and.returnValue('Face Value');
    masterService = new MasterService(valueServiceSpy);

    expect(masterService.getValue()).toBe('Face Value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
