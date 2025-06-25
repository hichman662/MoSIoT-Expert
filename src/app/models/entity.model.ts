/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */

import { Attribute } from "./attribute.model";
import { Operation } from "./operation.model";
export class Entity {

    Id: number;
    OriginAssociations: any[];
    TargetAssociations: any[];
    Attributes: Attribute[];
    Operations: Operation[];
}
