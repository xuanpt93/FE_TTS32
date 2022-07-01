import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {CalendarModule} from 'primeng/calendar';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';

import {MaterialModule} from '../../shared/material.module';



import {DialogModule} from "primeng/dialog";

import {AvatarModule} from "primeng/avatar";

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
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
