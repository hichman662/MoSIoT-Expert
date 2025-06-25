/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Time } from '@angular/common';
import { ValueMedication } from './ValueMedication.model';
export class Medication {
  Id:               number;
  Name:             string;
  Date:             Date;
  Description:      string;
  //ValueMedication: ValueMedication;
  TimeAct : Time;
}
