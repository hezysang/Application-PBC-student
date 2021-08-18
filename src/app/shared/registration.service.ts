import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../pages/registration/confirmed.validator';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  readonly baseUrl = 'http://173.249.23.236/pcb-studentapi/api/application' ;
  formModel = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      // tslint:disable-next-line:max-line-length
      MobileNo: ['', [ Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'), Validators.maxLength(13), Validators.minLength(10)]],
      EmailAddress: ['', [Validators.required, Validators.email ]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPassword: [''],
    },
    {
      validator: ConfirmedValidator('Password', 'ConfirmPassword')      }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  login() {
    const body = {
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      MobileNo: this.formModel.value.MobileNo,
      EmailAddress: this.formModel.value.EmailAddress,
      Password: this.formModel.value.Password,
    };
    return this.http.post(this.baseUrl + '/postnewapplicantregistration', body);
  }
}
