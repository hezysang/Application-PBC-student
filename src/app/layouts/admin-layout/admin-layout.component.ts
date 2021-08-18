import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
    constructor(private router: Router, private spinner: NgxSpinnerService) {
    }
  ngOnInit() {
    if (localStorage.getItem('email') == null)  {
      this.router.navigate(['/login']);
    }
  }
}
