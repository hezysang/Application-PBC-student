import {Component, OnInit, Renderer2} from '@angular/core';
import {CodeCaptureService} from '../../shared/code-capture.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-code-capture',
  templateUrl: './code-capture.component.html',
  styleUrls: ['./code-capture.component.css']
})
export class CodeCaptureComponent implements OnInit {

  constructor(private renderer: Renderer2, public serviceCodeCapture: CodeCaptureService, private toastr: ToastrService) { }
  disabled = true;
  private formSubmitAttempt: boolean;
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
  get f() {  return this.serviceCodeCapture.formModel?.controls; }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.serviceCodeCapture.resetPassword().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.serviceCodeCapture.formModel.reset();
          grecaptcha.reset();
          // this.responseCode = true;
          this.toastr.success(res.responseDescription, 'Successfully send.. Check Your Mail');
        } else {
          this.toastr.error( 'Failed');
        }
        // alert(res.responseDescription);
      },
      err => {
        this.toastr.error(err, 'Error!');
        // console.log(err);
      }
    );
  }
}
