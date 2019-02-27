import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss']
})
export class ListproductComponent implements OnInit {

  servicelist: any = [];

  constructor(private signupservice: SignupserviceService) { }

  getlistofService(){
    this.signupservice.listServiceData().subscribe(response =>{
      this.servicelist = response['Result'];
    });
  }

  ngOnInit() {
    this.getlistofService();
  }

}
