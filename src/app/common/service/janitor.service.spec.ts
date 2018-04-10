import { TestBed, inject } from '@angular/core/testing';

import { JanitorService } from './janitor.service';

describe('JanitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JanitorService]
    });
  });

  it('should be created', inject([JanitorService], (service: JanitorService) => {
    expect(service).toBeTruthy();
  }));
});
