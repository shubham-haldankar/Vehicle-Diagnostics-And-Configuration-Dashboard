export interface SearchDto {
  vehicleId?: string;
  errorCode?: string;
  severity?: string;
  fromDate?: string; // ISO date string: '2025-08-01'
  toDate?: string; // ISO date string
  limit?: number;
  offset?: number;
  sortBy?: string; // field name to sort by
  sortOrder?: 'asc' | 'desc'; // sort direction
}
