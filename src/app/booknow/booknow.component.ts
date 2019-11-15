import { Component, OnInit } from '@angular/core';
// import { EnquiryComponent } from '../enquiry/enquiry.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.scss']
})
export class BooknowComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  otp(){
    console.log("clicked")
  }

  // backEnquiry(){
  //   this.dialog.open(EnquiryComponent);
  // }

}
