import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Stepper from 'bs-stepper';
import {FamilyModel} from '../Model/family.model';
import {StudentModel} from '../Model/student.model';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  stepper: Stepper;
  familyList: FamilyModel[] = [];
  student: StudentModel[];
  readonly BaseURL = 'http://173.249.23.236/pbc-studentapi/api/application';
  formModel = this.fb.group({
    ApplicationNo: [''],
    Names: ['', Validators.required],
    Type: ['', Validators.required],
    Occupation: ['', Validators.required],
    // tslint:disable-next-line:max-line-length
    MobileNo: ['', [ Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'), Validators.maxLength(13), Validators.minLength(10)]],
    CompanyName: ['', Validators.required],
    CompanyAddress: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    CompanyTelNo: [''],
    ResidentialAddress: ['', Validators.required],
    ApartmentNo: ['', Validators.required],
    HouseNo: ['', Validators.required],
    Address: ['', Validators.required],
  });
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(public fb: FormBuilder, private http: HttpClient) { }
  familyInfo() {
    const body = {
      ApplicationNo: this.formModel.value.ApplicationNo,
      Names: this.formModel.value.Names,
      Type: this.formModel.value.Type,
      Occupation: this.formModel.value.Occupation,
      MobileNo: this.formModel.value.MobileNo,
      CompanyName: this.formModel.value.CompanyName,
      CompanyAddress: this.formModel.value.CompanyAddress,
      Email: this.formModel.value.Email,
      CompanyTelNo: this.formModel.value.CompanyTelNo,
      ResidentialAddress: this.formModel.value.ResidentialAddress,
      ApartmentNo: this.formModel.value.ApartmentNo,
      HouseNo: this.formModel.value.HouseNo,
      Address: this.formModel.value.Address,
    };
    return this.http.post(this.BaseURL + '/postFamilyDetails', body);
  }

  getApplicationList(Email: any) {
    // console.log(Email);
    this.http.get<StudentModel[]>( this.BaseURL + '/getApplicationList?emailAddress=' + Email)
      .subscribe(
        data => {
          this.student = data;
          // console.log(this.student);
        },
        error => {
          console.log('error');
        });
  }


  getFamilyMembers(ApplicationNo: any) {
    // tslint:disable-next-line:max-line-length
    this.http.get<FamilyModel[]>('http://173.249.23.236/pbc-studentapi/api/Application/getFamilyDetails?applicationNo=' + ApplicationNo).subscribe(
      data => {
        this.familyList = data;
        // console.log(this.familyList)
      }
    )
  }
}
