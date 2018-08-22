import { TestBed, inject } from '@angular/core/testing';
import { GeneralFunctionsService } from 'app/_services/general-functions.service';



describe('GeneralFunctionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralFunctionsService]
    });
  });

  it('should be created', inject([GeneralFunctionsService], (service: GeneralFunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
