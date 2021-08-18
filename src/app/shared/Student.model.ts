import {County} from './county.model';
import {SubCounty} from './sub-county.model';

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
  Names: string;
  Type: string;
  Occupation: string;
  MobileNo: string;
  CompanyName: string;
  CompanyAddress: string;
  Email: string;
  CompanyTelNo: string;
  ResidentialAddress: string;
  ApartmentNo: string;
  HouseNo: string;
  Address: string;
  Status: string;
  County: County;
  subCounty: SubCounty;
  StudentNo: string;
}
