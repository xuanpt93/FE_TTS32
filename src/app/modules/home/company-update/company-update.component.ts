import { Component, OnInit } from '@angular/core';
import {Company} from "../../../@core/models/company";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../@core/services/user.service";
import {CompanyService} from "../../../@core/services/company.service";

@Component({
  selector: 'ngx-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss']
})
export class CompanyUpdateComponent implements OnInit {

  public company: Company

  id: number;
  name: string;
  email: string;
  hotLine: number;
  dateIncoporation: Date;
  taxCode: string;
  taxDate: Date;
  taxPlace: string;
  headOffice: string;
  numberStaff: string;
  linkWeb: string;
  description: string;
  avatar: string;
  backdropImg: string;

  rfContact: FormGroup;

  constructor(private fb: FormBuilder,    public route: ActivatedRoute,
              private companyService: CompanyService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.rfContact = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      jobPositionId: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      hotLine: ['', [Validators.required, Validators.minLength(3)]],
      dateIncoporation: ['', [Validators.required, Validators.minLength(3)]],
      taxCode: ['', [Validators.required, Validators.minLength(3)]],
      taxDate: ['', [Validators.required, Validators.minLength(3)]],
      taxPlace: ['', [Validators.required, Validators.minLength(3)]],
      headOffice: ['', [Validators.required, Validators.minLength(3)]],
      numberStaff: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      linkWeb: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public getinnitData(){
    this.id = this.company.id;
    this.name = this.company.name;
    this.email = this.company.email;
    this.hotLine = this.company.hotLine;
    this.dateIncoporation = this.company.dateIncoporation;
    this.taxCode = this.company.taxCode;
    this.taxDate = this.company.taxDate;
    this.taxPlace = this.company.taxPlace;
    this.headOffice = this.company.headOffice;
    this.numberStaff = this.company.numberStaff;
    this.description = this.company.description;
    this.linkWeb = this.company.linkWeb;
  }

  public getCompany(): void {
    this.companyService.getCompany().subscribe(
      (data: any) => {
        this.company = data[0];
        this.getinnitData();
        console.log('company)',this.company);
      },
    );
  }

  private updateCompany() {
    console.log('contact'+this.rfContact.value);
    this.company = this.rfContact.value;
    this.backdropImg = "khong co";
    this.avatar = 'khong co'
    this.companyService.updateCompany(this.company).subscribe(
      (data: any) => {
        alert('cập nhật thành công');
      },
    );
  }

  onSubmit(){
    this.updateCompany();
    // Do something awesome
    // this.router.navigate(['/home/job']).then(r => console.log(r));
  }

}
