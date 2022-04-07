import { Component, OnInit } from '@angular/core';
import {Job} from '../../../@core/models/job';
import {JobService} from '../../../@core/services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import {StatusJob} from '../../../@core/models/statusJob';
import {SelectItem} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {JobSearch, SearchJob} from '../../../@core/models/searchJob';
import {User} from '../../../@core/models/user';
import {JobDTO} from '../../../@core/models/jobDTO';
import {FormBuilder} from '@angular/forms';
import {saveAs} from 'file-saver';
import * as http from 'http';
import * as fs from 'file-saver';


@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {

  formSeachJob = this.fb.group({
    name: '',
    salaryMax: '',
    salaryMin: '',
    statusId:'',
  });

  public jobs: Job[];
  user: User;
  statusJobs: any[];
  jobDto: JobDTO;
  public  job: Job;

  selectedStatusJobAdvanced: any;

  filteredStatusJobs: any[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  sortKey: any;
  page: number;
  size: number;
  totalRecords: number;
  sortNumber: number;
  mess: number;

  chooseOptions: SelectItem[];

  constructor(public jobService: JobService,
              private readonly router: Router,
              public route: ActivatedRoute,
              public fb: FormBuilder,
              private jd: JobService) {
  }

  ngOnInit(): void {
    this.getStatusJob();
    this.sortOptions = [
      {label: 'Tên công việc', value: 'name'},
      {label: 'Lương', value: 'number'},
    ];
    this.getInnitData();
    this.onSearch();
    this.chooseOptions = [
      {label: 'đang tuyển', value: '1'},
      {label: 'chưa đăng tuyển', value: '2'},
      {label: 'chờ xét duyệt', value: '3'},
      {label: 'đã từ chối', value: '4'},
      {label: 'đã đóng', value: '5'},
      {label: 'không dang tuyển', value: '6'},
    ];
  }

  private createFromForm(): SearchJob {
    return {
      ...new JobSearch(),
      name: this.formSeachJob.get(['name'])!.value,
      salaryMin: this.formSeachJob.get(['salaryMin'])!.value,
      salaryMax: this.formSeachJob.get(['salaryMax'])!.value,
      statusId: this.formSeachJob.get(['statusId'])!.value,
    };
  }

  public onSearch() {
    console.log('is searching clicked');    ;
    console.log(this.createFromForm());
    // this.searchJob.statusId = this.selectedStatusJobAdvanced.id;
    this.jobService.findJob(this.createFromForm(), this.page, this.size).subscribe(
      (data: any) => {
        this.jobs = data.list;
        console.log(this.jobs);
        this.totalRecords = data.totalPage;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }


  getInnitData() {
    // this.selectedStatusJobAdvanced = {id: 1, code:'dang tuyen'};
    // this.searchJob = {name:'',statusId: 0 ,salaryMin:0,salaryMax:0};
    this.page = 0;
    this.size = 3;
    this.totalRecords = 5;
    this.sortNumber = 1;
  }

  public getStatusJob(): void {
    this.jobService.getStatusJob().subscribe(
      (data: StatusJob[]) => {
        this.statusJobs = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  onSortChange(event) {
    const value = event.value;
    console.log(value,value);

    if (value.indexOf('name') === 0) {
      this.sortNumber = 1;
      this.mess= 1;
    } else {
      this.sortNumber = 2;
      this.mess= 2;
    }
    this.onSortByName();
  }

  filterStatusJob(event) {
    const filtered: any[] = [];
    const query = event.query;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.statusJobs.length; i++) {
      const statusJob = this.statusJobs[i];
      if (statusJob.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(statusJob);
      }
    }
    this.filteredStatusJobs = filtered;
  }


  public onSortByName() {
    // this.searchJob.statusId = this.selectedStatusJobAdvanced.id;
    this.jobService.sortByName(this.mess,this.page, this.size).subscribe(
      (data: any) => {
        this.jobs = data.list;
        this.totalRecords = data.totalPage;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  paginate(event: any) {
    this.page = event.page;
    this.size = event.rows-1;
    if(this.sortNumber === 1){
      this.onSearch();
    } else {
      this.onSortByName();
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onExportJD(id: any) {
    this.jobService.getExportJD(id).subscribe(data => {
      const fileName = 'Job.pdf';
      const mediaType = 'application/pdf';
      const blob = new Blob([data], { type: mediaType });
      fs.saveAs(URL.createObjectURL(blob), fileName);

    });
  }


}
