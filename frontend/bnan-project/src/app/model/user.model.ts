export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    is_active: boolean;
    enabled: boolean;
    date_joined: string;
}  
export interface CreateUserRequest {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}