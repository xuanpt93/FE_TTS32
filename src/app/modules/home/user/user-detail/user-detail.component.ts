import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../@core/services/user.service';
import { User } from '../../../../@core/models/user';

@Component({
  selector: 'ngx-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  userDetailForm = this.fb.group({
    fullName:'',
    email:'',
    userName:'',
    birthDay:'',
    phoneNumber:'',
  });

  public selectedUser: User;
  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.getUserById();

  }

  setFormData(data: any){
    this.userDetailForm = this.fb.group({
      fullName: this.fb.control(data.name,[Validators.required]),
      email: this.fb.control(data.email,[Validators.required,Validators.email]),
      userName: this.fb.control(data.userName,[Validators.required]),
      birthDay: this.fb.control(data.birthDay),
      phoneNumber: this.fb.control(data.phoneNumber),
    });
  }
  public getUserById(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe((data)=>{
      this.selectedUser = data;
      this.setFormData(this.selectedUser);
    });

  }
}
