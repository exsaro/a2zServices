import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  title = 'Admin';
  constructor(private signupservice: SignupserviceService, private router: Router) { }

  adminLogin(adminData) {
    const username = adminData.controls.adminUser.value;
    const password = adminData.controls.adminPass.value;
    let loginData = JSON.stringify({
      email: username,
      pwd: password
    });
    if ( username === 'admin' && password === 'admin' ) {
      this.signupservice.adminLogin(loginData).subscribe((res) => {
          if (!!res['token']) {
            localStorage.setItem('Auth', res['token']);
            this.router.navigate(['/admin', 'listproduct']);
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
  }

}
