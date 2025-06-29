/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { CarePlanTemplate } from './carePlanTemplate.model';
import { Target } from './target.model';
export class Goal {
    id?: number;
    name?: string;
    description?: string;
    carePlanTemplate?: CarePlanTemplate;
    lOINCcode?: string;
    targets?: Target[];

}
