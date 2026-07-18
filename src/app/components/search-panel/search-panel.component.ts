import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchFilter } from '../../models/SearchFilter';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent {
  @Output() search = new EventEmitter<SearchFilter>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      vehicleId: [''],
      errorCode: [''],
      severity: [''],
      from: [''],
      to: [''],
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.search.emit(this.normalizeFilter(this.searchForm.value));
    }
  }

  onReset(): void {
    this.searchForm.reset({
      vehicleId: '',
      errorCode: '',
      severity: '',
      from: '',
      to: '',
    });
    this.search.emit(this.normalizeFilter(this.searchForm.value));
  }

  private normalizeFilter(value: any): SearchFilter {
    return {
      vehicleId: value.vehicleId?.trim() || '',
      errorCode: value.errorCode?.trim() || '',
      severity: value.severity || '',
      from: value.from || '',
      to: value.to || '',
    };
  }

  get vehicleId() {
    return this.searchForm.get('vehicleId');
  }
}
