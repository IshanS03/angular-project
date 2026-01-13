import { TestBed } from '@angular/core/testing';

import { DataPass } from './data-pass';

describe('DataPass', () => {
  let service: DataPass;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPass);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
