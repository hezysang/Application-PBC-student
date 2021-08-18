import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {CodeCaptureComponent} from './pages/code-capture/code-capture.component';
import {MainDashboardComponent} from './pages/main-dashboard/main-dashboard.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'mainDashboard',
    component: MainDashboardComponent
  },
  {
    path: 'resetLink',
    component: ResetPasswordComponent
  },
  {
    path: 'resetUserPassword',
    component: CodeCaptureComponent
  },
   {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
