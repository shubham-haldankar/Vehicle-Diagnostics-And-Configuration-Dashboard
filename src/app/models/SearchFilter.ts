export interface SearchFilter {
  vehicleId?: string;
  errorCode?: string;
  severity?: string;
  from?: string; // ISO date string: '2025-08-01'
  to?: string; // ISO date string
}
