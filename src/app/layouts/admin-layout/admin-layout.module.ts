import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import {ApplicationComponent} from '../../pages/application/application.component';
import { NgxSpinnerModule } from 'ngx-spinner';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from '../../pages/profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ApplicationComponent,
    ProfileComponent,
  ]
})

export class AdminLayoutModule {}
