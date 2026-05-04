import { Routes } from '@angular/router';
import { Home } from './pages/landing/home/home';

export const routes: Routes = [
    { path: "", component: Home },
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
    //{ path: "user", component: DashboardUser,
       //children: [
            //{ path: 'clients', component: Clients },
            //{ path: "clients/:id", component: ClientDetail }, 
        //]
    //},
    //{ path: "**", component: Page404 },

];
