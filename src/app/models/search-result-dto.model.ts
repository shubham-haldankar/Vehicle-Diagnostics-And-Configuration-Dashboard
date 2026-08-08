import { LogEntry, LogsStats, SortField } from './log-entry.model';

export interface SearchResultDto {
  sortedBy: SortField;
  sortedOrder: 'asc' | 'desc';
  limit: number;
  offset: number;
  records: LogEntry[];
  stats: LogsStats;
}
