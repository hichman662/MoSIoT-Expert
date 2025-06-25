import { DeviceTemplate } from './deviceTemplate.model';
/* eslint-disable @typescript-eslint/naming-convention */
export class Device {
    Id: number;
    Description: string;
    Name: string;
    DeviceSwitch?: boolean;
    Tag?: string;
    IsSimulated?: boolean;
    SerialNumber?: string;
    FirmVersion?: string;
    Trademark?: string;
    DeviceTemplate?: DeviceTemplate;

}
