import { Component, OnInit } from '@angular/core';
import { pairwise } from 'rxjs/operators';
import { LogsStats } from './models/log-entry.model';
import { LogsSandbox } from './logs.sandbox';
import { SearchDto } from './models/search-dto.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  result$ = this.logsSandbox.result$;
  loading$ = this.logsSandbox.loading$;

  showRefreshSpinner = true;

  constructor(private logsSandbox: LogsSandbox) {}

  ngOnInit(): void {
    this.logsSandbox.loadLogs(this.defaultDto());
    this.logsSandbox.setSearchDto(this.defaultDto());

    this.loading$
      .pipe(pairwise())
      .subscribe(([previousState, currentState]) => {
        if (previousState && !currentState) {
          this.showRefreshSpinner = false;
        }
      });
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
  private defaultDto(): SearchDto {
    return {
      vehicleId: '',
      errorCode: '',
      severity: '',
      fromDate: '',
      toDate: '',
      limit: 10,
      offset: 0,
    };
  }
}
