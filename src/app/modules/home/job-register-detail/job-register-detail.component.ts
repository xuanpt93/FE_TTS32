import { Component, OnInit } from '@angular/core';
import {JobRegisterServiceService} from '../../../@core/services/job-register-service.service';
import {jobRegisterModel} from '../../../@core/models/jobRegister.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-job-register-detail',
  templateUrl: './job-register-detail.component.html',
  styleUrls: ['./job-register-detail.component.scss']
})
export class JobRegisterDetailComponent implements OnInit {
  data:jobRegisterModel;

  constructor(private router: ActivatedRoute, private jobRegisterServiceService: JobRegisterServiceService) { }

  ngOnInit(): void {
    this.getById(this.router.snapshot.params['id']);
  }

  getById(id:any){
    this.jobRegisterServiceService.getById(id).subscribe((res:any)=>{
      this.data=res;
      console.log(this.data);
    });
  }
}
