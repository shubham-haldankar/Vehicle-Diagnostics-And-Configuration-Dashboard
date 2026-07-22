import { Component, OnInit } from '@angular/core';
import { SearchDto } from '../../models/search-dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogsSandbox } from 'src/app/logs.sandbox';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {
  searchForm!: FormGroup;
  searchDto: SearchDto = this.defaultDto();

  constructor(
    private fb: FormBuilder,
    private logsSandbox: LogsSandbox,
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      vehicleId: [''],
      errorCode: [''],
      severity: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  onSearch(): void {
    this.searchDto = this.createSearchDto();
    this.logsSandbox.loadLogs(this.searchDto);
  }

  onClear(): void {
    this.searchForm.reset();
    this.searchDto = this.defaultDto();
  }

  private defaultDto(): SearchDto {
    return {
      vehicleId: '',
      errorCode: '',
      severity: '',
      fromDate: '',
      toDate: '',
    };
  }

  private createSearchDto(): SearchDto {
    return {
      vehicleId: this.vehicleId?.value.trim() || '',
      errorCode: this.errorCode?.value.trim() || '',
      severity: this.severity?.value || '',
      fromDate: this.fromDate?.value || '',
      toDate: this.toDate?.value || '',
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
}
