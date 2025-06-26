import { UserData } from 'src/app/models/userData.model';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */

import { PatientProfile } from './patientProfile.model';

export class Patient {
  id?:             number;
  email?:          string;
  patientProfile?: PatientProfile;
  userPatient?: UserData;
}
