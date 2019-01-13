import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { SignupserviceService } from '../signupservice.service';

@Component({

  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:max-line-length
  emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errMesg = false;
  regRes = {};

  constructor(private renderer: Renderer2, private signupservice: SignupserviceService) {
    this.renderer.addClass(document.body, 'login');
  }

  registerForm(x: any) {
      this.signupservice.postData(x.value).subscribe(response => {
      this.regRes = response;
      x.reset();
      console.log(response);
    }, error => {
      this.errMesg = true;
      console.log('Error ' + error);
    });
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login');
  }

}
