import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then( m => m.PatientPageModule)
  },
  {
    path: 'scenarios',
    loadChildren: () => import('./scenarios/scenarios.module').then( m => m.ScenariosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'practitioner',
    loadChildren: () => import('./practitioner/practitioner.module').then( m => m.PractitionerPageModule)
  },
  {
    path: 'rel-person',
    loadChildren: () => import('./rel-person/rel-person.module').then( m => m.RelPersonPageModule)
  },
  {
    path: 'patient-access',
    loadChildren: () => import('./patient-access/patient-access.module').then( m => m.PatientAccessPageModule)
  },
  {
    path: 'care-plan',
    loadChildren: () => import('./care-plan/care-plan.module').then( m => m.CarePlanPageModule)
  },
  {
    path: 'care-activity',
    loadChildren: () => import('./care-activity/care-activity.module').then( m => m.CareActivityPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'communication',
    loadChildren: () => import('./communication/communication.module').then( m => m.CommunicationPageModule)
  },
  {
    path: 'vital-sign',
    loadChildren: () => import('./vital-sign/vital-sign.module').then( m => m.VitalSignPageModule)
  },
  {
    path: 'nutrition',
    loadChildren: () => import('./nutrition/nutrition.module').then( m => m.NutritionPageModule)
  },
  {
    path: 'medication',
    loadChildren: () => import('./medication/medication.module').then( m => m.MedicationPageModule)
  },
  {
    path: 'device',
    loadChildren: () => import('./device/device.module').then( m => m.DevicePageModule)
  },
  {
    path: 'telemetry',
    loadChildren: () => import('./telemetry/telemetry.module').then( m => m.TelemetryPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'quality-life',
    loadChildren: () => import('./quality-life/quality-life.module').then( m => m.QualityLifePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

