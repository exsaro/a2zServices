import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss']
})
export class ListproductComponent implements OnInit {

  servicelist: any = [];
  errMsg = '';
  delSucMsg = '';

  constructor(private signupservice: SignupserviceService, private router: Router) { }

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

  adminLogout(){
    this.signupservice.adminLogout();
    this.router.navigate(['/admin']);
  }

  addProducts(){
    if (this.signupservice.getAdminSession()) {
      this.router.navigate(['/addproduct']);
    } else {
      this.router.navigate(['/admin']);
    }
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

  changeStatus(product_name, product_status) {
    if (product_status === 'Active') {
      product_status = 'Inactive';
    } else if (product_status === 'Inactive') {
      product_status = 'Active';
    }
    this.signupservice.updateData(product_name,  product_status).subscribe(response => {
      console.log(response);
      this.getlistofService();
    });
    console.log(product_name, product_status);
  }

  ngOnInit() {
    this.getlistofService();
  }

}
