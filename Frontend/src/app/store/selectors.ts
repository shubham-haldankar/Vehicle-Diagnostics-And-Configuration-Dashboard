import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LogsState } from "./reducer";

export const selectLogsState = createFeatureSelector<LogsState>('logs');

export const selectAllLogs = createSelector(selectLogsState, state => state.logs);
export const selectLoading = createSelector(selectLogsState, state => state.loading);