import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefinedContribution } from 'src/app/models/definedcontribution';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class DefinedContributionService {

  private baseUrl = 'http://localhost:8080/api/v1/user/defined-contributions';

  constructor(private http: HttpClient) { }

  createDefinedContribution(definedContributionDto: any): Observable<DefinedContribution> {
    const url = `${this.baseUrl}/create`;
    const headers = this.createHeaders();
    return this.http.post<DefinedContribution>(url, definedContributionDto, { headers });
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
