import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';



@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  errMesg = false;
  succMsg = '';
  warnMsg = '';
  serRes = {};

  constructor(private signupservice: SignupserviceService) { }

  addService(sData: any) {
    this.signupservice.addData(sData.value).subscribe(response => {
      this.serRes = response;
      sData.reset();
      if(response['Code'] === '201') {
        this.warnMsg = response['Result'];
      } else if(response['Code'] === '200') {
        this.succMsg = response['Result'];
      }
      console.log(response);
    }, error => {
      this.errMesg = true;
      console.log('Error ' + error);
    })
  }

  ngOnInit() {
  }

}
