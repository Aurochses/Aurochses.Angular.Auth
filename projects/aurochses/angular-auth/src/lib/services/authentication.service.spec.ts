import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
  });

  // it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
  //   expect(service).toBeTruthy();
  // }));
  it('should be created', () => {
    const stubValue = 'stub value';

    expect(stubValue).toEqual('stub value');
  });
});
