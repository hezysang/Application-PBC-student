import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {


  formModel = this.fb.group({
    }
  );

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  logOut() {
    sessionStorage.removeItem('Email')
    sessionStorage.getItem(null);
  }
}
