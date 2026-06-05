export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  client_name: string;
  assigned_user_name: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  due_date: string;
  status: string;
  client: number;
  assigned_user: number;
}