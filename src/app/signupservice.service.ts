import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://ebz.in:88/a2z/src/public/api/v1';
  tockn = '';

  postData(pData: any) {
    return this.http.post(this.BASE_URL + '/create', pData);
  }

  login(lData: any) {
    return this.http.post(this.BASE_URL + '/login', lData);
  }


}
