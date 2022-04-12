import { Component, OnInit } from '@angular/core';
import {JobService} from "../../../@core/services/job.service";
import {Job} from '../../../@core/models/job';
import {CvService} from '../../../@core/services/cv.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'ngx-homeweb',
  templateUrl: './homeweb.component.html',
  styleUrls: ['./homeweb.component.scss']
})
export class HomewebComponent implements OnInit {
  currentTabIndex: number;
  data: Job[] = [];
  dataAll: Job[] = [];
  page: number;
  size: number;
  totalRecords: number;

  file: File;

  constructor(private jobService: JobService, private cvService: CvService) { }

  ngOnInit(): void {
    this.currentTabIndex = 0;
    this.page = 0;
    this.size = 5;
    this.getAll();
    this.onSelectedIndexChange(0);
  }

  paginate(event) {
    this.page = event.page;
    this.size = event.rows;
    console.log(this.page);
    console.log(this.size);
    this.onSelectedIndexChange(this.currentTabIndex);
  }

  public onSelectedIndexChange(tabIndex: number) {
    this.currentTabIndex = tabIndex;
    console.log(tabIndex);
    this.getAllByTab(tabIndex);
  }

  getAllByTab(id: number){
    this.jobService.getJobHome(id, this.page, this.size).subscribe((res: any)=>{
      console.log(res);
      this.data = res;
    })
  }

  getAll(){
    this.jobService.getAll().subscribe((res: any) => {
      this.dataAll = res;
    })
  }


}
