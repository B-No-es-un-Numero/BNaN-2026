import { Routes } from '@angular/router';
import { Home } from './pages/landing/home/home';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { ClientListView } from './pages/user-dashboard/client-list-view/client-list-view';
import { ClientDetailView } from './pages/user-dashboard/client-detail-view/client-detail-view';
import { ClientForm } from './pages/user-dashboard/client-form/client-form';

export const routes: Routes = [
  // { path: "registro", component: Register },
  // { path: "iniciar-sesion", component: Login },
  //{ path: "dashboard", component: DashboardLayout,
  //children: [
  //{ path: 'clients', component: Clients },
  //{ path: "clients/:id", component: ClientDetail },

  // Cuando este funcional, agregar un [AdminGuard]
  //{ path: "users", component: Users},
  //{ path: "users/:id", component: UserDetail },
  //{ path: "", redirectTo: "clients", pathMatch: "full" }
  //]
  //},
  {
    path: 'dashboard',
    component: UserDashboard,
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      { path: 'clientes', component: ClientListView },
      { path: 'clientes-detalle/:id', component: ClientDetailView },
      { path: 'clientes-form/:id?', component: ClientForm },
    ],
  },
  { path: '', component: Home },
  //{ path: "**", component: Page404 },
];
