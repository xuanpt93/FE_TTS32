import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../@core/services/user.service';

@Component({
  selector: 'ngx-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  public selectedUser: any;
  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUserById();
  }

  public getUserById(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe(
      res => {
        this.selectedUser = res;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
}
