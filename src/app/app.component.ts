import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadLogs } from './store/actions';
import { SearchFilter } from './models/SearchFilter';
import { selectAllLogs } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  logs$ = this.store.select(selectAllLogs);

  constructor(private store: Store) {}

  onSearch(filter: SearchFilter) {
    console.log(filter);
    this.store.dispatch(loadLogs({ filter }));
  }
}
