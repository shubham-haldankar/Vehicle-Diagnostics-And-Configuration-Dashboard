import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadLogs } from './store/logs.actions';
import { SearchDto } from './models/search-dto';
import { selectLogs } from './store/logs.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  logs$ = this.store.select(selectLogs);

  constructor(private store: Store) {}

  ngOnInit(): void {
    const searchDto: SearchDto = {
      /* initialize with appropriate values */
    };
    this.store.dispatch(loadLogs({ searchDto }));
  }
}
