import { Patient } from './patient.model';
import { Practitioner } from './practitioner.model';
import { RelatedPerson } from './relatedPerson.model';
/* eslint-disable @typescript-eslint/naming-convention */


export class UserData {
  id?:            number;
  birthDate?:     null;
  surnames?:      string;
  address?:       null;
  phone?:         null;
  photo?:         null;
  isActive?:      boolean;
  type?:          number;
  isDiseased?:    boolean;
  name?:          string;
  description?:   string;
  relatedPerson?: RelatedPerson;
  patient?:       Patient;
  practitioner?:  Practitioner;
}
