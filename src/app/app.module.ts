import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CodeCaptureComponent } from './pages/code-capture/code-capture.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {DatePipe} from '@angular/common';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { StudentInfoComponent } from './pages/student-info/student-info.component';
import { FamilyInfoComponent } from './pages/family-info/family-info.component';
import { AcademicHistoryInfoComponent } from './pages/academic-history-info/academic-history-info.component';
import { MedicalHistoryInfoComponent } from './pages/medical-history-info/medical-history-info.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';





@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    CodeCaptureComponent,
    DashboardComponent,
    MainDashboardComponent,
    StudentInfoComponent,
    FamilyInfoComponent,
    AcademicHistoryInfoComponent,
    MedicalHistoryInfoComponent,
    AddStudentComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgxSpinnerModule
  ],
  providers: [DatePipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
