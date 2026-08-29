import {
  selectError,
  selectLoading,
  selectResult,
  selectSearchDto,
} from './logs.selectors';
import { LogsState } from './logs.reducer';

describe('logs.selectors', () => {
  const state: LogsState = {
    sortedBy: 'vehicleId',
    sortedOrder: 'asc',
    limit: 10,
    offset: 20,
    logs: [
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
    searchDto: {
      vehicleId: 'VH-1',
      errorCode: '',
      severity: 'ERROR',
      fromDate: '',
      toDate: '',
      limit: 10,
      offset: 20,
    },
    loading: true,
    error: 'boom',
  };

  it('positive: should select summarized result payload', () => {
    const result = selectResult.projector(state);

    expect(result.sortedBy).toBe('vehicleId');
    expect(result.sortedOrder).toBe('asc');
    expect(result.logs.length).toBe(1);
  });

  it('positive: should select loading flag', () => {
    expect(selectLoading.projector(state)).toBeTrue();
  });

  it('negative: should return null error when no error exists', () => {
    const noErrorState = { ...state, error: null };
    expect(selectError.projector(noErrorState)).toBeNull();
  });

  it('borderline: should return undefined search dto when not initialized', () => {
    const noDtoState = { ...state, searchDto: undefined };
    expect(selectSearchDto.projector(noDtoState)).toBeUndefined();
  });
});
