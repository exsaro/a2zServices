import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss']
})
export class ListproductComponent implements OnInit {

  servicelist: any = [];
  errMsg = '';

  constructor(private signupservice: SignupserviceService) { }

  getlistofService() {
    this.signupservice.listServiceData().subscribe(response => {
      this.servicelist = response['Result'];
    }, err => {
      if (err.statusText === 'Unknown Error') {
        this.errMsg = 'Something went wrong please contact Admin.';
      } else {
        this.errMsg = err.message;
      }
      console.log(err);
    });
  }

  delProd(name: string) {
    this.signupservice.deleteData(name).subscribe(response => {
      console.log(response);
    });
  }

  changeStatus(name) {
    console.log(name);
  }

  ngOnInit() {
    this.getlistofService();
  }

}
