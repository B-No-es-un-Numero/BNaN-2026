import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../../services/company/company-service';
import { Company, CreateCompanyRequest } from '../../../../model/company.model';

@Component({
  selector: 'app-company-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-form.html',
})
export class CompanyForm implements OnInit {
  private fb = inject(FormBuilder);
  private companyService = inject(CompanyService);

  companyIdInput = input<number | null>(null);
  saved = output<void>();
  error = output<string>();
  canceled = output<void>();
  isEditMode = false;
  isCreating = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    cuit: ['', [Validators.required, Validators.pattern(/^\d{2}-?\d{8}-?\d$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d+$/)]],
  });

  ngOnInit(): void {
    const id = this.companyIdInput();
    if (id === null) {
      return;
    }
    this.isEditMode = true;

    this.companyService.getCompanyById(id).subscribe({
      next: (company: Company) => {
        this.form.patchValue({
          name: company.name,
          email: company.email,
          cuit: company.cuit,
          phone: company.phone ?? '',
        });
      },
      error: (error) => {
        this.error.emit('Error al buscar la empresa. Si persiste, comuníquese con administración.');
      },
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    const companyData = this.form.getRawValue() as CreateCompanyRequest;
    if (this.isEditMode && this.companyIdInput() !== null) {
      this.companyService.updateCompany(this.companyIdInput()!, companyData).subscribe({
        next: () => {
          this.saved.emit();
          this.isCreating.set(false);
        },
        error: (error) => {
          this.error.emit('Error al actualizar la empresa. Comuníquese con administración si persiste.');
          this.isCreating.set(false);
        },
      });
      return;
    }

    const payload: CreateCompanyRequest = this.form.getRawValue();
    this.companyService.createCompany(payload).subscribe({
      next: () => {
        this.saved.emit();
        this.form.reset();
        this.isCreating.set(false);
      },
      error: (error) => {
        this.error.emit(
          'Error al registrar la empresa. Si persiste, comuníquese con administración.'
        );
        this.isCreating.set(false);
      },
    });
  }

  onCancel(): void {
    this.canceled.emit();
  }
}
