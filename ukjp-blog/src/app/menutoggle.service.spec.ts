import { TestBed, inject } from '@angular/core/testing';

import { MenutoggleService } from './menutoggle.service';

describe('MenutoggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenutoggleService]
    });
  });

  it('should be created', inject([MenutoggleService], (service: MenutoggleService) => {
    expect(service).toBeTruthy();
  }));
});
