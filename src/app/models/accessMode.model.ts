/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { AdaptationDetailRequired } from './adaptationDetailRequired.model';
import { AdaptationRequest } from './adaptationRequest.model';
import { AdaptationTypeRequired } from './adaptationTypeRequired.model';

export class AccessMode {
    Id: number;
    Name?: string;
    Description?: string;
    TypeAccessMode?: number;
    AdaptationType?: AdaptationTypeRequired [];
    AdaptationRequest?: AdaptationRequest[];
    AdaptationDetail?: AdaptationDetailRequired[];
}
