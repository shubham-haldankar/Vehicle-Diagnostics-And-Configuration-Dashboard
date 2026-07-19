import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
})
export class DateRangePickerComponent {
  @Input() label = 'Timestamp Range';

  @Input() fromLabel = 'From';

  @Input() toLabel = 'To';

  @Input() fromPlaceholder = 'dd-mm-yyyy';

  @Input() toPlaceholder = 'dd-mm-yyyy';

  @Input() dateFormat = 'dd-mm-yy';

  @Input() fromDate: Date | null = null;

  @Input() toDate: Date | null = null;

  @Input() minDate?: Date;

  @Input() maxDate?: Date;

  @Input() showIcon = true;

  @Input() showButtonBar = false;

  @Output() fromDateChange = new EventEmitter<Date | null>();

  @Output() toDateChange = new EventEmitter<Date | null>();

  @Output() rangeChange = new EventEmitter<{
    fromDate: Date | null;
    toDate: Date | null;
  }>();

  onFromDateChange(value: Date | null): void {
    this.fromDate = value;
    this.fromDateChange.emit(value);
    this.emitRange();
  }

  onToDateChange(value: Date | null): void {
    this.toDate = value;
    this.toDateChange.emit(value);
    this.emitRange();
  }

  private emitRange(): void {
    this.rangeChange.emit({
      fromDate: this.fromDate,
      toDate: this.toDate,
    });
  }
}
