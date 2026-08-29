import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LogsSandbox } from './logs.sandbox';
import * as LogsActions from './store/logs.actions';

describe('LogsSandbox', () => {
  let sandbox: LogsSandbox;
  let storeMock: {
    select: jasmine.Spy;
    dispatch: jasmine.Spy;
  };
  const dto = {
    vehicleId: '',
    errorCode: '',
    severity: '',
    fromDate: '',
    toDate: '',
    limit: 10,
    offset: 0,
  };

  beforeEach(() => {
    storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of(null)),
      dispatch: jasmine.createSpy('dispatch'),
    };

    sandbox = new LogsSandbox(storeMock as unknown as Store);
  });

  it('positive: should create sandbox', () => {
    expect(sandbox).toBeTruthy();
  });

  it('positive: should dispatch loadLogs action with dto', () => {
    sandbox.loadLogs(dto);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      LogsActions.loadLogs({ searchDto: dto }),
    );
  });

  it('negative: should dispatch setSearchDto even for empty values', () => {
    sandbox.setSearchDto(dto);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      LogsActions.setSearchDto({ searchDto: dto }),
    );
  });

  it('borderline: should initialize selector streams from store', () => {
    expect(storeMock.select).toHaveBeenCalledTimes(4);
    expect(sandbox.result$).toBeDefined();
    expect(sandbox.searchDto$).toBeDefined();
    expect(sandbox.loading$).toBeDefined();
    expect(sandbox.error$).toBeDefined();
  });
});
