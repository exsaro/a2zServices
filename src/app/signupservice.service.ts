import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { Loginmodel } from './formdata-model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  constructor(private http: HttpClient,private httpservice:HttpService) { }

  BASE_URL = 'http://spotbooking.in/api/public';

  tockn = '';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json'
  // });




  postData(pData: any) {
    const headers = new HttpHeaders().set('content-Type', 'application/json');
    return this.httpservice.post(this.BASE_URL + '/create', pData);
  }

  addData(addSdata: any) {
    return this.httpservice.post(this.BASE_URL + '/admin/addproduct', addSdata);
  }

  deleteData(prodName: string) {
    return this.httpservice.get(this.BASE_URL + '/admin/delproduct/' + prodName);
  }

  updateData(prodName, prodStatus) {
    const obj = { product_name: prodName, product_status: prodStatus};
    return this.httpservice.post(this.BASE_URL + '/admin/editproduct/', JSON.stringify(obj));
  }

  listServiceData() {
    return this.httpservice.get(this.BASE_URL + '/admin/listproduct');
  }
  listServiceAdminData() {
    return this.httpservice.get(this.BASE_URL + '/admin/listproduct');
  }

  login(lData) {
    return this.httpservice.post(this.BASE_URL + '/login', lData);
  }

  adminLogin(loginData) {

    return this.httpservice.post(this.BASE_URL + '/login', loginData);

  }

  adminLogout() {
    localStorage.removeItem('Auth');
  }

  getAdminSession() {
    return localStorage.getItem('Auth');
  }

  logOut() {
    localStorage.removeItem('AuthID');
  }
  getSession() {
    return localStorage.getItem('AuthID');
  }







}
