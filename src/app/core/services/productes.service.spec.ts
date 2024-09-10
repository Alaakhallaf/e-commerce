import { TestBed } from '@angular/core/testing';

import { ProductesService } from './products.service';

describe('ProductesService', () => {
  let service: ProductesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
