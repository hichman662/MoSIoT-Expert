/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Time } from './time.model';
import { ValueMedication } from './valueMedication.model';
export class Medication {
  id?:               number;
  name?:             string;
  date?:             Date;
  description?:      string;
  //ValueMedication: ValueMedication;
  timeAct? : Time;
}
