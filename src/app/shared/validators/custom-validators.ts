import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function isEmptyInputValue(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}

export const CustomValidators = {
  equalTo(targetControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control || !targetControl || isEmptyInputValue(control.value)) {
        return null;
      }

      return control.value === targetControl.value ? null : { equalTo: true };
    };
  },

  range(bounds: [number, number]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control || isEmptyInputValue(control.value)) {
        return null;
      }

      const value = Number(control.value);
      if (Number.isNaN(value)) {
        return { range: true };
      }

      return value >= bounds[0] && value <= bounds[1] ? null : { range: true };
    };
  },

  url(control: AbstractControl): ValidationErrors | null {
    if (!control || isEmptyInputValue(control.value)) {
      return null;
    }

    const value = String(control.value);
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-./?%&=]*)?$/i;
    return pattern.test(value) ? null : { url: true };
  },

  date(control: AbstractControl): ValidationErrors | null {
    if (!control || isEmptyInputValue(control.value)) {
      return null;
    }

    const parsedDate = new Date(control.value);
    return Number.isNaN(parsedDate.getTime()) ? { date: true } : null;
  }
};
