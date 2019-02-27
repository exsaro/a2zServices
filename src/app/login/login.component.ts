import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SignupserviceService } from '../signupservice.service';
import { Loginmodel } from '../formdata-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:max-line-length
  emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  errMesg = false;
  invalidLogin = false;
  errMessage = '';


  constructor(private renderer: Renderer2, private loginservice: SignupserviceService, private route: Router) {
    this.renderer.addClass(document.body, 'login');
  }

  loggedIn(loginData: Loginmodel) {
    this.loginservice.login(loginData).subscribe(resp => {
      console.log(resp['token']);
      if (resp['token']) {
        this.route.navigate(['/home']);
        return true;
      } else {
        this.invalidLogin = true;
      }
      return false;

    }, error => {
      this.errMesg = true;
      this.errMessage = error['message'];
      console.log('Error ' + error);
    });
  }


  signupLink() {
    this.route.navigate(['/signup']);
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login');
  }
}


