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

  onSearch(filter: SearchFilter) {
    console.log(filter);
    this.store.dispatch(loadLogs({ filter }));
  }
}
