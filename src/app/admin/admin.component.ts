import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../signupservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title = 'Admin';

  constructor(private signupservice: SignupserviceService) { }

  adminLogin(adminData) {
    this.signupservice.adminLogin(adminData.controls.adminUser.value, adminData.controls.adminPass.value);
    console.log(adminData.controls.adminUser.value + ' ' + adminData.controls.adminPass.value);
  }

  ngOnInit() {
  }

}
