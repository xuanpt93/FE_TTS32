import { Component, OnInit } from '@angular/core';
import {jobRegisterModel} from '../../../@core/models/jobRegister.model';
import {JobRegisterServiceService} from '../../../@core/services/job-register-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CvService} from '../../../@core/services/cv.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-job-register',
  templateUrl: './job-register.component.html',
  styleUrls: ['./job-register.component.scss'],
})
export class JobRegisterComponent implements OnInit {
  datas: jobRegisterModel[]=[];
  formInterview: FormGroup;
  formSearch: FormGroup;
  page: number;
  size: number;
  totalRecords: number;
  isSubmitted = false;

  constructor(
    private jobRegisterService: JobRegisterServiceService,
    private fb: FormBuilder,
    private router: Router,
    private cv: CvService,
  ) { }

  ngOnInit(): void {
    this.page = 0;
    this.size = 2;
    this.totalRecords = 5;
    this.getAll();
    this.formInterview = this.fb.group({
      jobRegisterId: ['', Validators.required],
      userId: ['', Validators.required],
      date: ['', Validators.required],
      method:['', Validators.required],
      tools:['', Validators.required],
    });
    this.formSearch = this.fb.group({
      fullName: '',
      jobName: '',
      idStatusJobRegister: '',
    })
  }

  paginate(event) {
    this.page = event.page;
    this.size = event.rows;
    console.log(this.page);
    console.log(this.size);
    this.search();
  }

  search() {
    this.jobRegisterService.search(this.formSearch.value, this.page, this.size).subscribe((res: any)=>{
      console.log(res);
      this.datas = res;
    });
  }

  getAll(){
    this.jobRegisterService.getAll().subscribe((res: any)=>{
      console.log(res);
      this.datas = res;
    });
  }

  displayStyle = "none";

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
          alert("Đặt lịch phỏng vấn thành công");
          this.closePopup1();
          this.getAll();
        },
        error => {
          alert("đặt lịch phỏng vấn thất bại" + error);
        }
      );
  }

  downloadCV(fileName: any): void {
    this.cv.download(fileName).subscribe(
      data => saveAs(data, fileName),
    );
  }

  currentDate= new Date();
}
