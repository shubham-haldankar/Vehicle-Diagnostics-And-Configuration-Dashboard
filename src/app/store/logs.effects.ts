import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadLogs, loadLogsFailure, loadLogsSuccess } from './logs.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { LogsApiService } from '../services/logs-api.service';

@Injectable()
export class LogsEffects {
  loadLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLogs),
      switchMap(({ searchFilter }) =>
        this.logsApiService.getLogs(searchFilter).pipe(
          map((logs) => loadLogsSuccess({ logs })),
          catchError((err) => of(loadLogsFailure({ error: err.message }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private logsApiService: LogsApiService,
  ) {}
}
