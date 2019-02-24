import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SignupserviceService } from './signupservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private loginservice: SignupserviceService,
              private router:Router
    ) {}

  canActivate() {

      if (!this.loginservice.getSession()) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }
}
