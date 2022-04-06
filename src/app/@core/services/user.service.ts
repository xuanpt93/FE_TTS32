import jwt_decode from 'jwt-decode';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root',
})

export class UserService{


  // private apiServerUrl = environment.apiUrl;

  // constructor(private http: HttpClient) {
  // }

  getDecodedAccessToken(): any {
    const token = sessionStorage.getItem('auth-token');
    try {
      console.log(jwt_decode(token));
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public getUserByUserName(userName: string): Observable<User> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/username='+userName).pipe(
      tap(user => console.log(`user=${JSON.stringify(user)}`)),
    );
  }


  public getJe(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/role=2').pipe(
      tap(jobPositions => console.log(`academicLevels=${JSON.stringify(jobPositions)}`)),
    );
  }

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient){
  }
  public getUser(): Observable<User[]>{
    return this.http.get<any>(`${this.apiServerUrl}public/user`);
    // .pipe(
    //   tap(user => console.log(`receiveduser=${JSON.stringify(user)}`)),
    // );
  }
  public search(s: any): Observable<User[]>{
    return this.http.post<any>(`${this.apiServerUrl}public/user/search`,s);
  }
  public getUserById(id: number): Observable<any>{
    const url = `${this.apiServerUrl}` + 'public/user/' + `${id}`;
    console.log('url: '+url);
    return this.http.get<any>(url);
  }


}
