import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loginmodel } from './formdata-model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://spotbooking.in/api/public';

  tockn = '';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json'
  // });




  postData(pData: any) {
    const headers = new HttpHeaders().set('content-Type', 'application/json');
    return this.http.post(this.BASE_URL + '/create', pData);
  }

  addData(addSdata: any) {
    return this.http.post(this.BASE_URL + '/admin/addproduct', addSdata);
  }

  deleteData(prodName: string) {
    return this.http.get(this.BASE_URL + '/admin/delproduct/' + prodName);
  }

  updateData(prodName, prodStatus) {
    const obj = { product_name: prodName, product_status: prodStatus};
    return this.http.post(this.BASE_URL + '/admin/editproduct/', JSON.stringify(obj));
  }

  listServiceData() {
    return this.http.get(this.BASE_URL + '/admin/listproduct');
  }

  login(lData) {
    return this.http.post(this.BASE_URL + '/login', lData);
  }

  adminLogin(adminUser, adminPass) {
    if (adminUser === 'admin' && adminPass === 'admin') {
      localStorage.setItem('authorizeAdmin', adminUser + adminPass);
    }
  }

  adminLogout() {
    localStorage.removeItem('authorizeAdmin');
  }

  getAdminSession() {
    return localStorage.getItem('authorizeAdmin');
  }

  logOut() {
    localStorage.removeItem('authorizeId');
  }
  getSession() {
    return localStorage.getItem('authorizeId');
  }







}
