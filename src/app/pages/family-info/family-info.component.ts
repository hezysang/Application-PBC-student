import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {FamilyService} from '../../shared/Service/family.service';
import {Router} from '@angular/router';
import {StudentService} from '../../shared/Service/student.service';
import {StudentModel} from '../../shared/Model/student.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.css']
})
export class FamilyInfoComponent implements OnInit {
  public ApplicationNo: any;
  student: StudentModel[];
  public Email: any;
  closeResult = '';


  // tslint:disable-next-line:max-line-length
  constructor(public familyService: FamilyService, private router: Router, private toastr: ToastrService, public studentService: StudentService,
              private SpinnerService: NgxSpinnerService, private modalService: NgbModal) { }
  open(content) {
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
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.Email = localStorage.getItem('email');
    this.familyService.familyInfo();
    this.ApplicationNo = localStorage.getItem('appNo')
    this.getFamilyDetails(this.ApplicationNo);
    this.studentService.studentInfo();
    this.studentService.getApplicationList(this.Email);

  }

  onSubmit() {
    if (this.familyService.formModel.valid) {
      this.familyService.familyInfo().subscribe(
        (res: any) => {
          if (res.responseCode) {
            this.familyService.formModel.reset();
            // this.responseCode = true;
            console.log(this.familyService.formModel.value);
            this.toastr.success(res.responseDescription, 'Application done successfully!!');
            this.modalService.dismissAll()
            this.ApplicationNo = localStorage.getItem('appNo')
            this.getFamilyDetails(this.ApplicationNo);
            this.moveNext(2);
            this.SpinnerService.hide();
          } else {
            this.toastr.error('Registration failed');
            this.SpinnerService.hide();
          }
        },
        err => {
          // console.log(this.familyService.formModel.value);
          this.toastr.error(err, 'Error!');
          // console.log(err);
        }
      );
    } else {
      // validate all form fields
      this.toastr.error('All fields Required')
    }
  }

  get f() {
    return this.familyService.formModel?.controls;
  }
  moveNext(value: number) {
    this.familyService.stepper.to(value);
  }
  getFamilyDetails(ApplicationNo: any) {
    this.familyService.getFamilyMembers(ApplicationNo);
  }
  getStudentDetails() {

  }

  onTabClick(number: number) {
    this.moveNext(3)
  }
}
