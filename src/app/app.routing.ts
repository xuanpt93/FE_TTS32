import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './@core/guards/auth.guard';

import { ConfirmMailComponent } from './modules/forgot-pass/confirm-mail/confirm-mail.component';
import { ChangePassComponent } from './modules/forgot-pass/change-pass/change-pass.component';

import {JobRegisterComponent} from './modules/home/job-register/job-register.component';
import { UserRegisterComponent } from './modules/public/user-register/user-register.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/webpublic/webpublic.module').then(m => m.WebpublicModule),
  },
  {
    path: 'confirm-mail',
    component: ConfirmMailComponent,
  },
  {
    path: 'change-pass',
    component: ChangePassComponent,
  },

  {
    path: 'register',
    component: UserRegisterComponent,
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },

];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
