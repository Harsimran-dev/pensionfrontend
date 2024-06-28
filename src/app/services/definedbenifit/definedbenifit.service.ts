import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefinedBenefitPensionScheme } from 'src/app/models/definedbenefitpensionscheme';
import { StoreService } from '../store/store.service';


@Injectable({
  providedIn: 'root'
})
export class DefinedBenefitService {

  private baseUrl = 'http://localhost:8080/api/v1/user/defined-benefit-pension';

  constructor(private http: HttpClient) { }

  createDefinedBenefitPensionScheme(dto: any, inflationRate: number, taxRate: number, userId: number): Observable<DefinedBenefitPensionScheme> {
    const url = `${this.baseUrl}/create?inflationRate=${inflationRate}&taxRate=${taxRate}&userId=${userId}`;
    const headers = this.createHeaders();
    return this.http.post<DefinedBenefitPensionScheme>(url, dto, { headers });
  }

  getDefinedBenefitPensionSchemes(userId: number): Observable<DefinedBenefitPensionScheme[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    const headers = this.createHeaders();
    return this.http.get<DefinedBenefitPensionScheme[]>(url, { headers });
  }

  deleteDefinedBenefitPensionScheme(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    const headers = this.createHeaders();
    return this.http.delete<void>(url, { headers });
  }

  updateDefinedBenefitPensionScheme(dto: any, inflationRate: number, taxRate: number, userId: number): Observable<DefinedBenefitPensionScheme> {
    const url = `${this.baseUrl}/update?inflationRate=${inflationRate}&taxRate=${taxRate}&userId=${userId}`;
    const headers = this.createHeaders();
    return this.http.put<DefinedBenefitPensionScheme>(url, dto, { headers });
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
