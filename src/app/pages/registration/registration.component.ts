import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../../shared/registration.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private toastr: ToastrService, public serviceRegister: RegistrationService, private router: Router) { }

  ngOnInit(): void {

  }
  // tslint:disable-next-line:typedef
  get f() {  return this.serviceRegister.formModel?.controls; }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.serviceRegister.login().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.serviceRegister.formModel.reset();
          // this.responseCode = true;
          this.toastr.success(res.responseDescription, 'Registration done successfully!!');
          this.router.navigate(['login']);
        } else {
          this.toastr.error( res.responseDescription, 'Email Exist');
        }
        // alert(res.responseDescription);
      },
      err => {
        // console.log(err);
        this.toastr.error(err.responseDescription, 'Error!');
      }
    );
  }
}
