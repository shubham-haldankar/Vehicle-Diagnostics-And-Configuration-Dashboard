import { Component, EventEmitter, Output } from '@angular/core';
import { SearchFilter } from '../../models/SearchFilter';
import { DropdownOption } from '../../shared/components/dropdown-input/dropdown-input.component';

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
  @Output() search = new EventEmitter<SearchFilter>();

  readonly severityOptions: DropdownOption[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

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
    this.search.emit(this.normalizeFilter(this.searchParams));
  }

  onReset(): void {
    this.searchParams = this.defaultParams();
    this.search.emit(this.normalizeFilter(this.searchParams));
  }

  private defaultParams(): SearchParams {
    return {
      errorCode: '',
      severity: '',
      from: null,
      to: null,
    };
  }

  private normalizeFilter(value: SearchParams): SearchFilter {
    return {
      vehicleId: '',
      errorCode: value.errorCode?.trim() || '',
      severity: value.severity || '',
      from: this.toIsoDate(value.from),
      to: this.toIsoDate(value.to),
    };
  }

  private toIsoDate(value: Date | null): string {
    if (!value) {
      return '';
    }
    return value.toISOString().split('T')[0];
  }
}
