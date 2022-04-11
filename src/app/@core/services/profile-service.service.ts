import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileModel} from "../models/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private readonly baseUrl = `${environment.apiUrl}public/profile/`;

  constructor(private http: HttpClient) { }

  getByUserId(id: number): Observable<ProfileModel>{
    return this.http.get<ProfileModel>(`${this.baseUrl}` + `${id}`).pipe();
  }
}
