import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../signupservice.service';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  title = 'Admin';
  route: any;

  constructor(private signupservice: SignupserviceService, private router: Router,private fb: FormBuilder) { }

  adminLogin(adminData) {
    const username = adminData.controls.adminUser.value;
    const password = adminData.controls.adminPass.value;
    let loginData = JSON.stringify({
      username: username,
      password: password
    });
    if ( username === 'admin' && password === 'admin' ) {
      this.signupservice.adminLogin(loginData).subscribe((res) => {
          if (!!res['token']) {
            localStorage.setItem('Auth', res['token']);
            this.route.navigate(['/admin', 'listproduct']);
          }
        },
        (err) => console.log(err) 
      );
    } else {
     // this.validateFlag = true;
     // this.validateMsg = 'Username and password incorrect';
    }
   // this.signupservice.adminLogin(adminData.controls.adminUser.value, adminData.controls.adminPass.value);
    //console.log(adminData.controls.adminUser.value + ' ' + adminData.controls.adminPass.value);
   // this.router.navigate(['/listproduct']);
  }

  ngOnInit() {
    localStorage.removeItem('Auth');

    this.adminForm = this.fb.group({
      adminUser: ['', [Validators.required]],
      adminPass: ['', [Validators.required]]
    });
  }

}
