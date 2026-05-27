import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, CreateCompanyRequest, UpdateCompanyRequest } from '../../model/company.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly baseUrl = `${environment.apiUrl}/companias/`;
  private http = inject(HttpClient);

  getCompanyList(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}${id}/`);
  }

  createCompany(company: CreateCompanyRequest): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, company);
  }

  updateCompany(id: number, company: UpdateCompanyRequest): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}${id}/`, company);
  }

  deleteCompany(id: number, hard: boolean = false): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/?hard=${hard}`);
  }
}
