import { Component, OnInit } from '@angular/core';
import {Job} from '../../../@core/models/job';
import {JobService} from '../../../@core/services/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../@core/models/user';
import {UserService} from '../../../@core/services/user.service';

@Component({
  selector: 'ngx-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  public  job: Job;
  user: User;

  constructor(
    public jobService: JobService,
    public route: ActivatedRoute,
    private userService: UserService,
    private readonly router: Router) {
this.getUser();
}

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
  public getUserByUserName(username: string): void {
    this.userService.getUserByUserName(username).subscribe(
      (data: User) => {
        this.user = data;
        console.log('role',data.roles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public getUser(): void {
    const token = this.userService.getDecodedAccessToken();
    this.getUserByUserName(token.sub);
  }

  onUpdate(id: number) {
    this.router.navigate(['/home/job-update',id]);
  }
}
