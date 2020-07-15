import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { SignupserviceService } from '../signupservice.service';
import {MatDialog} from '@angular/material/dialog';
import { BooknowComponent } from '../booknow/booknow.component';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit, OnDestroy {
  register  =true;
  // tslint:disable-next-line:max-line-length
  emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private renderer: Renderer2, private signupservice: SignupserviceService, public dialog: MatDialog) {
    this.renderer.addClass(document.body, 'login');
  }
  servicelist: any = [];
  errMsg = '';
  regRes = {};
  errMesg = false;
  userMob = '';
  succMsg = false;

  listService() {
    this.signupservice.listServiceData().subscribe(response => {
      for (let i = 0; i < response['Result'].length; i++) {
        if (response['Result'][i].product_status === 'Active') {
          this.servicelist.push(response['Result'][i]);
        }
      }
      console.log(response);
    }, err => {
      if (err.statusText === 'Unknown Error') {
        this.errMsg = 'Something went wrong please try after sometime.';
      } else {
        this.errMsg = err.message;
      }
      console.log(err);
    });
  }

  ngOnInit() {
    this.listService();
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login');
  }



  enquiryForm(x) {
    console.log('addess', x.value)
    this.userMob = x.value.mobile;
    this.signupservice.postData(JSON.stringify(x.value)).subscribe(response => {
      this.regRes = response;

      if (response.Code === '200') {
        this.register  = false;
      }

    }, error => {
      this.register  =true;
      this.errMesg = true;
      console.log('Error ' + error);
    });
    //alert(this.register);
  }

  otpverify(otp){
    const otpDat = {
      'mobile': this.userMob,
      'otp': otp.value
    };
    this.signupservice.otpVerify(JSON.stringify(otpDat)).subscribe(res => {

      if(res.Code == '200'){
        this.succMsg = true;
      }else{
        this.errMesg = true;
      }
    });
  }

}
