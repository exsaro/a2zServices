import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SignupserviceService } from './signupservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private loginservice: SignupserviceService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.loginservice.tockn !== '' || this.loginservice.tockn !== undefined || this.loginservice.tockn !== null) {
        return true;
      } else {
        return false;
      }
  }



}
