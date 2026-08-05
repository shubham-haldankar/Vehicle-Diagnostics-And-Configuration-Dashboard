import { Component } from '@angular/core';
import { LogsSandbox } from 'src/app/logs.sandbox';
import { LogEntry, SortField } from 'src/app/models/log-entry.model';
import { SearchDto } from 'src/app/models/search-dto';
import { take } from 'rxjs/operators';
import { LogsApiService } from 'src/app/services/logs-api.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  result$ = this.logsSandbox.result$;
  searchDto$ = this.logsSandbox.searchDto$;
  loading$ = this.logsSandbox.loading$;
  error$ = this.logsSandbox.error$;

  sortField: SortField = 'dateTimeCreated';
  sortDir: 'asc' | 'desc' = 'desc';
  page = 1;
  pageSize = 10;
  totalPages = 1;
  pageNumbers: number[] = [];
  activeEntry: LogEntry | null = null;

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
      field: 'logType' as SortField,
      cls: 'w-20 min-w-[80px]',
    },
    {
      label: 'FAULT CODE',
      field: 'code' as SortField,
      cls: 'w-24 min-w-[96px]',
    },
    { label: 'DESCRIPTION', field: null, cls: '' },
  ];

  constructor(
    private logsSandbox: LogsSandbox,
    private logsApiService: LogsApiService,
  ) {}

  openModal(entry: LogEntry): void {
    this.activeEntry = entry;
  }

  closeModal(): void {
    this.activeEntry = null;
  }

  ngOnInit(): void {
    this.logsSandbox.loadLogs(this.defaultDto());
    this.logsSandbox.setSearchDto(this.defaultDto());

    this.result$.subscribe({
      next: ({ sortedBy, sortedOrder, logs, stats, offset }) => {
        this.sortField = sortedBy ?? 'dateTimeCreated';
        this.sortDir = sortedOrder ?? 'desc';
        this.page = offset / this.pageSize + 1;
        this.totalPages = Math.max(1, Math.ceil(stats.total / this.pageSize));
        const start = Math.max(1, Math.min(this.page - 3, this.totalPages - 7));
        const end = Math.min(this.totalPages, Math.max(this.page + 4, 8));
        this.pageNumbers = Array.from(
          { length: end - start + 1 },
          (_, i) => start + i,
        );
        console.log('Logs received in SearchResultsComponent:', logs[0]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSort(field: SortField): void {
    this.page = 1; // Reset to first page on sort
    this.goToPage(1); // Reset to first page on sort
    this.sortDir =
      this.sortField === field && this.sortDir === 'desc' ? 'asc' : 'desc';
    this.sortField = field;
    this.searchDto$.pipe(take(1)).subscribe((dto) => {
      const nextSearchDto = {
        ...(dto ?? this.defaultDto()),
        sortBy: this.sortField,
        sortOrder: this.sortDir,
      };

      this.logsSandbox.setSearchDto(nextSearchDto);
      this.logsSandbox.loadLogs(nextSearchDto);
    });
  }

  trackById(_: number, e: LogEntry): string {
    return e.id;
  }

  prevPage(): void {
    if (this.page > 1) this.page--;
    this.goToPage(this.page);
  }

  nextPage(): void {
    if (this.page < this.totalPages) this.page++;
    this.goToPage(this.page);
  }

  goToPage(p: number): void {
    this.page = p;
    const nextOffset = (this.page - 1) * this.pageSize;
    this.searchDto$.pipe(take(1)).subscribe((dto) => {
      const current = dto ?? this.defaultDto();
      if (current.offset === nextOffset) return;

      const nextSearchDto = {
        ...current,
        offset: nextOffset,
      };

      this.logsSandbox.setSearchDto(nextSearchDto);
      this.logsSandbox.loadLogs(nextSearchDto);
    });
  }

  severityClass(sev: string): string {
    if (sev === 'ERROR') return 'border-red-500/35 text-red-400 bg-red-500/10';
    if (sev === 'WARN')
      return 'border-amber-500/35 text-amber-400 bg-amber-500/10';
    if (sev === 'INFO') return 'border-sky-500/35 text-sky-400 bg-sky-500/10';
    return 'border-gray-500/35 text-gray-400 bg-gray-500/10';
  }

  exportCSV(): void {
    this.searchDto$.pipe(take(1)).subscribe((dto) => {
      this.result$.pipe(take(1)).subscribe(({ stats }) => {
        const fullExportDto: SearchDto = {
          ...(dto ?? this.defaultDto()),
          offset: 0,
          limit: Math.max(stats.total, 1),
        };

        this.logsApiService
          .getLogs(fullExportDto)
          .pipe(take(1))
          .subscribe(({ records }) => {
            const rows = [
              'DateTimeCreated,VehicleID,Severity,Code,Description',
              ...records.map(
                (r) =>
                  `"${r.dateTimeCreated}","${r.vehicleId}","${r.type}","${r.code}","${r.message}"`,
              ),
            ];
            const a = document.createElement('a');
            a.href = URL.createObjectURL(
              new Blob([rows.join('\n')], { type: 'text/csv' }),
            );
            a.download = 'diagnostic_logs.csv';
            a.click();
            URL.revokeObjectURL(a.href);
          });
      });
    });
  }

  private defaultDto(): SearchDto {
    return {
      vehicleId: '',
      errorCode: '',
      severity: '',
      fromDate: '',
      toDate: '',
      limit: 10,
      offset: (this.page - 1) * this.pageSize,
    };
  }
}
