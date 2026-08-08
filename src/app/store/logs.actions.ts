import { createAction, props } from '@ngrx/store';
import { SearchDto } from '../models/search-dto.model';
import { SearchResultDto } from '../models/search-result-dto.model';

export const loadLogs = createAction(
  '[Logs] Load Logs',
  props<{ searchDto: SearchDto }>(),
);

export const loadLogsSuccess = createAction(
  '[Logs] Load Logs Success',
  props<{ result: SearchResultDto }>(),
);

export const loadLogsFailure = createAction(
  '[Logs] Load Logs Failure',
  props<{ error: string }>(),
);

export const setSearchDto = createAction(
  '[Logs] Set Search DTO',
  props<{ searchDto: SearchDto }>(),
);
