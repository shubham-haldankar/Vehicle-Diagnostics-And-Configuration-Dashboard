import { SearchDto } from '../models/search-dto.model';
import { SearchResultDto } from '../models/search-result-dto.model';
import {
  loadLogs,
  loadLogsFailure,
  loadLogsSuccess,
  setSearchDto,
} from './logs.actions';

describe('logs.actions', () => {
  const searchDto: SearchDto = {
    vehicleId: 'VH-1',
    errorCode: '',
    severity: '',
    fromDate: '',
    toDate: '',
    limit: 10,
    offset: 0,
  };

  const result: SearchResultDto = {
    sortedBy: 'dateTimeCreated',
    sortedOrder: 'desc',
    limit: 0,
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
    searchDto.vehicleId = '';
    searchDto.errorCode = '';
    searchDto.severity = '';
  });

  it('positive: should create loadLogs action with payload', () => {
    searchDto.vehicleId = 'VH-1';
    const action = loadLogs({
      searchDto,
    });

    expect(action.type).toBe('[Logs] Load Logs');
    expect(action.searchDto.vehicleId).toBe('VH-1');
  });

  it('negative: should create failure action with error text', () => {
    const action = loadLogsFailure({ error: 'request failed' });

    expect(action.type).toBe('[Logs] Load Logs Failure');
    expect(action.error).toBe('request failed');
  });

  it('borderline: should create success action with empty records', () => {
    const action = loadLogsSuccess({
      result,
    });

    expect(action.type).toBe('[Logs] Load Logs Success');
    expect(action.result.records.length).toBe(0);
  });

  it('borderline: should create setSearchDto action', () => {
    searchDto.vehicleId = '';
    searchDto.errorCode = 'U1000';
    searchDto.severity = 'WARN';
    const action = setSearchDto({
      searchDto,
    });

    expect(action.type).toBe('[Logs] Set Search DTO');
    expect(action.searchDto.errorCode).toBe('U1000');
  });
});
