import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {

  servicelist: any = [];
  errMsg = '';

  constructor(private signupservice: SignupserviceService) { }

  listService() {
    this.signupservice.listServiceData().subscribe(response => {
      for (let i = 0; i < response['Result'].length; i++) {
        if (response['Result'][i].product_status === '0') {
          this.servicelist.push(response['Result'][i]);
        }
      }
      console.log(response);
    }, err => {
      if (err.statusText === 'Unknown Error') {
        this.errMsg = 'Something went wrong please contact Admin.';
      } else {
        this.errMsg = err.message;
      }
      console.log(err);
    });
  }


  ngOnInit() {
    this.listService();
  }

}
