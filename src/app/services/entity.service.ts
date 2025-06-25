/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/ban-types */

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {of, Observable} from 'rxjs';
import { Entity } from '../models/entity.model';


@Injectable({
  providedIn: 'root'
})
export class EntityService {
  headers: HttpHeaders;
constructor(private http: HttpClient) {

}

// *********************************vital Sign attribute******************
public getEntitynById( uid: number): Observable<Entity>{
  if (!uid) { uid = null; }
  return this.http.get <Entity>(`${environment.base_url}/Entity/${uid}` );
}

public modifyEntityAttribute(uid: number, data: any): Observable<object> {
  return this.http.put(`${environment.base_url}/EntityAttributes/ModifyValue?idEntityAttributes=${uid}`, data);
}


}


