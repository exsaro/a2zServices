import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignupserviceService } from './signupservice.service';
import { HeaderInterceptor } from './token-intercepter.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private loginservice: SignupserviceService,
              private router: Router,
              private intercept: HeaderInterceptor
    ) {}

  canActivate() {
      if ( this.loginservice.getSession() ) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}
