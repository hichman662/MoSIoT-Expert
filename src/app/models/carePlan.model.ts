/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { CarePlanTemplate } from './carePlanTemplate.model';
export class CarePlan {
    id?: number;
    name?: string;
    description?: string;
    carePlanTemplate?: CarePlanTemplate;
}
