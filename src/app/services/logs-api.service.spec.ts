import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LogsApiService } from './logs-api.service';

describe('LogsApiService', () => {
  let service: LogsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LogsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
