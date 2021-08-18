import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {StudentService} from '../../shared/Service/student.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  public Email: any;
  public  ApplicationNo: any;

  // tslint:disable-next-line:max-line-length
  constructor(public studentService: StudentService,  private router: Router, private toastr: ToastrService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.studentService.studentInfo();
    this.Email = localStorage.getItem('email');
    this.studentService.CountyList();
    this.studentService.getAcademicYear();
    this.studentService.formModel.reset();
    this.generateAppNo();
  }
  get f() {
    return this.studentService.formModel?.controls;
  }
  onSubmit() {
    if (this.studentService.formModel.valid) {
      this.studentService.studentInfo().subscribe(
        (res: any) => {
          if (res.responseCode) {
            this.studentService.formModel.reset();
            // this.responseCode = true;
            console.log(this.studentService.formModel.value);
            this.toastr.success(res.responseDescription, 'Application done successfully!!');
            this.SpinnerService.hide();
            this.moveNext(2);
          } else {
            this.toastr.error('Registration failed');
            this.SpinnerService.hide();
          }
          // alert(res.responseDescription);
        },
        err => {
          this.toastr.error(err, 'Error!');
          // console.log(err);
        }
      );
    } else {
      // validate all form fields
      this.toastr.error('All fields Required')
    }
  }
  // tslint:disable-next-line:typedef
  generateAppNo() {
    this.ApplicationNo = localStorage.getItem('appNo');
    // console.log(localStorage.getItem('email'));
    // check if Application number exists
    if (this.ApplicationNo == null) {
      this.studentService.getNewApplicationNo(localStorage.getItem('email'));
    }
  }
  BindSubCounty(countyId: string) {
    this.studentService.SubCountyByCounty(countyId);
  }
  moveNext(value: number) {
    this.studentService.stepper.to(value);
  }
}
