import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import {JobRegisterComponent} from './job-register/job-register.component';
import { JobRegisterDetailComponent } from './job-register-detail/job-register-detail.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'user',
      // loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {path: 'jobRegister', component:JobRegisterComponent},
    {path: 'jobRegister/:id', component:JobRegisterDetailComponent},
  ],
}];

@NgModule({
  declarations: [
    HomeComponent,JobRegisterComponent, JobRegisterDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
  ],
})
export class HomeModule { }
