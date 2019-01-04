import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  constructor(private http: HttpClient) { }

  regUrl = 'http://ebz.in:88/a2z/src/public/api/v1/create';

  postData(pData: any) {
    return this.http.post(this.regUrl, pData);
  }

}
