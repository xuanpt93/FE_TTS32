import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobDTO} from '../../../@core/models/jobDTO';
import {JobService} from '../../../@core/services/job.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
})
export class JobAddComponent implements OnInit {


  date7: Date;
  date8: Date;
  jobDto: JobDTO;

  rfContact: FormGroup;
  constructor(private fb: FormBuilder,
              private jobService: JobService) { }

  ngOnInit() {
    this.rfContact = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      jobPositionId: ['', [Validators.required, Validators.minLength(3)]],
      numberExperience: ['', [Validators.required, Validators.minLength(3)]],
      workingFormId: ['', [Validators.required, Validators.minLength(3)]],
      addressWork: ['', [Validators.required, Validators.minLength(3)]],
      academicLevelId: ['', [Validators.required, Validators.minLength(3)]],
      rankId: ['', [Validators.required, Validators.minLength(3)]],
      qtyPerson: ['', [Validators.required, Validators.minLength(3)]],
      startRecruitmentDate: ['', [Validators.required, Validators.minLength(3)]],
      dueDate: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      benefits: ['', [Validators.required, Validators.minLength(3)]],
      jobRequirement: ['', [Validators.required, Validators.minLength(3)]],
      salaryMin: ['', [Validators.required, Validators.minLength(3)]],
      salaryMax: ['', [Validators.required, Validators.minLength(3)]],
      contactId: ['', [Validators.required, Validators.minLength(3)]],
    });
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
    this.jobDto.skills ='';
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i=0 ;i<this.rfContact.value.skills.length;i++){
      this.jobDto.skills += this.rfContact.value.skills[i]+',';
    }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    this.jobDto.views =0;
    // eslint-disable-next-line max-len
    this.jobService.addJob(this.jobDto).subscribe(
      (data: any) => {
        alert('Add thành công');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onSubmit() {
    // Do something awesome
    console.log(this.rfContact.value);
    this.addJob();
  }
}
