import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title = 'Admin';

  constructor() { }

  asd(x) {
    console.log(x);
  }

  ngOnInit() {
  }

}
