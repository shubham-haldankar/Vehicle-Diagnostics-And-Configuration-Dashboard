import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as LogsActions from './store/logs.actions';
import * as LogsSelectors from './store/logs.selectors';
import { SearchFilter } from './models/search-filter';

@Injectable({
  providedIn: 'root',
})
export class LogsSandbox {
  logs$ = this.store.select(LogsSelectors.selectLogs);
  loading$ = this.store.select(LogsSelectors.selectLoading);

  constructor(private store: Store) {}

  loadLogs(searchFilter: SearchFilter): void {
    this.store.dispatch(LogsActions.loadLogs({ searchFilter }));
  }
}
