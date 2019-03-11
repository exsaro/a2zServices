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
  delSucMsg = '';

  constructor(private signupservice: SignupserviceService) { }

  getlistofService() {
    this.signupservice.listServiceData().subscribe(response => {
      this.servicelist = response['Result'];
    }, err => {
      if (err.statusText === 'Unknown Error') {
        this.errMsg = 'Something went wrong please try after sometime.';
      } else {
        this.errMsg = err.message;
      }
      console.log(err);
    });
  }

  delProd(name: string) {
    this.signupservice.deleteData(name).subscribe(response => {
      if (response['Code'] === '200') {
        this.delSucMsg = 'This product has been deleted Successfully';
      }
      this.getlistofService();
      console.log(response);
    });

  }

  changeStatus(name, status) {
    if (status === '0') {
      status = '1';
    } else if (status === '1') {
      status = '0';
    }
    this.signupservice.updateData(name, status).subscribe(response => {
      console.log(response);
      this.getlistofService();
    });
    console.log(name, status);
  }

  ngOnInit() {
    this.getlistofService();
  }

}
