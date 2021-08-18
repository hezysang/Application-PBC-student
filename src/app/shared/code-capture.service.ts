import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeCaptureService {
  readonly baseUrl = 'http://173.249.23.236/pcb-studentapi/api/application';


  formModel = this.fb.group({
    EmailAddress: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  resetPassword() {
    const body = {
      EmailAddress: this.formModel.value.EmailAddress,
    };
    return this.http.post(this.baseUrl + '/sendpasswordresetLink', body);
  }
}
