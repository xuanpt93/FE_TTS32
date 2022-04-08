import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../@core/models/user.model';
import { UserService } from '../../../../@core/services/user.service';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {

  //addUserForm: FormGroup;
  addUserForm = this.fb.group({
    fullName:'',
    email:'',
    userName:'',
    birthDay:'',
    gender:'',
    hometown:'',
    password:'',
    phoneNumber:'',
  });
  public id = this.routep.snapshot.params['id'];
  public selectedUser: any;
  public status: any;
  constructor(
    public userService: UserService,
    public route: Router,
    public routep: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    //const id = this.routep.snapshot.params['id'];
    if(this.id == 0){
      this.status='Thêm mới';
      this.addUserForm = this.fb.group({
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
    }else{
      this.status='Update';
      this.getUserById();
    }

  }

  onSubmit(){
    const user ={
      id: '',
      fullName: this.addUserForm.controls.fullName.value,
      email: this.addUserForm.controls.email.value,
      userName: this.addUserForm.controls.userName.value,
      password: this.addUserForm.controls.password.value,
      birthDay: this.addUserForm.controls.birthDay.value,
      gender: this.addUserForm.controls.gender.value,
      phoneNumber: this.addUserForm.controls.phoneNumber.value,
      homeTown: this.addUserForm.controls.hometown.value,
      role: 'ROLE_JE',
    };
    if(this.id === 0){
      user.id = '';
    }else{
      user.id = this.id;
    }
    this.addUser(user);
  }

  addUser(user: any){
    this.userService.addUser(user).subscribe((data)=>{
      if(data === false){
        alert('Thêm user không thành công');
      }else{
        if(this.id == 0){
          alert('Thêm user thành công');
        }else{
          alert('update thành công');
        }

      }
      this.route.navigate(['/home/user']);
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    });
  }

  setFormData(data: any){
    this.addUserForm = this.fb.group({
      fullName: this.fb.control(data.name,[Validators.required]),
        email: this.fb.control(data.email,[Validators.required,Validators.email]),
        userName: this.fb.control(data.userName,[Validators.required]),
        gender: this.fb.control(data.gender),
        hometown: this.fb.control(data.homeTown),
        birthDay: this.fb.control(formatDate(data.birthDay, 'yyyy-MM-dd', 'en')),
        password: this.fb.control('',[
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
        phoneNumber: this.fb.control(data.phoneNumber,[Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]),
    });
  }
  public getUserById(): void {
    this.userService.getUserById(this.id).subscribe((data)=>{
      this.selectedUser = data;
      console.log('data:'+JSON.stringify(data));
      this.setFormData(this.selectedUser);
    });

  }
}
