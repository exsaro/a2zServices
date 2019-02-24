import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {

  servicelist: any = [];

  constructor(private signupservice: SignupserviceService) { }

  listService() {
    this.signupservice.listServiceData().subscribe(response => {
      for (let i = 0; i < response['Result'].length; i++) {
        if (response['Result'][i].product_status === '0') {
          this.servicelist.push(response['Result'][i]);
        }
      }
      console.log(response);
    });
  }


  ngOnInit() {
    this.listService();
  }

}
