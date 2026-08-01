export interface LogEntry {
  id: string;
  vehicleId: string;
  code: string;
  dateTimeCreated: string;
  message: string;
  type: string;
}

export interface LogsStats {
  total: number;
  errors: number;
  warns: number;
  infos: number;
  vehicles: number;
  codes: number;
}

export type SortField = 'dateTimeCreated' | 'vehicleId' | 'type' | 'code';
