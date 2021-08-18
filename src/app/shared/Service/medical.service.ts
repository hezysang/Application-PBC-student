import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Medical} from '../Model/medical.model';
import {FamilyModel} from '../Model/family.model';
import Stepper from 'bs-stepper';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {
  stepper: Stepper;
  medicalList: Medical[];
  readonly BaseURL = 'http://173.249.23.236/pbc-studentapi/api/application';
  formModel = this.fb.group({
    ApplicationNo: [''],
    Description: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  medicalHistory() {
    const body = {
      ApplicationNo: this.formModel.value.ApplicationNo,
      Description: this.formModel.value.Description,
    };
    return this.http.post(this.BaseURL + '/postMedicalDetails', body);
  }
  getMedicalHistory(ApplicationNo: any) {
    // tslint:disable-next-line:max-line-length
    this.http.get<[Medical]>('http://173.249.23.236/pbc-studentapi/api/Application/getMedicalDetails?applicationNo=' + ApplicationNo).subscribe(
      data => {
        this.medicalList = data;
        // console.log(this.medicalList)
      }
    )
  }
}
