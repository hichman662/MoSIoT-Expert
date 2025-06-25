/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { CarePlanTemplate } from './carePlanTemplate.model';
import { Target } from './target.model';
export class Goal {
    Id: number;
    Name?: string;
    Description?: string;
    CarePlanTemplate?: CarePlanTemplate;
    LOINCcode?: string;
    Targets: Target[];

}
