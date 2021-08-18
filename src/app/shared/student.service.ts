import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SubCounty} from './sub-county.model';
import {County} from './county.model';
import {AcademicYear} from './academic-year.model';
import {StudentModel} from './Student.model';
import {RegisterModel} from './register.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly BaseURL = 'http://173.249.23.236/pbc-studentapi/api/application';
   listCounty: County[] = [];
   listSubCounty: SubCounty[] = [];
   results: AcademicYear[];
   student: StudentModel[];
   register: RegisterModel[];
   profile: RegisterModel;
  formModel = this.fb.group({
    ApplicationNo: [''],
    FirstName: ['', Validators.required],
    MiddleName: [''],
    LastName: ['', Validators.required],
    DateOfBirth: ['', Validators.required],
    Gender: ['', Validators.required],
    Code: ['', Validators.required],
    Sub_County_Code: ['', Validators.required],
    Class: ['', Validators.required],
    Term: ['', Validators.required],
    NemisNo: ['', Validators.required],
    AcademicYear: ['', Validators.required],
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
  }
  constructor(private  fb: FormBuilder, private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  application() {
    const body = {
      ApplicationNo: this.formModel.value.ApplicationNo,
      FirstName: this.formModel.value.FirstName,
      MiddleName: this.formModel.value.MiddleName,
      LastName: this.formModel.value.LastName,
      DateOfBirth: this.formModel.value.DateOfBirth,
      Gender: this.formModel.value.Gender,
      Code: this.formModel.value.Code,
      Sub_County_Code: this.formModel.value.Sub_County_Code,
      Class: this.formModel.value.Class,
      Term: this.formModel.value.Term,
      NemisNo: this.formModel.value.NemisNo,
      AcademicYear: this.formModel.value.AcademicYear,
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
    return this.http.post(this.BaseURL + '/postStudentApplication', body);
    }
  // tslint:disable-next-line:typedef
    CountyList() {
    this.http.get(this.BaseURL + '/getCountyCodes').toPromise().then(result => this.listCounty = result as County[]);
  }
  // tslint:disable-next-line:typedef
  SubCountyByCounty(countyId: string) {
    return this.http.get(this.BaseURL + '/getSubCountyCodes' + '?countyCode=' + countyId)
      .toPromise().then(r => this.listSubCounty = r as SubCounty[]);
  }
  // tslint:disable-next-line:typedef
  getAcademicYear() {
    this.http.get<AcademicYear[]>(this.BaseURL + '/getAcademicYears').subscribe(
      data => {
        this.results = data;
        // console.log(this.results);
      },
      error => {
        console.log('error');
      });
  }
  // @ts-ignore
  getStudentDetails(Email: any) {
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
  getStudentDetailsByApplicationNo(ApplicationNo: any) {
  this.http.get<StudentModel[]>(this.BaseURL + '/getApplicationByApplicationNo?applicationNo' + ApplicationNo )
  }
  getProfileDetails(Email: any) {
    this.http.get<RegisterModel[]>(this.BaseURL + '/getApplicantProfile?emailAddress=' + Email) .subscribe(
      data => {
       this.profile = data[0]
        // console.log(this.profile)
      },
      error => {
        console.log('error');
      });
  }
  }
