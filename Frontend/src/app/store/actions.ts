import { createAction, props } from "@ngrx/store";
import { SearchFilter } from "../models/SearchFilter";
import { LogEntry } from "../models/log-entry.model";

export const loadLogs = createAction('[Logs] Load Logs', props<{ filter: SearchFilter }>());
export const loadLogsSuccess = createAction('[Logs] Load Logs Success', props<{ logs: LogEntry[] }>());
export const loadLogsFailure = createAction('[Logs] Load Logs Failure', props<{ error: string }>());