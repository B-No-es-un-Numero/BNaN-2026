export interface Client {
    id: number;
    name: string;
    email: string;
    dni: string;
    date_of_birth: string;
    phone: string;
    status: 'lead' | 'active' | 'closed';
    enabled: boolean;
    created_at: string;
    updated_at: string;
    company: number | null;
    responsible_user: number | null;
    company_name?: string;
    responsible_name?: string;
}

export interface ClientDetail {
  id: number;
  name: string;
  email: string;
  dni: string;
  date_of_birth: string;
  phone: string;
  status: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  company_name: string;
  responsible_name: string;
}

export interface CreateClientRequest {
    name: string;
    email: string;
    dni: string;
    date_of_birth: string;
    phone: string;
    status: 'lead' | 'active' | 'closed';
    company: number | null;
    responsible_user: number | null;
}