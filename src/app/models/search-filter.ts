export interface SearchFilter {
  vehicleId?: string;
  errorCode?: string;
  severity?: string;
  fromDate?: string; // ISO date string: '2025-08-01'
  toDate?: string; // ISO date string
}
