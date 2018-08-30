import { TestBed, inject } from '@angular/core/testing';

import { FirestorePagerService } from './firestore-pager.service';

describe('FirestorePagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestorePagerService]
    });
  });

  it('should be created', inject([FirestorePagerService], (service: FirestorePagerService) => {
    expect(service).toBeTruthy();
  }));
});
