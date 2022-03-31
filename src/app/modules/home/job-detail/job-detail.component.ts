import { Component, OnInit } from '@angular/core';
import {Job} from '../../../@core/models/job';
import {JobService} from '../../../@core/services/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  public  job: any;

  constructor(
    public jobService: JobService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getJobById();
  }


  public getJobById(): void {
    const id = this.route.snapshot.params['id'];
    this.jobService.getJobAd(id).subscribe(
      res => {
        this.job = res;
        console.log(res);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

}
