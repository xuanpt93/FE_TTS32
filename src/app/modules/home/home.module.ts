import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { JobComponent } from './job/job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import { JobAddComponent } from './job-add/job-add.component';

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
      path: 'dashboard',
      // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'user',
      // loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
  ],
}];

@NgModule({
  declarations: [
    HomeComponent, JobComponent, JobDetailComponent, JobAddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule { }
