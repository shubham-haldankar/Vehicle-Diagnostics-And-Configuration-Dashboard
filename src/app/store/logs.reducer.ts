import { createReducer, on } from '@ngrx/store';
import { loadLogs, loadLogsFailure, loadLogsSuccess } from './logs.actions';
import { LogEntry, LogsStats, SortField } from '../models/log-entry.model';

export interface LogsState {
  sortedBy: SortField;
  sortedOrder: 'asc' | 'desc';
  limit: number;
  offset: number;
  logs: LogEntry[];
  stats: LogsStats;
  loading: boolean;
  error: string | null;
}

const initialState: LogsState = {
  sortedBy: 'dateTimeCreated',
  sortedOrder: 'desc',
  limit: 0,
  offset: 0,
  logs: [],
  stats: {
    total: 0,
    errors: 0,
    warns: 0,
    infos: 0,
    vehicles: 0,
    codes: 0,
  },
  loading: false,
  error: null,
};

export const logsReducer = createReducer(
  initialState,
  on(loadLogs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadLogsSuccess, (state, { result }) => ({
    ...state,
    sortedBy: result.sortedBy,
    sortedOrder: result.sortedOrder,
    limit: result.limit,
    offset: result.offset,
    logs: result.records,
    stats: result.stats,
    loading: false,
  })),
  on(loadLogsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
