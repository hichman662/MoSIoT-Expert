/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */

import { Measure } from './measure.model';

export class Target {
    id?: number;
    desiredValue?: string;
    description?:string;
    dueDate?:Date;
    measure?: Measure;

}
