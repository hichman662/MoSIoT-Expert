import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page
  },
  {
    path: 'patient',
    loadChildren: () => import('../patient/detail-patient/detail-patient.module').then( m => m.DetailPatientPageModule)
  },
  {
    path: 'practitioner',
    loadChildren: () => import('../practitioner/practitioner.module').then( m => m.PractitionerPageModule)
  },
  {
    path: 'relatedPerson',
    loadChildren: () => import('../rel-person/rel-person.module').then( m => m.RelPersonPageModule)
  },
  {
    path: 'patientAccess',
    loadChildren: () => import('../patient-access/patient-access.module').then( m => m.PatientAccessPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}

