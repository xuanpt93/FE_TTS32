import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { JobComponent } from './job/job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JobAddComponent } from './job-add/job-add.component';
import {JobRegisterComponent} from './job-register/job-register.component';
import {CalendarModule} from 'primeng/calendar';
import { JobUpdateComponent } from './job-update/job-update.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import { JobRegisterDetailComponent } from './job-register-detail/job-register-detail.component';
import {MaterialModule} from '../../shared/material.module';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserAddComponent } from './user/user-add/user-add.component';

import {DialogModule} from "primeng/dialog";
import { CompanyComponent } from './company/company.component';
import {AvatarModule} from "primeng/avatar";
import { CompanyUpdateComponent } from './company-update/company-update.component';

import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'job',
      component: JobComponent,
    },
    {
      path: 'job-detail/:id',
      component: JobDetailComponent,
    },
    {
      path: 'job-add',
      component: JobAddComponent,
    },
    {
      path: 'job-update/:id',
      component: JobUpdateComponent,
    },
    {
      path: 'company',
      component: CompanyComponent,
    },
    {
      path: 'update-company',
      component: CompanyUpdateComponent,
    },

    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'user',
      component: UserComponent,
    },{
      path: 'user-detail/:id',
      component: UserDetailComponent,
    },

    {
      path: 'user-add/:id',
      component:UserAddComponent,
    },

    {path: 'jobRegister', component:JobRegisterComponent},
    {path: 'jobRegister/:id', component:JobRegisterDetailComponent},

  ],
}];

@NgModule({


    // HomeComponent, JobComponent, JobDetailComponent, JobAddComponent,JobRegisterComponent, JobUpdateComponent,


  // declarations: [HomeComponent, JobComponent, JobDetailComponent, JobAddComponent,
  //   JobRegisterComponent, JobRegisterDetailComponent],
  //   imports: [
  //       CommonModule,
  //       RouterModule.forChild(routes),
  //       ThemeModule,
  //       NbMenuModule,
  //       ReactiveFormsModule,
  //       MaterialModule,
  //   ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
  declarations: [
    HomeComponent,
    JobComponent,
    JobDetailComponent,
    JobAddComponent,
    JobRegisterComponent,
    UserComponent,
    UserDetailComponent,
    UserAddComponent,
    JobRegisterDetailComponent,
    JobUpdateComponent,

    CompanyComponent,
    CompanyUpdateComponent,

    DashboardComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    PaginatorModule,
    MaterialModule,
    DialogModule,
    AvatarModule,
  ],
})
export class HomeModule { }
