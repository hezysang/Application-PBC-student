import {Component, ElementRef, OnInit} from '@angular/core';
import {StudentService} from '../../shared/Service/student.service';
import Stepper from 'bs-stepper';
import {FamilyService} from '../../shared/Service/family.service';
import {AcademicService} from '../../shared/Service/academic.service';
import {MedicalService} from '../../shared/Service/medical.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  private stepper: Stepper;

  constructor(private readonly elementRef: ElementRef, public studentService: StudentService,
              public familyService: FamilyService, public academicService: AcademicService, public medicalHistoryService: MedicalService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    const stepperEl = this.elementRef.nativeElement.querySelector('#stepper1');

    stepperEl.addEventListener('show.bs-stepper', (event: { detail: { to: number; }; }) => {
      this.studentService.currentStep = event.detail.to;
    });

    this.stepper = new Stepper(stepperEl, {
      linear: false,
      animation: true
    });

    this.studentService.stepper = this.stepper;
    this.familyService.stepper = this.stepper;
    this.academicService.stepper = this.stepper;
    this.medicalHistoryService.stepper = this.stepper;

  }

}
