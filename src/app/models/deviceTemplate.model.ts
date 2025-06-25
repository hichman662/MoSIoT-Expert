import { PropertyTemplate } from './propertyTemplate.model';
import { CommandTemplate } from './commandTemplate.model';
/* eslint-disable @typescript-eslint/naming-convention */
export class DeviceTemplate {
  id?: number;
        name?: string;
        isEdge?: boolean;
        type?: number;
        Commands?: CommandTemplate[];
        Properties?: PropertyTemplate[];
}
