import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationNo} from '../Model/application-no.model';
import {County} from '../model/county.model';
import {AcademicYear} from '../model/academic-year.model';
import {SubCounty} from '../model/sub-county.model';
import Stepper from 'bs-stepper';
import {StudentModel} from '../Model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly BaseURL = ' http://173.249.23.236/pbc-studentapi/api/application';
  listCounty: County[] = [];
  listSubCounty: SubCounty[] = [];
  results: AcademicYear[];
  aplicationNo: ApplicationNo;
  student: StudentModel[];
  currentStep: number;
  stepper: Stepper;

  formModel = this.fb.group({
    ApplicationNo: [''],
    FirstName: ['', Validators.required],
    MiddleName: [''],
    LastName: ['', Validators.required],
    Email: ['', Validators.email],
    DateOfBirth: ['', Validators.required],
    Gender: ['', Validators.required],
    Code: ['', Validators.required],
    Sub_County_Code: ['', Validators.required],
    Class: ['', Validators.required],
    Term: ['', Validators.required],
    NemisNo: ['', Validators.required],
    AcademicYear: ['', Validators.required],
  });
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private  fb: FormBuilder, private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  studentInfo() {
    const body = {
      ApplicationNo: this.formModel.value.ApplicationNo,
      FirstName: this.formModel.value.FirstName,
      MiddleName: this.formModel.value.MiddleName,
      LastName: this.formModel.value.LastName,
      Email: this.formModel.value.Email,
      DateOfBirth: this.formModel.value.DateOfBirth,
      Gender: this.formModel.value.Gender,
      Code: this.formModel.value.Code,
      Sub_County_Code: this.formModel.value.Sub_County_Code,
      Class: this.formModel.value.Class,
      Term: this.formModel.value.Term,
      NemisNo: this.formModel.value.NemisNo,
      AcademicYear: this.formModel.value.AcademicYear,
    };
    return this.http.post(this.BaseURL + '/postStudentApplication', body);
  }
  CountyList() {
    this.http.get(this.BaseURL + '/getcountycodes').toPromise().then(result => this.listCounty = result as County[]);
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

  getNewApplicationNo(Email: any) {
      this.http.get<ApplicationNo>(this.BaseURL + '/getApplicationNo?emailAddress=' + Email) .subscribe(
        data => {
          localStorage.setItem('appNo', data.responseDescription);
          // console.log(localStorage.getItem('appNo'));
        },
        error => {
          console.log('error');
        });
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

  // tslint:disable-next-line:no-shadowed-variable
  getAllStudents(ApplicationNo: any) {
    // tslint:disable-next-line:max-line-length
    this.http.get<[StudentModel]>('http://173.249.23.236/pbc-studentapi/api/Application/getApplicationByApplicationNo?applicationNo=' + ApplicationNo).subscribe(
      data => {
        this.student = data;
        // console.log(this.invoices)
      }
    )
  }
}
