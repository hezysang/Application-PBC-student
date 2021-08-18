import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {AcademicService} from '../../shared/Service/academic.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-academic-history-info',
  templateUrl: './academic-history-info.component.html',
  styleUrls: ['./academic-history-info.component.css']
})
export class AcademicHistoryInfoComponent implements OnInit {
  public ApplicationNo: any;
  closeResult = '';
  // tslint:disable-next-line:max-line-length
  constructor(public academicService: AcademicService,  private toastr: ToastrService, private modalService: NgbModal, private router: Router, private SpinnerService: NgxSpinnerService) { }
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
    this.ApplicationNo = localStorage.getItem('appNo');
    this.academicService.academicHistory();
    this.getAcademicHistoryDetails(this.ApplicationNo);
  }
  onSubmit() {
    if (this.academicService.formModel.valid) {
      this.academicService.academicHistory().subscribe(
      (res: any) => {
        if (res.responseCode) {
          this.academicService.formModel.reset();
          // this.responseCode = true;
          this.toastr.success(res.responseDescription, 'Application done successfully!!');
          this.modalService.dismissAll()
          this.ApplicationNo = localStorage.getItem('appNo');
          this.getAcademicHistoryDetails(this.ApplicationNo);
          this.moveNext(3);
          this.SpinnerService.hide();
        } else {
          this.toastr.error( 'Registration failed');
          this.SpinnerService.hide();
        }
        // alert(res.responseDescription);
      },
      err => {
        this.toastr.error(err, 'Error!');
        this.SpinnerService.hide();
        // console.log(err);
      }
    );
  } else {
      // validate all form fields
      this.toastr.error('All fields Required')
    }
  }
  // tslint:disable-next-line:typedef
  moveNext(value: number) {
    this.academicService.stepper.to(value);
  }
  getAcademicHistoryDetails(ApplicationNo: any) {
    this.academicService.getAcademicList(ApplicationNo);
  }

  onTabClick(number: number) {
    this.moveNext(4);
  }
  onClick(number: number) {
    this.moveNext(2);
  }
}
