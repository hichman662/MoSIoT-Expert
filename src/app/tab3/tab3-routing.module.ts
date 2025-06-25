import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'device',
    loadChildren: () => import('../device/device.module').then( m => m.DevicePageModule)
  },
  {
    path: 'telemetry',
    loadChildren: () => import('../telemetry/telemetry.module').then( m => m.TelemetryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
