/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { Measure } from './measure.model';

export class VitalSign {
    id?: number;
    name?: string;
    description?: string;
    measure?: Measure;
}
