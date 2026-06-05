export interface Company {
  id: number;
  name: string;
  cuit: string;
  phone: string;
  email: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyRequest {
  name: string;
  cuit: string;
  email: string;
  phone: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  cuit?: string;
  email?: string;
  phone?: string;
  enabled?: boolean;
}
