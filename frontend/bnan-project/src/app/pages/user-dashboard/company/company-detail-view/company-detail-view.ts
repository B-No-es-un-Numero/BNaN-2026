import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CompanyService } from '../../../../services/company-service';

interface CompanyDetail {

  id: number;
  name: string;
  cuil: string;
  phone: string;
  email: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;

}

@Component({
  selector: 'app-company-detail-view',
  imports: [RouterLink],
  templateUrl: './company-detail-view.html',
  styleUrl: './company-detail-view.css',
})

export class CompanyDetailView implements OnInit {

  private companyService = inject(CompanyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  company = signal<CompanyDetail>({} as CompanyDetail);

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      const id = Number(params['id']);

      this.companyService.getCompanyById(id)
        .subscribe({

          next: (response: any) => {

            this.company.set(response);

          },

          error: (error) => {

            console.error(error);

          }

        });

    });

  }

  deleteCompany(id: number): void {

    this.companyService.deleteCompany(id)
      .subscribe({

        next: () => {

          this.router.navigate(['/dashboard/empresas']);

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}