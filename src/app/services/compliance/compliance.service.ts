import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {
  private baseUrl = 'http://localhost:8080/api/v1/user/compliance';

  constructor(private http: HttpClient) { }

  getComplianceForUser(userId: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.baseUrl}/${userId}`, { headers });
  }
  updateComplianceResponse(complianceId: number, response: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.baseUrl}/${complianceId}`, response, { headers });
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
