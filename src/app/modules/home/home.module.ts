import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { JobComponent } from './job/job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import { JobAddComponent } from './job-add/job-add.component';
import {JobRegisterComponent} from './job-register/job-register.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserAddComponent } from './user/user-add/user-add.component';

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
      component: UserComponent,
      // loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },{
      path: 'user-detail/:id',
      component: UserDetailComponent,
      // loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },

    {
      path: 'jobRegister',
      component:JobRegisterComponent,
    },
    {
      path: 'user-add',
      component:UserAddComponent,
    },
  ],
}];

@NgModule({
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
