import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from '../../signupservice.service';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';



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
  publish = ['Active', 'Inactive'];
  addProductForm: FormGroup;
  productData = new FormData();

  constructor(private signupservice: SignupserviceService, private router: Router) { }

  listProducts() {
    if (this.signupservice.getAdminSession()) {
      this.router.navigate(['/admin/listproduct']);
    } else {
      this.router.navigate(['/admin']);
    }
  }

  adminLogout(){
    this.signupservice.adminLogout();
    this.router.navigate(['/admin']);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
         this.productData.set('file', file, file.name);
      // this.addBuilderForm.get('builders_logo').setValue(file);
    }
  }

  addService(sData: any) {

    this.productData.set('product_name', sData.value['product_name']);
    this.productData.set('product_status', sData.value['product_status']);

    console.log(this.productData);

    this.signupservice.addData(this.productData).subscribe(response => {

      this.serRes = response;
      sData.reset();
      if(response['Code'] === '201') {
        this.warnMsg = response['Result'];
      } else if(response['Code'] === '200') {
        this.succMsg = response['Result'];
      }
      setTimeout(function(){ this.succMsg  = ''; }.bind(this), 4000);
      console.log(response);
    }, error => {
      this.errMesg = true;
      console.log('Error ' + error);
    })
  }

  ngOnInit() {
  }

}
