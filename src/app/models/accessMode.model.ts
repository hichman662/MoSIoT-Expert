/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { AdaptationDetailRequired } from './adaptationDetailRequired.model';
import { AdaptationRequest } from './adaptationRequest.model';
import { AdaptationTypeRequired } from './adaptationTypeRequired.model';

export class AccessMode {
    id?: number;
    name?: string;
    description?: string;
    typeAccessMode?: number;
    adaptationType?: AdaptationTypeRequired [];
    adaptationRequest?: AdaptationRequest[];
    adaptationDetail?: AdaptationDetailRequired[];
}
