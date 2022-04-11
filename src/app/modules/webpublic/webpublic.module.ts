import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebpublicComponent } from './webpublic.component';
import { RouterModule, Routes } from '@angular/router';
import { ListJobHomepageComponent } from './list-job-homepage/list-job-homepage.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DetailJobComponent } from './detail-job/detail-job.component';
import { HomewebComponent } from './homeweb/homeweb.component';
import {FileUploadModule} from "primeng/fileupload";
import {PaginatorModule} from "primeng/paginator";

const routes: Routes = [{
  path: '',
  component: WebpublicComponent,
  children: [
    {
      path: 'listjob',
      component: ListJobHomepageComponent,
    },
    {
      path: 'detail/:id',
      component: DetailJobComponent,
    },
    {
      path: '',
      component: HomewebComponent,
    },

  ],
}];

@NgModule({
  declarations: [
    WebpublicComponent,
    ListJobHomepageComponent,
    DetailJobComponent,
    HomewebComponent,
  ],
    imports: [
        MatTabsModule,
        CommonModule,
        RouterModule.forChild(routes),
        FileUploadModule,
        PaginatorModule,
    ],
})
export class WebpublicModule { }
