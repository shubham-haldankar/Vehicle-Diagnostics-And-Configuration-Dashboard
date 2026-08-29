import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LogsSandbox } from 'src/app/logs.sandbox';
import { LogsApiService } from 'src/app/services/logs-api.service';

import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: LogsSandbox,
          useValue: {
            result$: of({
              sortedBy: null,
              sortedOrder: null,
              logs: [],
              stats: { total: 0 },
              offset: 0,
            }),
            searchDto$: of({
              vehicleId: '',
              errorCode: '',
              severity: '',
              fromDate: '',
              toDate: '',
              limit: 10,
              offset: 0,
            }),
            loading$: of(false),
            error$: of(null),
            loadLogs: jasmine.createSpy('loadLogs'),
            setSearchDto: jasmine.createSpy('setSearchDto'),
          },
        },
        {
          provide: LogsApiService,
          useValue: {
            getLogs: jasmine
              .createSpy('getLogs')
              .and.returnValue(of({ records: [] })),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
