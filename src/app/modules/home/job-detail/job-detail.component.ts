import { Component, OnInit } from '@angular/core';
import {Job} from '../../../@core/models/job';
import {JobService} from '../../../@core/services/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../@core/models/user';
import {UserService} from '../../../@core/services/user.service';
import {JobDTO} from '../../../@core/models/jobDTO';
import {ReasonDto} from '../../../@core/models/reasonDTO';

@Component({
  selector: 'ngx-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  public  job: Job;
  user: User;
  jobDTO: JobDTO;
  reasonDto: ReasonDto;
  displayPosition: boolean;
  position: string;
  displayPositionReason: boolean;
  positionReason: string;
  reason: string;


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

  convertData(){
    this.jobDTO = {
      id: 0,
      name: '',
      jobPositionId: 0,
      numberExperience: 0,
      workingFormId: 0,
      addressWork: '',
      academicLevelId: 0,
      rankId: 0,
      qtyPerson: 0,
      startRecruitmentDate: undefined,
      dueDate: undefined,
      skills: '',
      description: '',
      interrest: '',
      jobRequirement: '',
      salaryMax: 0,
      salaryMin: 0,
      contactId: 0,
      creatorId: 0,
      createDate: undefined,
      updateUserId: 0,
      updateDate: undefined,
      statusJobId: 0,
      views: 0,
      reason: '',
    };
      this.jobDTO.id = this.job.id;
      this.jobDTO.name = this.job.name;
      this.jobDTO.jobPositionId = this.job.jobPosition.id;
      this.jobDTO.numberExperience = this.job.numberExperience;
      this.jobDTO.addressWork = this.job.addressWork;
      this.jobDTO.academicLevelId = this.job.academicLevel.id;
      this.jobDTO.workingFormId=this.job.workingForm.id;
      this.jobDTO.rankId = this.job.rank.id;
      this.jobDTO.qtyPerson = this.job.qtyPerson;
      this.jobDTO.createDate = this.job.createDate;
      this.jobDTO.dueDate = this.job.dueDate;
      this.jobDTO.skills = this.job.skills;
      this.jobDTO.startRecruitmentDate = this.job.startRecruitmentDate;
      this.jobDTO.description = this.job.description;
      this.jobDTO.interrest = this.job.interrest;
      this.jobDTO.salaryMin = this.job.salaryMin;
      this.jobDTO.salaryMax = this.job.salaryMax;
      this.jobDTO.contactId = this.job.contact.id;
      this.jobDTO.statusJobId = this.job.statusJob.id;
      this.jobDTO.views = this.job.views;
      this.jobDTO.creatorId = this.job.creater.id;
      this.jobDTO.isDelete = this.job.isDelete;
      this.jobDTO.jobRequirement = this.job.jobRequirement;
  }

  onUpdate(id: number) {
    this.router.navigate(['/home/job-update',id]);
  }

  public updateStatusJob(jobDto: JobDTO){
    this.jobService.updateJob(jobDto).subscribe(
      (data: any) => {
        this.job.statusJob =data.statusJob;
        alert('Update thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onBrowse() {
    this.convertData();
    this.jobDTO.statusJobId = 2;
    this.updateStatusJob(this.jobDTO);
  }

  onUp() {
    this.convertData();
    this.jobDTO.statusJobId = 1;
    this.updateStatusJob(this.jobDTO);
  }

  onStop() {
    this.convertData();
    this.jobDTO.statusJobId = 6;
    this.updateStatusJob(this.jobDTO);
  }

  onClose() {
    this.convertData();
    this.jobDTO.statusJobId = 5;
    this.updateStatusJob(this.jobDTO);
  }

  onDelete(id: number) {
    this.jobService.getDeleteJob(id).subscribe(() =>{
    });
    alert('Đã xóa công việc');
  }

  public updateReason(){
    this.jobService.updateReason(this.reasonDto).subscribe(
      (data: any) => {
        this.job.statusJob =data.statusJob;
        alert('Update thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onRefuse() {
    console.log('reasonDto',this.reasonDto);
    this.reasonDto.jobId = this.job.id;
    this.reasonDto.statusId = 5;
    this.updateReason();
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
}
