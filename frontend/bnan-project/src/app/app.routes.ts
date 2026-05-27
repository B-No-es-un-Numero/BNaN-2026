import { Routes } from '@angular/router';
import { Home } from './pages/landing/home/home';
import { About } from './pages/about/about';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { ClientListView } from './pages/user-dashboard/client/client-list-view/client-list-view';
import { ClientDetailView } from './pages/user-dashboard/client/client-detail-view/client-detail-view';
// import { ClientForm } from './pages/user-dashboard/client-form/client-form';
import { UsersView } from './pages/user-dashboard/user/users-view/users-view';
import { UserForm } from './pages/user-dashboard/user/user-form/user-form';
import { Login } from './pages/auth/login/login';
import { TeamMemberDetail } from './pages/team-member-detail/team-member-detail';
import { CompanyListView } from './pages/user-dashboard/company/company-list-view/company-list-view';
import { CompanyDetailView } from './pages/user-dashboard/company/company-detail-view/company-detail-view';
import { CompanyForm } from './pages/user-dashboard/company/company-form/company-form';


export const routes: Routes = [
  { path: "iniciar-sesion", component: Login },
  {
    path: 'dashboard',
    component: UserDashboard,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      { path: 'clientes', component: ClientListView },
      { path: 'clientes-detalle/:id', component: ClientDetailView },
      { path: 'usuarios', component: UsersView },
      { path: 'usuarios-form/:id?', component: UserForm },
      { path: 'empresas', component: CompanyListView},
      { path: 'empresas-detalle/:id', component: CompanyDetailView },
      { path: 'empresas-form/:id?', component: CompanyForm },
    ],
  },
  { path: '', component: Home },
  { path: 'about', component: About },
  {path: 'about/:id',component: TeamMemberDetail},
];
