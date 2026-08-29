import { logsReducer } from './logs.reducer';
import {
  loadLogs,
  loadLogsFailure,
  loadLogsSuccess,
  setSearchDto,
} from './logs.actions';
import { SearchDto } from '../models/search-dto.model';
import { SearchResultDto } from '../models/search-result-dto.model';

describe('logsReducer', () => {
  const searchDto: SearchDto = {
    vehicleId: '',
    errorCode: '',
    severity: '',
    fromDate: '',
    toDate: '',
    limit: 10,
    offset: 0,
  };

  const searchDto2: SearchDto ={
          vehicleId: 'VH-2',
          errorCode: 'P0300',
          severity: 'WARN',
          fromDate: '2026-08-01',
          toDate: '2026-08-05',
          limit: 10,
          offset: 0,
        };

  const result: SearchResultDto = {
    sortedBy: 'vehicleId',
    sortedOrder: 'asc',
    limit: 10,
    offset: 10,
    records: [
      {
        id: '1',
        vehicleId: 'VH-1',
        code: 'U1000',
        dateTimeCreated: '2026-08-05 10:00:00',
        message: 'm1',
        type: 'ERROR',
      },
    ],
    stats: {
      total: 1,
      errors: 1,
      warns: 0,
      infos: 0,
      vehicles: 1,
      codes: 1,
    },
  };

  it('positive: should set loading true and clear error on loadLogs', () => {
    const state = logsReducer(
      undefined,
      loadLogs({
        searchDto: { ...searchDto, vehicleId: 'VH-1' },
      }),
    );

    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('positive: should update result fields on loadLogsSuccess', () => {
    const state = logsReducer(
      undefined,
      loadLogsSuccess({
        result,
      }),
    );

    expect(state.loading).toBeFalse();
    expect(state.sortedBy).toBe('vehicleId');
    expect(state.logs.length).toBe(1);
    expect(state.offset).toBe(10);
  });

  it('negative: should store error and stop loading on failure', () => {
    const loadingState = logsReducer(
      undefined,
      loadLogs({
        searchDto: {
          ...searchDto,
          vehicleId: '',
        },
      }),
    );

    const failedState = logsReducer(
      loadingState,
      loadLogsFailure({ error: 'network failed' }),
    );

    expect(failedState.loading).toBeFalse();
    expect(failedState.error).toBe('network failed');
  });

  it('borderline: should preserve state for unknown action', () => {
    const state = logsReducer(undefined, { type: 'UNKNOWN_ACTION' } as any);

    expect(state.sortedBy).toBe('dateTimeCreated');
    expect(state.logs).toEqual([]);
  });

  it('borderline: should save search dto values without changing logs payload', () => {
    const state = logsReducer(
      undefined,
      setSearchDto({
        searchDto: searchDto2,
      }),
    );

    expect(state.searchDto?.vehicleId).toBe('VH-2');
    expect(state.logs.length).toBe(0);
  });
});
