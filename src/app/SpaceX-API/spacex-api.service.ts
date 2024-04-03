// spacex-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpacexApiService {

  private baseURL = 'https://api.spacexdata.com/v3';

  constructor(private http: HttpClient) { }

  getLaunches(): Observable<any> {
    return this.http.get(`${this.baseURL}/launches`);
  }

  getLaunchDetails(flightNumber: number): Observable<any> {
    return this.http.get(`${this.baseURL}/launches/${flightNumber}`);
  }

  getLaunchesByYear(year: string): Observable<any> {
    return this.http.get(`${this.baseURL}/launches?launch_year=${year}`);
  }

}