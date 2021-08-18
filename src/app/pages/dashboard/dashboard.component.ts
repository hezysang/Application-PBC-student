import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {StudentService} from '../../shared/Service/student.service';
import {StudentModel} from '../../shared/Model/student.model';
import Stepper from 'bs-stepper';


@Component({
  // tslint:disable-next-line:component-selector
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  title = 'appBootstrap';
  closeResult: string;
  public ApplicationNo: any;
  public Email: any;
  private template: any;
  public student: StudentModel;
  // tslint:disable-next-line:max-line-length
  private Dob: string;
  stepper: Stepper;
  // tslint:disable-next-line:max-line-length
  constructor(public service: StudentService, private modalService: NgbModal, private router: Router, private toastr: ToastrService, public datepipe: DatePipe, private SpinnerService: NgxSpinnerService ) {}

  open(content, editStudents: StudentModel) {
    this.getStudentDetails(this.service.aplicationNo);
    this.student = editStudents;
    this.service.listCounty.forEach(value => {
        if (value.Code === this.student.Code) {
          this.student.County = value
          // console.log(value)
        }
      }
    )
    this.Dob = this.datepipe.transform(this.student.DateOfBirth, 'yyyy-MM-dd')
    // this.service.getStudentDetailsByApplicationNo('ApplicationNo');
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onSubmit() {
    // this.SpinnerService.show();
    // console.log(this.service.formModel.value);
    // this.service.application().subscribe(
    //   (res: any) => {
    //     if (res.responseCode) {
    //       // this.responseCode = true;
    //       this.toastr.success(res.responseDescription, 'Update done successfully!!');
    //       // this.SpinnerService.hide();
    //     } else {
    //       this.toastr.error( 'Update failed');
    //     }
    //     // alert(res.responseDescription);
    //   },
    //   err => {
    //     this.toastr.error(err, 'Error!');
    //     // console.log(err);
    //   }
    // );
  }

    ngOnInit() {
      this.Email = localStorage.getItem('email');
      this.service.CountyList();
      this.service.getApplicationList(this.Email);

    }
  // tslint:disable-next-line:typedef

  BindSubCounty(countyCode: string) {
    this.service.listCounty.forEach(value => {
        if (value.Code === countyCode) {
          this.student.County = value
          // console.log(value)
        }
      }
    )
    this.service.SubCountyByCounty(countyCode);
  }
  getStudentDetails(ApplicationNo: any) {
    this.service.getAllStudents(ApplicationNo);
  }

}
