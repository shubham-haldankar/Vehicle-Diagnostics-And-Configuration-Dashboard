import { createReducer, on } from '@ngrx/store';
import { loadLogs, loadLogsFailure, loadLogsSuccess } from './actions';
import { LogEntry } from '../models/log-entry.model';

export interface LogsState {
  logs: LogEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LogsState = {
  logs: [],
  loading: false,
  error: null,
};

export const logsReducer = createReducer(
  initialState,
  on(loadLogs, (state) => ({ ...state, loading: true, error: null })),
  on(loadLogsSuccess, (state, { logs }) => ({
    ...state,
    logs,
    loading: false,
  })),
  on(loadLogsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
