import { Component, OnInit } from '@angular/core';
import {jobRegisterModel} from '../../../@core/models/jobRegister.model';
import {JobRegisterServiceService} from '../../../@core/services/job-register-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-job-register',
  templateUrl: './job-register.component.html',
  styleUrls: ['./job-register.component.scss'],
})
export class JobRegisterComponent implements OnInit {
  datas: jobRegisterModel[]=[];
  formInterview: FormGroup;
  isSubmitted = false;

  constructor(
    private jobRegisterService: JobRegisterServiceService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.formInterview = this.fb.group({
      jobRegisterId: ['', Validators.required],
      userId: ['', Validators.required],
      date: ['', Validators.required],
      method:['', Validators.required],
      tools:['', Validators.required],
    });
  }

  getAll(){
    this.jobRegisterService.getAll().subscribe((res: any)=>{
      console.log(res);
      this.datas = res;
    });
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

  innitForm(){
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
