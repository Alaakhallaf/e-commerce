import { TestBed } from '@angular/core/testing';

import { IbrandsService } from './ibrands.service';

describe('IbrandsService', () => {
  let service: IbrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
