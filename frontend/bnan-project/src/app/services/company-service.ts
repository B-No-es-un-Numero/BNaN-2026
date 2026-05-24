import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/companias/';

  getCompanyList() {
    return this.http.get(this.apiUrl);
  }

  getCompanyById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCompany(company: any) {
    return this.http.post(this.apiUrl, company);
  }

  updateCompany(id: number, company: any) {
    return this.http.put(`${this.apiUrl}/${id}`, company);
  }

  deleteCompany(id: number, hard: boolean = false) {
    return this.http.delete(
      `${this.apiUrl}/${id}?hard=${hard}`
    );
  }

}