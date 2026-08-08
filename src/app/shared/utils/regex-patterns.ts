export class RegexPatterns {
  static VEHICLE_ID_PATTERN = /^\d{4}$/;
  static ERROR_CODE_LIST_PATTERN =
    /^[BCPU][0-9A-F]{4}$/i;
}