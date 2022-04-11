import {Component, OnInit} from '@angular/core';
import {JobRegisterServiceService} from '../../../@core/services/job-register-service.service';
import {jobRegisterModel} from '../../../@core/models/jobRegister.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {saveAs} from 'file-saver';
import {CvService} from '../../../@core/services/cv.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'ngx-job-register-detail',
  templateUrl: './job-register-detail.component.html',
  styleUrls: ['./job-register-detail.component.scss'],
})

export class JobRegisterDetailComponent implements OnInit {
  fileInfos: Observable<any>;
  data: jobRegisterModel;
  formInterview: FormGroup;
  formChangeStatus: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private jobRegisterService: JobRegisterServiceService,
    private fb: FormBuilder,
    private cv: CvService,
    private routers: Router,
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
      status: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  getById(id: any){
    this.jobRegisterService.getById(id).subscribe((res: any)=>{
      console.log(res);
      this.data=res;
    });
  }

  onChangeStatus(id: any, event: any){
    this.formChangeStatus = this.fb.group({
      status: [event.target.status.value],
      reason: [event.target.reason.value],
    });
    console.log(this.formChangeStatus.value);
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
      userId: [item.user.id],
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

  downloadCV(fileName: any): void {
    this.cv.download(fileName).subscribe(
      data => saveAs(data, fileName),
    );
  }
}
