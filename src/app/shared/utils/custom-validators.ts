import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static fromDateBeforeOrEqualToToDate(
    fromDateKey: string,
    toDateKey: string,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromDate = control.get(fromDateKey)?.value;
      const toDate = control.get(toDateKey)?.value;

      if (!fromDate || !toDate) {
        return null;
      }

      return fromDate <= toDate ? null : { invalidDateRange: true };
    };
  }
}
