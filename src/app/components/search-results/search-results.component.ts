import { Component } from '@angular/core';
import { LogsSandbox } from 'src/app/logs.sandbox';
import { LogEntry } from 'src/app/models/log-entry.model';
import { SearchDto } from 'src/app/models/search-dto';

type SortField = 'dateTimeCreated' | 'vehicleId' | 'type' | 'code';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  logs$ = this.logsSandbox.logs$;
  loading$ = this.logsSandbox.loading$;
  error$ = this.logsSandbox.error$;

  sortField: SortField = 'dateTimeCreated';
  sortDir: 'asc' | 'desc' = 'desc';
  page = 1;
  pageSize = 10;
  totalPages = 1;
  pageNumbers: number[] = [];

  columns = [
    {
      label: 'DATE TIME CREATED',
      field: 'dateTimeCreated' as SortField,
      cls: 'w-44 min-w-[176px]',
    },
    {
      label: 'VEHICLE ID',
      field: 'vehicleId' as SortField,
      cls: 'w-28 min-w-[112px]',
    },
    {
      label: 'SEVERITY',
      field: 'type' as SortField,
      cls: 'w-20 min-w-[80px]',
    },
    { label: 'CODE', field: 'code' as SortField, cls: 'w-24 min-w-[96px]' },
    { label: 'DESCRIPTION', field: null, cls: '' },
  ];

  constructor(private logsSandbox: LogsSandbox) {}

  ngOnInit(): void {
    this.logsSandbox.loadLogs(this.defaultDto());
    this.logs$.subscribe((logs) => {
      console.log('Logs received in SearchResultsComponent:', logs[0]);
      this.totalPages = Math.max(1, Math.ceil(logs.length / this.pageSize));
      this.pageNumbers = Array.from(
        { length: Math.min(this.totalPages, 8) },
        (_, i) => i + 1,
      );
    });
  }

  sortedLogs(entries: LogEntry[]): LogEntry[] {
    const sorted = [...entries].sort((a, b) => {
      const av = a[this.sortField],
        bv = b[this.sortField];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return this.sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize,
    );
  }

  onSort(field: SortField): void {
    this.sortDir =
      this.sortField === field && this.sortDir === 'desc' ? 'asc' : 'desc';
    this.sortField = field;
    this.page = 1;
  }

  trackById(_: number, e: LogEntry): string {
    return e.id;
  }

  prevPage(): void {
    if (this.page > 1) this.page--;
  }
  nextPage(): void {
    if (this.page < this.totalPages) this.page++;
  }
  goToPage(p: number): void {
    this.page = p;
  }

  severityClass(sev: string): string {
    if (sev === 'ERROR') return 'border-red-500/35 text-red-400 bg-red-500/10';
    if (sev === 'WARN')
      return 'border-amber-500/35 text-amber-400 bg-amber-500/10';
    return 'border-sky-500/35 text-sky-400 bg-sky-500/10';
  }

  exportCSV(): void {
    this.logs$
      .subscribe((logs) => {
        const rows = [
          'DateTimeCreated,VehicleID,Severity,Code,Description',
          ...logs.map(
            (l) =>
              `"${l.dateTimeCreated}","${l.vehicleId}","${l.type}","${l.code}","${l.message}"`,
          ),
        ];
        const a = document.createElement('a');
        a.href = URL.createObjectURL(
          new Blob([rows.join('\n')], { type: 'text/csv' }),
        );
        a.download = 'diagnostic_logs.csv';
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .unsubscribe();
  }

  private defaultDto(): SearchDto {
    return {
      vehicleId: '',
      errorCode: '',
      severity: '',
      fromDate: '',
      toDate: '',
    };
  }
}
