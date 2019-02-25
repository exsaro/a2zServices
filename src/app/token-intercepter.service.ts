import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { SignupserviceService } from './signupservice.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private inject: Injector) {}

  intercept(req, next) {
    const authSerToken = this.inject.get(SignupserviceService);
    const tokenized = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authSerToken.getSession()}`
      }
    });
    return next.handle(tokenized);
  }
}
