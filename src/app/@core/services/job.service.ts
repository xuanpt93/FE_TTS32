import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Job} from '../models/Job';
import {SearchJob} from '../models/searchJob';
import {JobDTO} from '../models/jobDTO';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getJob(): Observable<Job[]> {
    return this.http.get<any>(`${this.apiServerUrl}public/user/job/getall`).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public getJobById(id: number): Observable<any> {
    const url = `${this.apiServerUrl}` + 'public/user/job/' + `${id}`;
    return this.http.get<any>(url).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }



  public getJobAd(id: number): Observable<any> {
    const url = `${this.apiServerUrl}` + 'public/user/job/detail/' + `${id}`;
    return this.http.get<any>(url);
  }

  public findJob(name, statusJob, salaryMin, salaryMax,page,size): Observable<any> {
    // eslint-disable-next-line max-len
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/job/searchesT?'+'name='+name+'&statusJob='+statusJob+'&salaryMin='+salaryMin+'&salaryMax='+salaryMax+'&page='+page+'&size='+size).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public addJob(job: JobDTO): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'public/user/job/add-job',job).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }
  public updateJob(job: JobDTO): Observable<any> {
    return this.http.put(`${this.apiServerUrl}`+'public/user/job/update-job',job).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public sortByName(name, statusJob, salaryMin, salaryMax,page,size): Observable<any> {
    // eslint-disable-next-line max-len
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/job/sortByName?'+'name='+name+'&statusJob='+statusJob+'&salaryMin='+salaryMin+'&salaryMax='+salaryMax+'&page='+page+'&size='+size).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public getJobPosition(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/job/jobPositions').pipe(
      tap(jobPositions => console.log(`jobPositions=${JSON.stringify(jobPositions)}`)),
    );
  }

  public getWorkingForm(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/job/workingForms').pipe(
      tap(jobPositions => console.log(`workingForms=${JSON.stringify(jobPositions)}`)),
    );
  }

  public getAcademicLevels(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/job/academicLevels').pipe(
      tap(jobPositions => console.log(`academicLevels=${JSON.stringify(jobPositions)}`)),
    );
  }

  public getRanks(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/job/ranks').pipe(
      tap(jobPositions => console.log(`academicLevels=${JSON.stringify(jobPositions)}`)),
    );
  }

  public getStatusJob(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/job/statusJobs').pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }


}
