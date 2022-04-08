/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../@core/services/user.service';

@Component({
  selector: 'ngx-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;
  unitTrustsPnl: string;
  @ViewChild('labelImport')
  labelImport: ElementRef;
  fileToUpload: File = null;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;
  constructor(
    private httpClient: HttpClient,
    public userService: UserService,
    public route: Router,
    private fb: FormBuilder,
  ) {
    this.unitTrustsPnl = 'female';
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: this.fb.control('',[Validators.required]),
      email: this.fb.control('',[Validators.required,Validators.email]),
      userName: this.fb.control('',[Validators.required]),
      gender: this.fb.control(''),
      hometown: this.fb.control(''),
      birthDay: this.fb.control(''),
      password: this.fb.control('',[Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      phoneNumber: this.fb.control('',[Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]),
    });
  }

  onSubmit(){
    const user = {
      fullName: this.registerForm.controls.fullName.value,
      email: this.registerForm.controls.email.value,
      userName: this.registerForm.controls.userName.value,
      password: this.registerForm.controls.password.value,
      birthDay: this.registerForm.controls.birthDay.value,
      phoneNumber: this.registerForm.controls.phoneNumber.value,
      homeTown: this.registerForm.controls.hometown.value,
      gender: this.registerForm.controls.gender.value,
      avatarName: '',
    };
  console.log(user);
    this.userService.register(user).subscribe((data)=>{
      if(data === false){
        alert('Đăng ký không thành công');
        return;
      }else{
            alert('Đăng ký thành công, vui lòng kiểm tra mail để kích hoạt tài khoản');
        };
      this.route.navigate(['/auth']);
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    });

    this.imageUploadAction();
  }

  onSelect(file: File){
    this.labelImport.nativeElement.innerText = file[0].name;
    this.fileToUpload = file[0];
    var reader = new FileReader();
      reader.readAsDataURL(file[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.dbImage = event.target.result;
      };
  }

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.fileToUpload, this.fileToUpload.name);

    this.httpClient.post('http://localhost:9090/api/public/upload/image/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      },
      );
    }

  viewImage() {
    this.httpClient.get('http://localhost:9090/get/image/info/' + this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        },
      );
  }
}
