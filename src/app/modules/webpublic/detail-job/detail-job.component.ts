import { Component, OnInit } from '@angular/core';
import {JobService} from "../../../@core/services/job.service";
import {Job} from '../../../@core/models/job';
import {ActivatedRoute, Router} from '@angular/router';
import {CvService} from '../../../@core/services/cv.service';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {jobRegisterModel} from "../../../@core/models/jobRegister.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileServiceService} from "../../../@core/services/profile-service.service";
import {ProfileModel} from "../../../@core/models/profile.model";
import {User} from "../../../@core/models/user";
import {UserService} from "../../../@core/services/user.service";
import {jobRegisterDTOModel} from "../../../@core/models/jobRegisterDTO.model";
import {JobRegisterServiceService} from "../../../@core/services/job-register-service.service";
import {TokenService} from "../../../@core/services/token.service";

@Component({
  selector: 'ngx-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.scss']
})
export class DetailJobComponent implements OnInit {
  profile: ProfileModel;
  user: User;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  data: Job;
  formJobRegister: FormGroup;
  jobRegisterDTO: jobRegisterDTOModel;

  constructor(
              private tokenService: TokenService,
              private jobService: JobService,
              private router: ActivatedRoute,
              private cv: CvService,
              private routers: Router,
              private profileService: ProfileServiceService,
              private userService: UserService,
              private fb: FormBuilder,
              private jobRegisterService: JobRegisterServiceService) { }

  ngOnInit(): void {
    this.getUserByUserName();
    this.getById(this.router.snapshot.params['id']);

    this.formJobRegister = this.fb.group({
      job_id: this.router.snapshot.params['id'],
      user_id:'',
    })
  }

  getById(id: number){
    this.jobService.getJobById(id).subscribe(
      data => {
        this.data = data;
      }
    )
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.cv.upload(this.currentFile, this.user.id, this.router.snapshot.params['id']).subscribe(
          data => {
            console.log("thành công");
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  getProfileByUserId(){
    this.profileService.getByUserId(this.user.id).subscribe(
      data =>{
        this.profile = data
        console.log(this.profile)
      }
    )
  }

  getUserByUserName(){
    const token = this.userService.getDecodedAccessToken();
    if (token) {
      this.userService.getUserByUserName(token.sub).subscribe(
        data => {
          this.user = data;
          console.log(data);
          this.getProfileByUserId();
        }
      )
    }
  }

  recruitment(): void {
    const token = this.userService.getDecodedAccessToken();
    if (token) {
      this.openPopup();
    } else {
      alert("Đăng nhập trước khi ứng tuyển")
      this.routers.navigate(['/auth/'])
    };
  }

  createJobRegister(){
    // call thực hiện upload file
    this.formJobRegister = this.fb.group({
      job_id: this.router.snapshot.params['id'],
      user_id: this.user.id,
    })
    this.upload();
  }

}
