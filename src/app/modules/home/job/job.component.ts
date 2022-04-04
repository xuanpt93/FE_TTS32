import { Component, OnInit } from '@angular/core';
import {Job} from '../../../@core/models/job';
import {JobService} from '../../../@core/services/job.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {StatusJob} from '../../../@core/models/statusJob';
import {SelectItem} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  public jobs: Job[];
  // public  job: Job;

  statusJobs: any[];

  selectedStatusJobAdvanced: any;

  filteredStatusJobs: any[];

  selectedName: any;
  selectedSalaryMin: any;
  selectedSalaryMax: any;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  sortKey: any;
  page: number;
  size: number;
  totalRecords: number;
  sortNumber: number;

  constructor(public jobService: JobService,private readonly router: Router,public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getStatusJob();
    this.sortOptions = [
      {label: 'Tên công việc', value: 'name'},
      {label: 'Thời gian nộp hồ sơ', value: 'dueDate'},
      {label: 'lương', value: 'number'},
    ];
    this.getInnitData();
    this.onSearch();
    this.getJop();
    // this.getJobById();
  }

  getJop(){
    this.jobService.getJob().subscribe((data: any[])=>{
      this.jobs = data;
      console.log(data);
    });
  }

  getInnitData() {
    this.selectedName = '';
    this.selectedStatusJobAdvanced = {id: 1, code: 'dang tuyen'};
    this.selectedSalaryMin = 0;
    this.selectedSalaryMax = 900;
    this.page = 0;
    this.size = 4;
    this.totalRecords = 5;
    this.sortNumber = 1;
  }

  public getStatusJob(): void {
    this.jobService.getStatusJob().subscribe(
      (data: StatusJob[]) => {
        this.statusJobs = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onSortChange(event) {
    const value = event.value;
    console.log(value,value);

    if (value.indexOf('name') === 0) {
      this.sortNumber = 2;
      this.onSortByName();
    } else {
      this.sortNumber = 1;
      this.onSearch();
    }
  }

  filterStatusJob(event) {
    // eslint-disable-next-line max-len
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    const query = event.query;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.statusJobs.length; i++) {
      const statusJob = this.statusJobs[i];
      // eslint-disable-next-line eqeqeq
      if (statusJob.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(statusJob);
      }
    }
    this.filteredStatusJobs = filtered;
  }

  public onSearch() {
    // eslint-disable-next-line max-len
    console.log(this.selectedName, this.selectedSalaryMax, this.selectedSalaryMin);
    this.jobService.findJob(this.selectedName, this.selectedStatusJobAdvanced.id, this.selectedSalaryMin, this.selectedSalaryMax, this.page, this.size).subscribe(
      (data: any) => {
        this.jobs = data.list;
        this.totalRecords = data.totalPage * this.size;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onSortByName() {
    // eslint-disable-next-line max-len
    this.jobService.sortByName(this.selectedName, this.selectedStatusJobAdvanced.id, this.selectedSalaryMin, this.selectedSalaryMax, this.page, this.size).subscribe(
      (data: any) => {
        this.jobs = data.list;
        this.totalRecords = data.totalPage * this.size;
      },
    );
  }

  paginate(event: any) {
    this.page = event.page;
    this.size = event.rows;
    if(this.sortNumber === 1){
      this.onSearch();
    } else {
      this.onSortByName();
    }
  }



  // public getJobById(): void {
  //   const id = this.route.snapshot.params['id'];
  //   this.jobService.getJobAd(id).subscribe(
  //     res => {
  //       this.job = res;
  //       console.log(res);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     },
  //   );
  // }


}
