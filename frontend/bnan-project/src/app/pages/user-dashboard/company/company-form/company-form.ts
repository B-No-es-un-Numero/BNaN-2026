import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../../../services/company-service';
import { Toast } from '../../../../shared/toast/toast/toast';

@Component({
  selector: 'app-company-form',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, Toast ],
  templateUrl: './company-form.html',
})

export class CompanyForm {

  private fb = inject(FormBuilder);
  private companyService = inject(CompanyService);

  toastOpen = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('success');

  showToast(message: string, type: 'success' | 'error' | 'info') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 4000);
  }

  form = this.fb.nonNullable.group({
    name: [ '', [ Validators.required, Validators.maxLength(50), ], ],
    cuil: [ '', [ Validators.required, Validators.pattern(/^\d{2}-?\d{8}-?\d$/), ], ],
    email: [ '', [ Validators.required, Validators.email, ], ],
    phone: [ '', [ Validators.pattern(/^\d+$/), ], ],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.companyService.createCompany(this.form.getRawValue())
      .subscribe({ next: () => {
          this.showToast('La empresa se registró exitosamente', 'success');
          this.form.reset();
        },
        error: (error) => { console.error(error); }
      });
  }
}