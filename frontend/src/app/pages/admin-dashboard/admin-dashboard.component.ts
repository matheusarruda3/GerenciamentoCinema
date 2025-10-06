import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Sessao } from '../../models/sessao.model';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  sessoes: Sessao[] = [];

  ngOnInit(): void {
    this.api.getSessoes().subscribe({
      next: (res) => (this.sessoes = res),
      error: () => console.error('Erro ao carregar sessões.')
    });
  }

  removerSessao(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta sessão?')) return;
    this.api.removerSessao(id).subscribe({
      next: () => {
        this.sessoes = this.sessoes.filter(s => s.id !== id);
      },
      error: () => alert('Erro ao remover sessão.')
    });
  }

  verAssentos(id: number) {
    this.router.navigate(['/sessao', id]); 
  }
  statusLabel(status: number): string {
  switch (status) {
    case 0: return 'Disponível';
    case 1: return 'Cancelada';
    case 2: return 'Em Andamento';
    case 3: return 'Finalizada';
    default: return 'Desconhecida';
  }
}

}
