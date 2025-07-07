import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QualityLifeService } from '../services/quality-life.services'; 

@Component({
  selector: 'app-quality-life',
  templateUrl: './quality-life.page.html',
  styleUrls: ['./quality-life.page.scss'],
  standalone: false
})
export class QualityLifePage implements OnInit {
  formGroup: FormGroup;
  initialValues: number[] = [];
storedValues: number[] = [];


  qualityLabels = [
    'Physical Well-being',
    'Interpersonal Relationships',
    'Emotional Well-being',
    'Material Well-being',
    'Personal Development',
    'Self-Determination',
    'Social Inclusion',
    'Rights'
  ];

 constructor(
  private fb: FormBuilder,
  private qualityLifeService: QualityLifeService
) {
  this.formGroup = this.fb.group({});
  const storedValues = this.qualityLifeService.getInitialValues();

  this.qualityLabels.forEach((_, index) => {
    this.formGroup.addControl(index.toString(), new FormControl(storedValues[index] || 0.5));
  });
}

ngOnInit() {
  this.storedValues = this.qualityLifeService.getInitialValues();

  this.qualityLabels.forEach((_, index) => {
    this.formGroup.addControl(index.toString(), new FormControl(this.storedValues[index] || 0.5));
  });

  this.initialValues = this.getInitialValues();
  this.qualityLifeService.setInitialValues(this.initialValues);

  this.formGroup.valueChanges.subscribe(() => {
    this.initialValues = this.getInitialValues();
    this.qualityLifeService.setInitialValues(this.initialValues);
  });
}



  private getInitialValues(): number[] {
    return this.qualityLabels.map((_, i) =>
      Number(this.formGroup.get(i.toString())?.value || 0)
    );
  }
}
