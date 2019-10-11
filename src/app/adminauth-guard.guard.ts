import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignupserviceService } from './signupservice.service';
// import { HeaderInterceptor } from './token-intercepter.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardGuard implements CanActivate {

  constructor(private loginservice: SignupserviceService,
              private router: Router
    ) {}

  canActivate() {
      if ( this.loginservice.getAdminSession() ) {
        return true;
      } else {
        this.router.navigate(['/admin']);
        return false;
      }
    }
}
