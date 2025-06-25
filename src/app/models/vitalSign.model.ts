/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { Measure } from './measure.model';

export class VitalSign {
    Id: number;
    Name?: string;
    Description?: string;
    Measure?: Measure;
}
