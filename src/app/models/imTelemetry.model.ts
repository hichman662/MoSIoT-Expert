/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */

import { TeleValue } from './teleValue.model';
import { Telemetry } from './telemetry.model';

export class ImTelemetry {
    id?: number;
    name?: string;
    description?:string;
    telemetry?:Telemetry;
    teleValues?: TeleValue[];
}
