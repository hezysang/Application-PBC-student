import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../../shared/login.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, public serviceLogin: LoginService, private router: Router, private SpinnerService: NgxSpinnerService) {

  }

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
  }
  // tslint:disable-next-line:typedef
  get f() {  return this.serviceLogin.formModel?.controls; }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.SpinnerService.show();
    this.serviceLogin.login().subscribe(
      (res: any) => {
        if (res.responseCode) {
          // save email key
          localStorage.setItem('email', this.serviceLogin.formModel.value.EmailAddress);
          // reset after success
          this.serviceLogin.formModel.reset();
          // this.responseCode = true;
          this.toastr.success(res.responseDescription);
          this.router.navigate(['mainDashboard']);
          this.SpinnerService.hide();
        } else {
          this.toastr.error( res.responseDescription, 'Login Failed!!!');
          this.SpinnerService.hide();
        }
        // alert(res.responseDescription);
      },
      err => {
        // console.log(err);
        this.toastr.error(err.responseDescription, 'Error!');
        this.SpinnerService.hide();
      }
    );
  }
}
