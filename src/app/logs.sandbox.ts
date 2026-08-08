import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LogsActions from './store/logs.actions';
import * as LogsSelectors from './store/logs.selectors';
import { SearchDto } from './models/search-dto.model';

@Injectable({
  providedIn: 'root',
})
export class LogsSandbox {
  result$ = this.store.select(LogsSelectors.selectResult);
  searchDto$ = this.store.select(LogsSelectors.selectSearchDto);
  loading$ = this.store.select(LogsSelectors.selectLoading);
  error$ = this.store.select(LogsSelectors.selectError);

  constructor(private store: Store) {}

  loadLogs(searchDto: SearchDto): void {
    this.store.dispatch(LogsActions.loadLogs({ searchDto }));
  }

  setSearchDto(searchDto: SearchDto): void {
    this.store.dispatch(LogsActions.setSearchDto({ searchDto }));
  }
}
