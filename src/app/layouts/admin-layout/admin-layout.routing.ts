import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {ApplicationComponent} from '../../pages/application/application.component';
import {ProfileComponent} from '../../pages/profile/profile.component';
import {StudentInfoComponent} from '../../pages/student-info/student-info.component';
import {FamilyInfoComponent} from '../../pages/family-info/family-info.component';
import {MedicalHistoryInfoComponent} from '../../pages/medical-history-info/medical-history-info.component';
import {AddStudentComponent} from '../../pages/add-student/add-student.component';
import {AcademicHistoryInfoComponent} from '../../pages/academic-history-info/academic-history-info.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'application',    component: ApplicationComponent },
    {path: 'familyInfo',      component: FamilyInfoComponent},
    { path: 'newStudent',     component: StudentInfoComponent },
    { path: 'addStudent',     component: AddStudentComponent },
    { path: 'medicalHistory',  component: MedicalHistoryInfoComponent },
    { path: 'academicHistory', component: AcademicHistoryInfoComponent},
    { path: 'profile',        component: ProfileComponent },



];
