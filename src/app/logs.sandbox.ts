import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LogsActions from './store/logs.actions';
import * as LogsSelectors from './store/logs.selectors';
import { SearchDto } from './models/search-dto';

@Injectable({
  providedIn: 'root',
})
export class LogsSandbox {
  logs$ = this.store.select(LogsSelectors.selectLogs);
  loading$ = this.store.select(LogsSelectors.selectLoading);

  constructor(private store: Store) {}

  loadLogs(searchDto: SearchDto): void {
    this.store.dispatch(LogsActions.loadLogs({ searchDto }));
  }
}
