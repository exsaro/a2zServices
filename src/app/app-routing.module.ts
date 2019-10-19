import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { ListproductComponent } from './admin/listproduct/listproduct.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { AdminAuthGuardGuard } from './adminauth-guard.guard';
import { SignupComponent } from './signup/signup.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'enquiry',
    component: EnquiryComponent,
    canActivate: [AuthGuardGuard]
}];
const routesadmin: Routes = [{  path: 'admin', redirectTo: 'admin/login',  pathMatch: 'full'},
  { path: 'admin/login', component: AdminloginComponent},
  { path: 'admin/addproduct', component: AddproductComponent},
  { path: 'admin/listproduct', component: ListproductComponent},
  { path: '**', redirectTo: 'admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routesadmin)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  LoginComponent,
  SignupComponent,
  AdminComponent,
  AddproductComponent,
  ListproductComponent
];
