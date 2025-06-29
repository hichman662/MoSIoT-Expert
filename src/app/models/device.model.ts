import { DeviceTemplate } from './deviceTemplate.model';
/* eslint-disable @typescript-eslint/naming-convention */
export class Device {
    id?: number;
    description?: string;
    name?: string;
    deviceSwitch?: boolean;
    tag?: string;
    isSimulated?: boolean;
    serialNumber?: string;
    firmVersion?: string;
    trademark?: string;
    deviceTemplate?: DeviceTemplate;

}
