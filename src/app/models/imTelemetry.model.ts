/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */

import { TeleValue } from './teleValue.model';
import { Telemetry } from './telemetry.model';

export class ImTelemetry {
    Id: number;
    Name?: string;
    Description?:string;
    Telemetry?:Telemetry;
    TeleValues?: TeleValue[];
}
