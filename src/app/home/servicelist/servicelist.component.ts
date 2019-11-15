import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';
import { EnquiryComponent } from '../../enquiry/enquiry.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {

  servicelist: any = [];
  errMsg = '';

  constructor(private signupservice: SignupserviceService, public dialog: MatDialog) { }

  listService() {
    this.signupservice.listServiceData().subscribe(response => {
      for (let i = 0; i < response['Result'].length; i++) {
        if (response['Result'][i].product_status === 'Active') {
          this.servicelist.push(response['Result'][i]);
        }
      }
      console.log(response);
    }, err => {
      if (err.statusText === 'Unknown Error') {
        this.errMsg = 'Something went wrong please try after sometime.';
      } else {
        this.errMsg = err.message;
      }
      console.log(err);
    });
  }

  onEnquiry(productName){
    console.log(productName);
  }
  enquiryForm(){
    this.dialog.open(EnquiryComponent);
  }


  ngOnInit() {
    this.listService();
  }

}
