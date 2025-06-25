import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelemetryPage } from './telemetry.page';

const routes: Routes = [
  {
    path: '',
    component: TelemetryPage
  },
  {
    path: 'blood-pressure/:systolic/:diastolic',
    loadChildren: () => import('./blood-pressure/blood-pressure.module').then( m => m.BloodPressurePageModule)
  },
  {
    path: 'body-temperature/:bodyTemperature',
    loadChildren: () => import('./body-temperature/body-temperature.module').then( m => m.BodyTemperaturePageModule)
  },
  {
    path: 'heart-rate/:heartRate',
    loadChildren: () => import('./heart-rate/heart-rate.module').then( m => m.HeartRatePageModule)
  },
  {
    path: 'respiratory-rate/:respiratoryRate',
    loadChildren: () => import('./respiratory-rate/respiratory-rate.module').then( m => m.RespiratoryRatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelemetryPageRoutingModule {}
