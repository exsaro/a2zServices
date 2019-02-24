import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loginmodel } from './formdata-model';
import { map } from 'rxjs/operators';



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

  addData(addSdata: any) {
    return this.http.post(this.BASE_URL + '/admin/addproduct', addSdata);
  }

  listServiceData(){
    return this.http.get(this.BASE_URL + '/admin/listproduct');
  }

  login(lData: Loginmodel) {
    return this.http.post(this.BASE_URL + '/login', lData, {responseType: 'text'})
    .pipe(map(response => {
      const resp = JSON.parse(response);
      if (resp.token) {
        localStorage.setItem('authorizeId', resp.token);
      }
      return resp;
    }));
  }

  logOut() {
    localStorage.removeItem('authorizeId');
  }
  getSession() {
    localStorage.getItem('authorizeId');
  }







}
