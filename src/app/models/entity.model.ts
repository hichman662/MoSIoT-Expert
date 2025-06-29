/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */

import { Attribute } from "./attribute.model";
import { Operation } from "./operation.model";
export class Entity {

    id?: number;
    originAssociations?: any[];
    targetAssociations?: any[];
    attributes?: Attribute[];
    operations?: Operation[];
}
