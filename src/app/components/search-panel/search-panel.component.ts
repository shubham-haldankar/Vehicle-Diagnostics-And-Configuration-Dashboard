import { Component, EventEmitter, Output } from '@angular/core';
import { SearchDto } from '../../models/search-dto';

type SearchParams = {
  errorCode: string;
  severity: string;
  from: Date | null;
  to: Date | null;
};

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent {
  @Output() search = new EventEmitter<SearchDto>();

  searchParams: SearchParams = this.defaultParams();

  onErrorCodeChange(value: string): void {
    this.searchParams.errorCode = value ?? '';
  }

  onSeverityChange(value: string): void {
    this.searchParams.severity = value ?? '';
  }

  onFromDateChange(value: Date | null): void {
    this.searchParams.from = value;
  }

  onToDateChange(value: Date | null): void {
    this.searchParams.to = value;
  }

  onSubmit(): void {
    this.search.emit(this.normalizeDto(this.searchParams));
  }

  onReset(): void {
    this.searchParams = this.defaultParams();
    this.search.emit(this.normalizeDto(this.searchParams));
  }

  private defaultParams(): SearchParams {
    return {
      errorCode: '',
      severity: '',
      from: null,
      to: null,
    };
  }

  private normalizeDto(value: SearchParams): SearchDto {
    return {
      vehicleId: '',
      errorCode: value.errorCode?.trim() || '',
      severity: value.severity || '',
      fromDate: this.toIsoDate(value.from),
      toDate: this.toIsoDate(value.to),
    };
  }

  private toIsoDate(value: Date | null): string {
    if (!value) {
      return '';
    }
    return value.toISOString().split('T')[0];
  }
}
