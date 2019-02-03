import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:max-line-length
  emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'login');
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login');
  }

  enquiryForm(x) {
    console.log(x);
  }

}
