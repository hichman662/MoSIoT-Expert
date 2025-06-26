/* eslint-disable @typescript-eslint/naming-convention */
import { CareActivity } from './careActivity.model';
import { Goal } from './goal.model';
export class CarePlanTemplate {

    id?: number;
    status?: number;
    name?: string;
    description?: string;
    intent?: number;
    title?: string;
    modified?: Date;
    durationDays?: number;
    goals?: Goal[];
    careActivities?: CareActivity[];
}
