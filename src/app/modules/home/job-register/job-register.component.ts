import { Component, ViewChild, OnInit } from '@angular/core';
import {jobRegisterModel} from '../../../@core/models/jobRegister.model';
import {JobRegisterServiceService} from '../../../@core/services/job-register-service.service';

@Component({
  selector: 'ngx-job-register',
  templateUrl: './job-register.component.html',
  styleUrls: ['./job-register.component.scss'],
})
export class JobRegisterComponent implements OnInit {
  datas:jobRegisterModel[]=[];

  constructor(private jobRegisterService: JobRegisterServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.jobRegisterService.getAll().subscribe((res:any)=>{
      console.log(res);
      this.datas = res;
    });
  }

}
