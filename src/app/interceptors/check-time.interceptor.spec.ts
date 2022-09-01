import { TestBed } from '@angular/core/testing';

import { CheckTimeInterceptor } from './check-time.interceptor';

describe('CheckTimeInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CheckTimeInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CheckTimeInterceptor = TestBed.inject(CheckTimeInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
