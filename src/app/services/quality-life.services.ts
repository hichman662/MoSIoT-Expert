import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QualityLifeService {
  private initialValues: number[] = [
    0.24, 0.74, 0.34, 0.43, 0.37, 0.66, 0.26, 0.53 // Default initial values
  ];

  setInitialValues(values: number[]) {
    this.initialValues = values;
  }

  getInitialValues(): number[] {
    return this.initialValues;
  }
}
