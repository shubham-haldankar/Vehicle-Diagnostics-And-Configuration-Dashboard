import { Component, OnInit } from '@angular/core';
import { SearchDto } from './models/search-dto';
import { LogsStats } from './models/log-entry.model';
import { LogsSandbox } from './logs.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  result$ = this.logsSandbox.result$;

  constructor(private logsSandbox: LogsSandbox) {}

  ngOnInit(): void {
    const searchDto: SearchDto = {
      /* initialize with appropriate values */
      limit: 10,
      offset: 0,
    };
    this.logsSandbox.loadLogs(searchDto);
  }

  statItems(s: LogsStats) {
    const t = s.total || 1;
    return [
      {
        label: 'TOTAL LOGS',
        value: s.total,
        sub: 'all entries',
        color: 'text-[#e8eaf0]',
      },
      {
        label: 'ERRORS',
        value: s.errors,
        sub: `${Math.round((s.errors / t) * 100)}%`,
        color: 'text-red-400',
      },
      {
        label: 'WARNINGS',
        value: s.warns,
        sub: `${Math.round((s.warns / t) * 100)}%`,
        color: 'text-amber-400',
      },
      {
        label: 'VEHICLES',
        value: s.vehicles,
        sub: 'unique IDs',
        color: 'text-sky-400',
      },
      {
        label: 'FAULT CODES',
        value: s.codes,
        sub: 'distinct',
        color: 'text-violet-400',
      },
    ];
  }
}
