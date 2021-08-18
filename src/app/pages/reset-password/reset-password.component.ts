import {Component, OnInit, Renderer2} from '@angular/core';
import {ServiceResetService} from '../../shared/service-reset.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  disabled = true;

  constructor(public resetForgotPassword: ServiceResetService, private toastr: ToastrService, private renderer: Renderer2 ) { }
  ngOnInit(): void {
    const Script = this.renderer.createElement('Script');
    Script.defer = true;
    Script.async = true;
    Script.src = 'https://www.google.com/recaptcha/api.js';
    this.renderer.appendChild(document.body, Script);
  }
  // tslint:disable-next-line:typedef
  resolved(token: any) {
    this.disabled = false;
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.resetForgotPassword.updatePassword().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.resetForgotPassword.formModel.reset();
          // reset recapture after success
          grecaptcha.reset();
          // this.responseCode = true;
          this.toastr.success(res.responseDescription, 'Update Successful');
        } else {
          this.toastr.error( res.responseDescription, 'Confirm the password');
        }
        // alert(res.responseDescription);
      },
      err => {
        console.log(err);
        this.toastr.error(err, 'Error!');
      }
    );
  }
  get f() {  return this.resetForgotPassword.formModel?.controls; }

}
