import { Injectable } from '@angular/core';
import {EmailValidator, FormBuilder, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly baseUrl = 'http://173.249.23.236/pcb-studentapi/api/application' ;

  formModel = this.fb.group({
      EmailAddress: ['', Validators.required],
      Password: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) {}


// tslint:disable-next-line:typedef
  login() {
    const body = {
      EmailAddress: this.formModel.value.EmailAddress,
      Password: this.formModel.value.Password,
    };
    return this.http.post(this.baseUrl + '/login', body);
  }

}
