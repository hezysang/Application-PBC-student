import {County} from '../county.model';
import {SubCounty} from '../sub-county.model';

export class StudentModel {
  ApplicationNo: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DateOfBirth: Date;
  Gender: string;
  Code: string;
  Name: string;
  Sub_County_Code: string;
  Class: string;
  Term: string;
  NemisNo: string;
  AcademicYear: string;
  Status: string;
  County: County;
  subCounty: SubCounty;
  StudentNo: string;
}
