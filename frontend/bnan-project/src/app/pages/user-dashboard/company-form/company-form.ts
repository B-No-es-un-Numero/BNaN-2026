import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../../services/company-service';

@Component({
  selector: 'app-company-form',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './company-form.html',
})

export class CompanyForm {

  private fb = inject(FormBuilder);
  private companyService = inject(CompanyService);

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
          alert('La empresa se registró exitosamente');
          this.form.reset();
        },
        error: (error) => { console.error(error); }
      });
  }
}