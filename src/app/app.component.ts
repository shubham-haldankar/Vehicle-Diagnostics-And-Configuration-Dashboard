import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadLogs } from './store/logs.actions';
import { SearchFilter } from './models/search-filter';
import { selectLogs } from './store/logs.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  logs$ = this.store.select(selectLogs);

  constructor(private store: Store) {}

  onSearch(searchFilter: SearchFilter) {
    console.log(searchFilter);
    this.store.dispatch(loadLogs({ searchFilter }));
  }
}
