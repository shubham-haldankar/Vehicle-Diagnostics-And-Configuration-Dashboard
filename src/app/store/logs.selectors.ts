import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogsState } from './logs.reducer';

export const selectResultsState = createFeatureSelector<LogsState>('results');

export const selectResult = createSelector(selectResultsState, (state) => ({
  sortedBy: state.sortedBy,
  sortedOrder: state.sortedOrder,
  limit: state.limit,
  offset: state.offset,
  logs: state.logs,
  stats: state.stats,
}));

export const selectLoading = createSelector(
  selectResultsState,
  (state) => state.loading,
);

export const selectError = createSelector(
  selectResultsState,
  (state) => state.error,
);
