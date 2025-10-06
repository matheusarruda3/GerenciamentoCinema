import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { SessaoFormComponent } from './pages/sessao-form/sessao-form.component';
import { SessaoDetailComponent } from './pages/sessao-detail/sessao-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'sessao/nova', component: SessaoFormComponent },
  { path: 'sessao/editar/:id', component: SessaoFormComponent },
  { path: 'sessao/:id', component: SessaoDetailComponent },

  
  {
    path: 'sessoes/disponiveis',
    loadComponent: () =>
      import('./pages/sessoes-disponiveis/sessoes-disponiveis.component')
        .then(m => m.SessoesDisponiveisComponent)
  }, 

  { path: '**', redirectTo: 'admin' }
  
];
