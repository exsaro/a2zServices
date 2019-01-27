import { Component, OnInit } from '@angular/core';
import { SignupserviceService } from './signupservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';


  constructor() { }

  ngOnInit() {

  }

}
