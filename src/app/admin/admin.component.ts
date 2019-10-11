import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../signupservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title = 'Admin';

  constructor(private signupservice: SignupserviceService, private router: Router) { }

  adminLogin(adminData) {
    debugger;
    this.signupservice.adminLogin(adminData.controls.adminUser.value, adminData.controls.adminPass.value);
    console.log(adminData.controls.adminUser.value + ' ' + adminData.controls.adminPass.value);
    this.router.navigate(['/listproduct']);
  }

  ngOnInit() {
  }

}
