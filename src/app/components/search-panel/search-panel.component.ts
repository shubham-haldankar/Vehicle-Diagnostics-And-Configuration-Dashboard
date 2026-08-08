import { Component, OnInit } from '@angular/core';
import { SearchDto } from '../../models/search-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogsSandbox } from 'src/app/logs.sandbox';
import { CustomValidators } from 'src/app/shared/utils/custom-validators';
import { RegexPatterns } from 'src/app/shared/utils/regex-patterns';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {
  searchForm!: FormGroup;
  searchDto: SearchDto = this.defaultDto();
  hasSearchAttempted = false;

  constructor(
    private fb: FormBuilder,
    private logsSandbox: LogsSandbox,
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group(
      {
        vehicleId: [
          '',
          [
            Validators.pattern(RegexPatterns.VEHICLE_ID_PATTERN),
          ],
        ],
        errorCode: [
          '',
          [
            Validators.pattern(RegexPatterns.ERROR_CODE_LIST_PATTERN),
          ],
        ],
        severity: [''],
        fromDate: [''],
        toDate: [''],
      },
      {
        validators: [
          CustomValidators.fromDateBeforeOrEqualToToDate('fromDate', 'toDate'),
        ],
      },
    );
  }

  onSearch(): void {
    this.hasSearchAttempted = true;

    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.searchDto = this.createSearchDto();
    this.logsSandbox.loadLogs(this.searchDto);
    this.logsSandbox.setSearchDto(this.searchDto);
  }

  onClear(): void {
    this.hasSearchAttempted = false;
    this.searchForm.reset();
    this.searchForm.patchValue(this.defaultDto());
    this.searchDto = this.defaultDto();
    this.logsSandbox.loadLogs(this.searchDto);
    this.logsSandbox.setSearchDto(this.searchDto);
  }

  private defaultDto(): SearchDto {
    return {
      vehicleId: '',
      errorCode: '',
      severity: '',
      fromDate: '',
      toDate: '',
      limit: 10,
      offset: 0,
    };
  }

  private createSearchDto(): SearchDto {
    return {
      vehicleId: this.vehicleId?.value?.trim() || '',
      errorCode: this.errorCode?.value?.trim() || '',
      severity: this.severity?.value || '',
      fromDate: this.fromDate?.value || '',
      toDate: this.toDate?.value || '',
      limit: 10,
      offset: 0,
    };
  }

  get vehicleId() {
    return this.searchForm.get('vehicleId');
  }

  get errorCode() {
    return this.searchForm.get('errorCode');
  }

  get severity() {
    return this.searchForm.get('severity');
  }

  get fromDate() {
    return this.searchForm.get('fromDate');
  }

  get toDate() {
    return this.searchForm.get('toDate');
  }

  get showVehicleIdError(): boolean {
    return !!(this.hasSearchAttempted && this.vehicleId?.errors?.['pattern']);
  }

  get showErrorCodeError(): boolean {
    return !!(this.hasSearchAttempted && this.errorCode?.errors?.['pattern']);
  }

  get showDateRangeError(): boolean {
    return !!(this.hasSearchAttempted && 
      this.searchForm.errors?.['invalidDateRange']
    );
  }
}
