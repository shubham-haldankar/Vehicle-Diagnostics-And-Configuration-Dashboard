import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as LogsActions from './store/logs.actions';
import * as LogsSelectors from './store/logs.selectors';
import { SearchDto } from './models/search-dto';
import { LogsStats } from './models/log-entry.model';

@Injectable({
  providedIn: 'root',
})
export class LogsSandbox {
  logs$ = this.store.select(LogsSelectors.selectLogs);
  loading$ = this.store.select(LogsSelectors.selectLoading);
  error$ = this.store.select(LogsSelectors.selectError);
  stats$: Observable<LogsStats> = this.logs$.pipe(
    map((logs) => {
      const total = logs.length;
      const errors = logs.filter((l) => l.type === 'ERROR').length;
      const warns = logs.filter((l) => l.type === 'WARN').length;
      const infos = logs.filter((l) => l.type === 'INFO').length;
      const vehicles = new Set(logs.map((l) => l.vehicleId)).size;
      const codes = new Set(logs.map((l) => l.code)).size;
      return { total, errors, warns, infos, vehicles, codes } as LogsStats;
    }),
  );

  constructor(private store: Store) {}

  loadLogs(searchDto: SearchDto): void {
    this.store.dispatch(LogsActions.loadLogs({ searchDto }));
  }
}
