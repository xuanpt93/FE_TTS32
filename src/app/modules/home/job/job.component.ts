import { Component, OnInit } from '@angular/core';
import {Job} from '../../../@core/models/job';
import {JobService} from '../../../@core/services/job.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {

  public job: any;
  public jobs: Job[];
  searchForm: FormGroup = this.cost.group({
    jobName: new FormControl(''),
    salaryMax: new FormControl(''),
    salaryMin: new FormControl(''),
    statusJob: new FormControl(''),
  });

  constructor(
    private jobService: JobService,
    public cost: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getJop();
    this.onSearchJob();
  }
  getJop(){
    this.jobService.getJob().subscribe((data: any[])=>{
      this.jobs = data;
      console.log(data);
    });
  }

  onSearchJob() {
    // eslint-disable-next-line max-len
    this.jobService.findJob(this.searchForm.value.jobName,this.searchForm.value.statusJob,this.searchForm.value.salaryMin,this.searchForm.value.salaryMax,0,2).subscribe(
      res => {
        console.log(res);
        this.jobs=res.list;
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  pageSize = 1;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentPage = 1;

}
