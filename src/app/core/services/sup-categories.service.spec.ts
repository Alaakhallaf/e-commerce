import { TestBed } from '@angular/core/testing';

import { SupCategoriesService } from './sup-categories.service';

describe('SupCategoriesService', () => {
  let service: SupCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
