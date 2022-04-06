import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../@core/models/user';
import { UserService } from '../../../@core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  searchUserForm: FormGroup;
  public uer: any;
  public users: User[];
  public sUserName: string;
  public sName: string;
  public sEmail: string;
  public sPageNumber: number;
  public sPageSize: number;
  totalRecords: number;
  search: any;
  first = 0;
  btnDisable: true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private routes: Router,
  ) { }

  ngOnInit(): void {
    const role = this.userService.getDecodedAccessToken().auth;
    if(role !== 'ROLE_ADMIN'){
      alert('Bạn không thể sử dụng chức năng này');
      this.routes.navigate(['/home/']);
    }
    this.searchUserForm = this.fb.group({
      fullName: this.fb.control(''),
      email: this.fb.control(''),
      userName: this.fb.control(''),
    });
    this.initData();
    this.onSearch();

  }

  initData(){
    this.sName = '';
    this.sUserName = '';
    this.sEmail = '';
    this.sPageNumber = 1;
    this.sPageSize = 5;
  }

  onSearch(){
    const search = {
      name: this.searchUserForm.controls.fullName.value,
      userName: this.searchUserForm.controls.userName.value,
      email: this.searchUserForm.controls.email.value,
      pageNumber: this.sPageNumber,
      pageSize: this.sPageSize};
    this.userService.search(search).subscribe((data: any[]) =>{
      this.users = data;
      if(data.length === this.sPageSize){
        this.totalRecords = (this.sPageNumber+1) * this.sPageSize;
      }else{
        this.totalRecords = (this.sPageNumber) * this.sPageSize;
      }
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    });
  }

  onActive(username: string){
    this.userService.active(username).subscribe((data: any) => {
      this.onSearch();
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    });
  }

  paginate(event: any) {
    this.sPageNumber = event.page;
    this.sPageSize = event.rows;
  }

  getUser(){
    this.userService.getUser().subscribe((data: any[])=>{
      this.users = data;
      this.totalRecords = data.length;
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    });
  }

  handlePageSizeChange(event) {
    this.sPageSize = event.rows;
    this.sPageNumber = event.page+1;
    this.onSearch();
  }
}
