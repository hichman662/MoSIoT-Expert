/* eslint-disable @typescript-eslint/naming-convention */
import { ValueAppointment } from './ValueAppointment.model';
export class Appointment {
  Id:               number;
  Name:             string;
  Date:             Date;
  Description:      string;
  ValueAppointment: ValueAppointment;
}
