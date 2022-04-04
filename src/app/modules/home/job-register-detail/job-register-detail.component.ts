import { Component, OnInit } from '@angular/core';
import {JobRegisterServiceService} from '../../../@core/services/job-register-service.service';
import {jobRegisterModel} from '../../../@core/models/jobRegister.model';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-job-register-detail',
  templateUrl: './job-register-detail.component.html',
  styleUrls: ['./job-register-detail.component.scss'],
})

export class JobRegisterDetailComponent implements OnInit {
  data: jobRegisterModel;
  formInterview: FormGroup;
  formChangeStatus: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private jobRegisterService: JobRegisterServiceService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getById(this.router.snapshot.params['id']);
    this.formInterview = this.fb.group({
      jobRegisterId: ['', Validators.required],
      userId: ['', Validators.required],
      date: ['', Validators.required],
      method:['', Validators.required],
      tools:['', Validators.required],
    });
    this.formChangeStatus = this.fb.group({
      status: ['chờ phỏng vấn', Validators.required],
    });
  }

  getById(id: any){
    this.jobRegisterService.getById(id).subscribe((res: any)=>{
      console.log(res);
      this.data=res;
    });
  }

  onChangeStatus(id: any){
    this.jobRegisterService.changeStatus(id, this.formChangeStatus.value).subscribe(
      data => {
        console.log(data);
        this.getById(id);
      },
    );
  }

  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  displayStyle1 = "none";
  openPopup1(item: jobRegisterModel) {
    this.formInterview = this.fb.group({
      jobRegisterId: [item.id],
      userId: [item.user_id],
      date: ['', Validators.required],
      method:['', Validators.required],
      tools:['', Validators.required],
    });
    this.displayStyle1 = "block";
  }
  closePopup1() {
    this.displayStyle1 = "none";
  }
  licensed = "none";
  openCombobox() {
    this.licensed = "block";
  }
  closeCombobox() {
    this.licensed = "none";
  }

  onSubmit(){
    console.log(this.formInterview.value);
    this.jobRegisterService.sendEmailInterview(this.formInterview.value).subscribe(
      data => {
        console.log(data);
      },
    );
  }
}
