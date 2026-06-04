export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  client_name: string;
  assigned_user_name: string;
  assigned_user_id: number;
  client_id: number;
}