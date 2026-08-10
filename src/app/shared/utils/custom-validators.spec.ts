import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  describe('fromDateBeforeOrEqualToToDate', () => {
    it('positive: should pass when fromDate is before toDate', () => {
      const formGroup = new FormGroup({
        fromDate: new FormControl('2026-08-01'),
        toDate: new FormControl('2026-08-05'),
      });
      const validator = CustomValidators.fromDateBeforeOrEqualToToDate(
        'fromDate',
        'toDate',
      );

      expect(validator(formGroup)).toBeNull();
    });

    it('negative: should fail when fromDate is after toDate', () => {
      const formGroup = new FormGroup({
        fromDate: new FormControl('2026-08-06'),
        toDate: new FormControl('2026-08-05'),
      });
      const validator = CustomValidators.fromDateBeforeOrEqualToToDate(
        'fromDate',
        'toDate',
      );

      expect(validator(formGroup)).toEqual({ invalidDateRange: true });
    });

    it('borderline: should pass when both dates are equal', () => {
      const formGroup = new FormGroup({
        fromDate: new FormControl('2026-08-05'),
        toDate: new FormControl('2026-08-05'),
      });
      const validator = CustomValidators.fromDateBeforeOrEqualToToDate(
        'fromDate',
        'toDate',
      );

      expect(validator(formGroup)).toBeNull();
    });
  });
});
