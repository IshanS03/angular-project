import { TestBed } from '@angular/core/testing';

import { Http } from './services/http';

describe('Http', () => {
  let service: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
