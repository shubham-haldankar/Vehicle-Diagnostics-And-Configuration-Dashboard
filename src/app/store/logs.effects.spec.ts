import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { LogsApiService } from '../services/logs-api.service';
import { LogsEffects } from './logs.effects';
import { loadLogs, loadLogsFailure, loadLogsSuccess } from './logs.actions';
import { SearchDto } from '../models/search-dto.model';
import { SearchResultDto } from '../models/search-result-dto.model';

describe('LogsEffects', () => {
  let actions$: Observable<any>;
  let effects: LogsEffects;
  let logsApiServiceMock: {
    getLogs: jasmine.Spy;
  };

  const searchDto: SearchDto = {
    vehicleId: '',
    errorCode: '',
    severity: '',
    fromDate: '',
    toDate: '',
    limit: 10,
    offset: 0,
  };

  const searchDto2: SearchDto = {
    vehicleId: 'VH-42',
    errorCode: 'U1000',
    severity: 'WARN',
    fromDate: '2026-08-01',
    toDate: '2026-08-05',
    limit: 10,
    offset: 0,
  };

  const searchResult: SearchResultDto = {
    sortedBy: 'dateTimeCreated',
    sortedOrder: 'desc',
    limit: 10,
    offset: 0,
    records: [],
    stats: {
      total: 0,
      errors: 0,
      warns: 0,
      infos: 0,
      vehicles: 0,
      codes: 0,
    },
  };

  beforeEach(() => {
    logsApiServiceMock = {
      getLogs: jasmine.createSpy('getLogs'),
    };

    TestBed.configureTestingModule({
      providers: [
        LogsEffects,
        provideMockActions(() => actions$),
        { provide: LogsApiService, useValue: logsApiServiceMock },
      ],
    });

    effects = TestBed.inject(LogsEffects);
  });

  it('positive: should emit loadLogsSuccess when api succeeds', (done) => {
    logsApiServiceMock.getLogs.and.returnValue(of(searchResult));

    const action = loadLogs({
      searchDto,
    });
    const subject = new ReplaySubject(1);
    subject.next(action);
    actions$ = subject.asObservable();

    effects.loadLogs$.subscribe((result) => {
      expect(result).toEqual(
        loadLogsSuccess({
          result: searchResult,
        }),
      );
      done();
    });
  });

  it('negative: should emit loadLogsFailure when api errors', (done) => {
    logsApiServiceMock.getLogs.and.returnValue(
      throwError(() => new Error('request failed')),
    );

    const action = loadLogs({
      searchDto,
    });
    const subject = new ReplaySubject(1);
    subject.next(action);
    actions$ = subject.asObservable();

    effects.loadLogs$.subscribe((result) => {
      expect(result).toEqual(loadLogsFailure({ error: 'request failed' }));
      done();
    });
  });

  it('borderline: should call api with incoming dto fields', (done) => {
    logsApiServiceMock.getLogs.and.returnValue(
      of({
        ...searchResult,
        sortedBy: 'vehicleId',
        sortedOrder: 'asc',
      }),
    );

    const subject = new ReplaySubject(1);
    subject.next(loadLogs({ searchDto: searchDto2 }));
    actions$ = subject.asObservable();

    effects.loadLogs$.subscribe(() => {
      expect(logsApiServiceMock.getLogs).toHaveBeenCalledWith(searchDto2);
      done();
    });
  });
});
