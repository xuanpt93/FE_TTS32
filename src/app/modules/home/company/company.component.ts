import { Component, OnInit } from '@angular/core';
import {Company} from "../../../@core/models/company";
import {HttpErrorResponse} from "@angular/common/http";
import {JobSearch, SearchJob} from "../../../@core/models/searchJob";
import {FormBuilder} from "@angular/forms";
import {CompanyService} from "../../../@core/services/company.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public company: Company;
  constructor(public fb: FormBuilder, public companyService: CompanyService,private readonly route: ActivatedRoute,private readonly router: Router) { }


  ngOnInit(): void {
    this.getCompany()
  }

  public getCompany(): void {
    this.companyService.getCompany().subscribe(
      (data: any) => {
        this.company = data[0];
        console.log('company)',this.company);
      },
    );
  }

  onUpdate(){
    this.router.navigate(['admin/update-company']);
  }




}
