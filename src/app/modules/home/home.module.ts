import { NgModule } from '@angular/core';
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
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";


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
      path: 'dashboard',
      // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'user',
      // loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },

    {path: 'jobRegister', component:JobRegisterComponent},
  ],
}];

@NgModule({
  declarations: [

    HomeComponent, JobComponent, JobDetailComponent, JobAddComponent,JobRegisterComponent, JobUpdateComponent,

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
  ],
})
export class HomeModule { }
