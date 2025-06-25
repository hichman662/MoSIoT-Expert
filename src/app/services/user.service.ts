/* eslint-disable @typescript-eslint/member-ordering */
import { UserDataInterface } from './../interfaces/usuario.interface';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of, Observable} from 'rxjs';
import { loginForm  } from '../interfaces/loginForm.interface';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { UserData } from '../models/userData.model';
import { Storage } from '@ionic/storage';
import { Practitioner } from '../models/practitioner.model';
import { RelatedPerson } from '../models/relatedPerson.model';
import { Patient } from '../models/patient.model';
import { RelatedPersonData } from '../models/relatedPersonData.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  patient: Patient = new Patient();
  newUserData: UserData = new UserData();
  isLoggedIn = false;
  token = '';

constructor(private http: HttpClient,
               private router: Router,
               private storage: Storage) {

}

public getAllUsers(): Observable<object>{
  return this.http.get(`${environment.base_url}/User/ReadAll`);
}

public getPatientByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = 0; }
 return this.http.get <Patient>(`${environment.base_url}/User/DamePacientePorScenario?p_idscenario=${uid}` );
}

public getPractitionerByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = 0; }
 return this.http.get <Practitioner>(`${environment.base_url}/User/DameMedicoPorScenario?p_idscenario=${uid}` );
}

public getPractitionerByEmail( email: string): Observable<Practitioner[]>{
 return this.http.get <Practitioner[]>(`${environment.base_url}/Practitioner/DamePorEmail?p_email=${email}` );
}
public getRelatedPersonByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = 0; }
 return this.http.get <RelatedPersonData>(`${environment.base_url}/User/DameRelatedPersonPorScenario?p_idscenario=${uid}` );
}

public getUserById( uid: number): Observable<object>{
  if (!uid) { uid = 0; }
 return this.http.get <UserData>(`${environment.base_url}/User/${uid}` );
}

public getUserByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = 0; }
 return this.http.get <UserData>(`${environment.base_url}/User/UsersScenario?idIoTScenario=${uid}` );
}

public createUser( data: UserData ): Observable<object> {
  return this.http.post(`${environment.base_url}/User/New_`, data)
  .pipe(
    tap((res: UserData)=>{
      this.newUserData = res;
      console.log(this.newUserData);
    })
  );
}

login( formData: any) {
  return this.http.post(`${environment.base_url}/PractitionerAnonimous/Login`, formData)
          .pipe(
            tap( (res: any) => {
             // this.isLoggedIn = true;
             this.storage.set('token', res);
              })
          );
}

get headers() {
  return {
    headers: {
      'token': this.getToken
    }};
}
get getToken(): string {
  this.storage.get('token').then((val) => {
    this.token = val;
  });
  return this.token || '';
}

 get idNewUser(): number {
  return this.newUserData.Id ?? 0;
}

get nameNewUser(): string {
  return this.newUserData.Surnames ?? '';
}

async logout(){
     await this.storage.clear();
}

/* removeUserId(){
  if(this.newUserData.Id !== null){
    this.newUserData.Id = null;
  }
}

removeUserName(){
  if(this.newUserData.Id !== null){
    this.newUserData.Surnames = null;
  }
} */

}
