import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import Stepper from 'bs-stepper';
import {Academic} from '../Model/academic.model';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {
  stepper: Stepper;
  readonly BaseURL = 'http://173.249.23.236/pbc-studentapi/api/application';
  academicLists: Academic[] = [];
  formModel = this.fb.group({
    ApplicationNo: [''],
    SchoolName: ['', Validators.required],
    DateFrom: ['', Validators.required],
    DateTo: [''],
  });
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  academicHistory() {
    const body = {
      ApplicationNo: this.formModel.value.ApplicationNo,
      SchoolName: this.formModel.value.SchoolName,
      DateFrom: this.formModel.value.DateFrom,
      DateTo: this.formModel.value.DateTo,
    };
    return  this.http.post(this.BaseURL + '/postAcademicDetails', body);

  }
  getAcademicList(ApplicationNo: any) {
    // tslint:disable-next-line:max-line-length
    this.http.get<Academic[]>('http://173.249.23.236/pbc-studentapi/api/Application/getAcademicDetails?applicationNo=' + ApplicationNo).subscribe(
      data => {
        this.academicLists = data;
        // console.log(this.academicLists)
      }
    )
  }
}
