import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  dbImage: any;
  postResponse: any;
  image: any;
  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.viewImage();
  }

  viewImage() {
    this.image = localStorage.getItem('user')
    this.httpClient.get('http://localhost:9090/api/public/get/image/info/3.jpg')
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        },
      );
  }

}
