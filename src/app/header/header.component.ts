import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router, location: Location) { }

  disableHeader = false;

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('authorizeId');
    if (!token) { return false; }
    const expireDate = jwtHelper.getTokenExpirationDate(token);
    const isExpired = jwtHelper.isTokenExpired(token);
    console.log(`Exp Date: ${expireDate}`);
    console.log(`Is Expired: ${isExpired}`);
    return !isExpired;
  }

  chkUrl() {
    if (location.pathname === '/admin' || location.pathname === '/addproduct' || location.pathname === '/listproduct') {
      this.disableHeader = true;
    }
  }
  ngOnInit() {
    this.chkUrl();
  }

}
