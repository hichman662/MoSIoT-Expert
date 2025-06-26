/* eslint-disable @typescript-eslint/naming-convention */
import { ValueAppointment } from './valueAppointment.model';

export class Appointment {
  id?:               number;
  name?:             string;
  date?:             Date;
  description?:      string;
  valueAppointment?: ValueAppointment;
}
