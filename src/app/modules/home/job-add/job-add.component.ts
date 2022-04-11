import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobDTO} from '../../../@core/models/jobDTO';
import {JobService} from '../../../@core/services/job.service';
import {HttpErrorResponse} from '@angular/common/http';
import {JobPosition} from '../../../@core/models/jobPosition';
import {WorkingForm} from '../../../@core/models/workingForm';
import {Rank} from '../../../@core/models/rank';
import {AcademicLevel} from '../../../@core/models/academicLevel';
import {User} from '../../../@core/models/user';
import {UserService} from '../../../@core/services/user.service';
import {Job} from '../../../@core/models/job';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
})
export class JobAddComponent implements OnInit {


  date7: Date;
  date8: Date;
  jobDto: JobDTO;
  jobPositions: JobPosition[];
  workingForms: WorkingForm[];
  academicLevels: AcademicLevel[];
  ranks: Rank[];
  jes: any[];

  public  job: Job;
  rfContact: FormGroup;
  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private userService: UserService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.rfContact = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      jobPositionId: ['', [Validators.required, Validators.minLength(3)]],
      numberExperience: ['', [Validators.required, Validators.minLength(3)]],
      workingFormId: ['', [Validators.required, Validators.minLength(3)]],
      addressWork: ['', [Validators.required, Validators.minLength(3)]],
      academicLevelId: ['', [Validators.required, Validators.minLength(3)]],
      rankId: ['', [Validators.required, Validators.minLength(3)]],
      qtyPerson: ['', [Validators.required, Validators.pattern('([0-9]{1,2})')]],
      startRecruitmentDate: ['', [Validators.required, Validators.minLength(3)]],
      dueDate: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      interrest: ['', [Validators.required, Validators.minLength(3)]],
      jobRequirement: ['', [Validators.required, Validators.minLength(3)]],
      salaryMin: ['', [Validators.required,Validators.pattern('([1-9]{1}[0-9]{1,2})')]],
      salaryMax: ['', [Validators.required, Validators.pattern('([1-9]{1}[0-9]{1,2})')]],
      contactId: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.getJobPosition();
    this.getAcademicLevel();
    this.getWorkingForm();
    this.getRank();
    this.getJe();
  }
  public addJob(){
    console.log('contact'+this.rfContact.value);
    this.jobDto = this.rfContact.value;
    console.log('jobDto',this.jobDto);
    this.jobDto.creatorId = 1;
    this.jobDto.createDate = new Date();
    this.jobDto.updateUserId = 1;
    this.jobDto.updateDate = new Date();
    this.jobDto.statusJobId =1;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    this.jobDto.skills ='java';
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    // for (let i=0 ;i<this.rfContact.value.skills.length;i++){
    //   this.jobDto.skills += this.rfContact.value.skills[i]+',';
    // }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    this.jobDto.views =0;
    this.jobDto.interrest= 'khong';
    // eslint-disable-next-line max-len
    this.jobService.addJob(this.jobDto).subscribe(
      (data: any) => {
        alert('Add thành công');
        this.router.navigate(["admin/job"]);
      },
    );
  }

  public getJobPosition(){
    this.jobService.getJobPosition().subscribe(
      (data: any) => {
        this.jobPositions = data;
      },
    );
  }
  public getWorkingForm(){
    this.jobService.getWorkingForm().subscribe(
      (data: any) => {
        this.workingForms = data;
      },
    );
  }
  public getAcademicLevel(){
    this.jobService.getAcademicLevels().subscribe(
      (data: any) => {
        this.academicLevels = data;
      },
    );
  }

  public getRank(){
    this.jobService.getRanks().subscribe(
      (data: any) => {
        this.ranks = data;
      },
    );
  }

  public getJe(){
    this.userService.getJe().subscribe(
      (data: any) => {
        this.jes = data;
      },
    );
  }

  onSubmit() {
    // Do something awesome
    console.log(this.rfContact.value);
    this.addJob();
  }

}
