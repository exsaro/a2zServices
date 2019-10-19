import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServicelistComponent } from './home/servicelist/servicelist.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { SignupComponent } from './signup/signup.component';
import {HttpService} from "./services/http.service";
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { BooknowComponent } from './booknow/booknow.component';

// import { HeaderInterceptor } from './token-intercepter.service';
// import { AuthGuardGuard } from './auth-guard.guard';
// import { SignupserviceService } from './signupservice.service';
// import { AdminAuthGuardGuard } from './adminauth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    ServicelistComponent,
    EnquiryComponent,
    SignupComponent,
    AdminComponent,
    AdminloginComponent,
    BooknowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
