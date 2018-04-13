import { TestBed, inject } from '@angular/core/testing';

import { AngularAuthService } from './angular-auth.service';

describe('AngularAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularAuthService]
    });
  });

  it('should be created', inject([AngularAuthService], (service: AngularAuthService) => {
    expect(service).toBeTruthy();
  }));
});
