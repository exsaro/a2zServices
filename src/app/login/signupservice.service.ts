import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  constructor(private http: HttpClient) { }

  // regData(gData) {
  //   return this.http.get('http://localhost:5555/user');
  // }
  postData(pData) {
    return this.http.post('http://localhost:5555/user', pData);
  }



}
