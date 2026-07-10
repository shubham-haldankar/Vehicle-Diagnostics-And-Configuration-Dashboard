import { Component, Input } from '@angular/core';
import { LogEntry } from 'src/app/models/log-entry.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  @Input() logs: LogEntry[] | null = [];
}
