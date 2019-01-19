import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loginmodel } from './formdata-model';


@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://ebz.in:88/a2z/src/public/api/v1';
  tockn = '';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });


  postData(pData: any) {
    return this.http.post(this.BASE_URL + '/create', pData);
  }

  login(lData: Loginmodel) {
    return this.http.post(this.BASE_URL + '/login', lData, {responseType: 'text'});
  }


}
