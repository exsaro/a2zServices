import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SignupserviceService } from '../signupservice.service';
import { Loginmodel } from '../formdata-model';

// import { Register } from './register.model';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:max-line-length
  emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  errMesg = false;
  errMessage = '';


  constructor(private renderer: Renderer2, private loginservice: SignupserviceService, private route: Router) {
    this.renderer.addClass(document.body, 'login');
  }

  loggedIn(loginData: Loginmodel) {
    const loginJsn = {'email': loginData.email, 'pwd': loginData.pwd};
    this.loginservice.login(loginJsn).subscribe(response => {
      let resp = JSON.parse(response);
      //console.log(resp['token']);
      this.loginservice.tockn = resp['token'];
      this.setSession(this.loginservice.tockn);
      if (this.loginservice.tockn !== '') {
        this.route.navigate(['/enquiry']);
      }
    }
    , error => {
      this.errMesg = true;
      this.errMessage = error['message'];
      console.log('Error ' + error);
    }
    );
  }

  logOut() {
    sessionStorage.removeItem('authorizeId');
  }

  setSession(tcn) {
    sessionStorage.setItem('authorizeId', tcn);
  }
  getSession() {
    sessionStorage.getItem('authorizeId');
  }



  ngOnInit() {

  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login');
  }
}


