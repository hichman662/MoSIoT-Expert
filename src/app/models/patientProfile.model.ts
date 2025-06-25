
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { Disease } from './disease.model';
import { Disability } from './disability.model';

export class PatientProfile {
  Id?:                number;
  PreferredLanguage?: number;
  Region?:            string;
  HazardAvoidance?:   number;
  Name?:              string;
  Description?:       string;
  Diseases?:          Disease[];
  Disabilities?:      Disability[];
}
