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
    company_id: string;
    responsible_user_id: string;
    company_name?: string;
    responsible_name?: string;
}

export interface CreateClientRequest {
    name: string;
    email: string;
    dni: string;
    date_of_birth: string;
    phone: string;
    status: 'lead' | 'active' | 'closed';
    company_id: string;
    responsible_user_id: string;
}