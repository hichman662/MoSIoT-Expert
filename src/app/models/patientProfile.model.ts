
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { Disease } from './disease.model';
import { Disability } from './disability.model';

export class PatientProfile {
  id?:                number;
  preferredLanguage?: number;
  region?:            string;
  hazardAvoidance?:   number;
  name?:              string;
  description?:       string;
  diseases?:          Disease[];
  disabilities?:      Disability[];
}
