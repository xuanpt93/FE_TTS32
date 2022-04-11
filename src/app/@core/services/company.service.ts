import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../models/job";
import {tap} from "rxjs/operators";
import {JobDTO} from "../models/jobDTO";
import {Company} from "../models/company";

@Injectable({
  providedIn: 'root',
})
export class CompanyService{
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getCompany(): Observable<Job[]> {
    return this.http.get<any>(`${this.apiServerUrl}public/user/getall`).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public updateCompany(company: Company): Observable<any> {
    return this.http.put(`${this.apiServerUrl}`+'public/user/update-company',company).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }
}
