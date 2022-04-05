import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../@core/models/user';
import { UserService } from '../../../@core/services/user.service';
import {PaginatorModule} from 'primeng/paginator';

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
  pageSizes = [3, 6, 9];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    //this.getUser();
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
    this.sPageSize = 3;
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
    });
  }

  onActive(username: string){
    this.userService.active(username).subscribe((data: any) => {
      console.log(data);
      this.onSearch();
    });

  }

  paginate(event: any) {
    this.sPageNumber = event.page;
    this.sPageSize = event.rows;
  }

  // getUser(){
  //   this.userService.getUser().subscribe((data: any[])=>{
  //     this.users = data;
  //     this.totalRecords = data.length;
  //   });
  // }
  retrieveTutorials() {
    this.onSearch();
    // this.search(this.search)
    //   .subscribe((data: any[]) =>{
    //     this.users = data;
    //   });
  }
  handlePageChange(event) {
    this.sPageNumber = event;
    this.retrieveTutorials();
  }
  handlePageSizeChange(event) {
    this.sPageSize = event.target.value;
    this.sPageNumber = 1;
    this.retrieveTutorials();
  }
}
