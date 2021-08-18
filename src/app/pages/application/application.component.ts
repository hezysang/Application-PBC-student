import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../shared/student.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  responseCode = false;
  public ApplicationNo: any;
  public Email: any;


  // @ts-ignore
  constructor(public service: StudentService, private toastr: ToastrService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.ApplicationNo = '1';
    this.Email = localStorage.getItem('email');
    this.service.getProfileDetails(this.Email);
    this.service.CountyList();
    this.service.getAcademicYear();
    this.service.formModel.reset();
    this.service.application();
    // tslint:disable-next-line:only-arrow-functions typedef
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.SpinnerService.show();
    // console.log(this.service.formModel.value);
    this.service.application().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.service.formModel.reset();
          // this.responseCode = true;
          this.toastr.success(res.responseDescription, 'Application done successfully!!');
          this.SpinnerService.hide();
        } else {
          this.toastr.error( 'Registration failed');
          this.SpinnerService.hide();
        }
        // alert(res.responseDescription);
      },
      err => {
        this.toastr.error(err, 'Error!');
        // console.log(err);
      }
    );
  }
  // tslint:disable-next-line:typedef
  BindSubCounty(countyId: string) {
    this.service.SubCountyByCounty(countyId);
  }
  get f() {
    return this.service.formModel?.controls;
  }
}
