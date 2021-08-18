import { Component, OnInit } from '@angular/core';
import {MedicalService} from '../../shared/Service/medical.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-medical-history-info',
  templateUrl: './medical-history-info.component.html',
  styleUrls: ['./medical-history-info.component.css']
})
export class MedicalHistoryInfoComponent implements OnInit {
  public ApplicationNo: any;
  closeResult = '';
  // tslint:disable-next-line:max-line-length
  constructor(public medicalHistoryService: MedicalService, private toastr: ToastrService, private modalService: NgbModal, private router: Router, private SpinnerService: NgxSpinnerService) { }
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
    this.medicalHistoryService.medicalHistory();
    this.getMedicalHistoryDetails(this.ApplicationNo);

  }

  onSubmit() {
    if (this.medicalHistoryService.formModel.valid) {
      this.medicalHistoryService.medicalHistory().subscribe(
        (res: any) => {
          if (res.responseCode) {
            this.medicalHistoryService.formModel.reset();
            // this.responseCode = true;
            this.toastr.success(res.responseDescription, 'Application done successfully!!');
            this.ApplicationNo = localStorage.getItem('appNo');
            this.getMedicalHistoryDetails(this.ApplicationNo);
            this.modalService.dismissAll()
            // localStorage.removeItem('appNo');
            this.SpinnerService.hide();
            this.moveNext(4);
          } else {
            this.toastr.error('Medical registration failed');
            this.SpinnerService.hide();
          }
          // alert(res.responseDescription);
        },
        err => {
          this.toastr.error(err.responseDescription, 'Error!');
          // console.log(err);
        }
      );
    } else {
      // validate all form fields
      this.toastr.error('All fields Required')
    }
  }
  moveNext(value: number) {
    this.medicalHistoryService.stepper.to(value);
  }
  getMedicalHistoryDetails(ApplicationNo: any) {
    this.medicalHistoryService.getMedicalHistory(ApplicationNo);
  }
  onClickBack(number: number) {
    this.moveNext(3);
  }

  onTabClick(event) {
    this.router.navigate(['/dashboard'])
      .then(success => console.log('navigation success?' , success))
      .catch(console.error);
  }
}
