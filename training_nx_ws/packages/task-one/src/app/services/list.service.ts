import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiURL = "https://randomuser.me/api/?results=30&?inc=name,gender,location,email,dob,registered,phone,picture";
  result: any;
  
  constructor(private http : HttpClient){}

  getElemnts(): Observable<any>{
    this.result = this.http.get<any>(`${this.apiURL}`);
    return this.result;
  }
}
