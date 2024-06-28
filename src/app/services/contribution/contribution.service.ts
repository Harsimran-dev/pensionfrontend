import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '../store/store.service';


@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private apiUrl = 'http://localhost:8080/api/v1/user/contribution';

  constructor(private http: HttpClient) { }

  createContribution(userId: number, contributionData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = this.createHeaders();
    return this.http.post<any>(url, contributionData, { headers });
  }

  getContributionByUserId(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = this.createHeaders();
    return this.http.get<any>(url, { headers });
  }
  updateContribution(userId: number, contributionData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = this.createHeaders();
    return this.http.put<any>(url, contributionData, { headers });
  }

  private createHeaders(): HttpHeaders {
    const token = StoreService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
