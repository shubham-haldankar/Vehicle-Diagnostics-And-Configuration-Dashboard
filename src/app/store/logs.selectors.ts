import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogsState } from './logs.reducer';

export const selectLogsState = createFeatureSelector<LogsState>('logs');

export const selectLogs = createSelector(
  selectLogsState,
  (state) => state.logs,
);
export const selectLoading = createSelector(
  selectLogsState,
  (state) => state.loading,
);

export const selectError = createSelector(selectLogsState, (s) => s.error);
