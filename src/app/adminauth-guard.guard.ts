import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignupserviceService } from './signupservice.service';
import { HeaderInterceptor } from './token-intercepter.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardGuard implements CanActivate {

  constructor(private loginservice: SignupserviceService,
              private router: Router,
              private intercept: HeaderInterceptor
    ) {}

  canActivate() {
      if ( this.loginservice.getAdminSession() ) {
        //debugger;
        this.router.navigate(['/listproduct']);
        return true;
      } else {
        this.router.navigate(['/admin']);
        return false;
      }
    }
}
