/* eslint-disable @typescript-eslint/naming-convention */
import { CareActivity } from './careActivity.model';
import { Goal } from './goal.model';
export class CarePlanTemplate {

    Id: number;
    Status?: number;
    Name?: string;
    Description?: string;
    Intent?: number;
    Title?: string;
    Modified?: Date;
    DurationDays?: number;
    Goals?: Goal[];
    CareActivities?: CareActivity[];
}
