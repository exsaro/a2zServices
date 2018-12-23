import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { SignupserviceService } from './signupservice.service';

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

  constructor(private renderer: Renderer2, private signupservice: SignupserviceService) {
    this.renderer.addClass(document.body, 'login');
  }

  registerForm(x) {
      this.signupservice.postData(x.value).subscribe(response => {
      console.log(response);
      x.reset();
    });
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login');
  }
}


