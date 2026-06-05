import { Routes } from '@angular/router';
import { Home } from './pages/landing/home/home';
import { About } from './pages/about/about';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { ClientListView } from './pages/user-dashboard/client/client-list-view/client-list-view';
import { UsersView } from './pages/user-dashboard/user/users-view/users-view';
import { Login } from './pages/auth/login/login';
import { TeamMemberDetail } from './pages/team-member-detail/team-member-detail';
import { CompanyListView } from './pages/user-dashboard/company/company-list-view/company-list-view';
import { TasksView } from './pages/user-dashboard/tasks/tasks-view/tasks-view';
import { Register } from './pages/auth/register/register';
import { NotFound } from './shared/not-found/not-found';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: "iniciar-sesion", component: Login },
  { path: "registrarse", component: Register },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: UserDashboard,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      { path: 'clientes', component: ClientListView },
      { path: 'usuarios', component: UsersView },
      { path: 'empresas', component: CompanyListView},
      { path: 'tareas', component: TasksView},
    ],
  },
  { path: '', component: Home },
  { path: 'about', component: About },
  {path: 'about/:id',component: TeamMemberDetail},
  { path: '**', component: NotFound },
];
