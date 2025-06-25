/* eslint-disable @typescript-eslint/naming-convention */
import { Medication } from './medication.model';
import { Communication } from './communication.model';
import { Appointment } from './appointment.model';
export class CareActivity {

    Id: number;
    Name?: string;
    Description?: string;
    Periodicity?: number;
    Duration?: number;
    Location?: string;
    OutcomeCode?: string;
    TypeActivity?: number;
    ActivityCode?: string;
    Communications?: Communication[];
    Appointments?: Appointment[];
    Medications?: Medication | null;
    NutritionOrders?: any;
}
