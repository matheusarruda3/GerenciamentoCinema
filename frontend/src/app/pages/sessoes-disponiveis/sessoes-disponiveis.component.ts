import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Sessao } from '../../models/sessao.model';

@Component({
  standalone: true,
  selector: 'app-sessoes-disponiveis',
  imports: [CommonModule],
  templateUrl: './sessoes-disponiveis.component.html',
  styleUrls: ['./sessoes-disponiveis.component.scss']
})
export class SessoesDisponiveisComponent implements OnInit {
  private api = inject(ApiService);
  sessoes: Sessao[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.api.getSessoesDisponiveis().subscribe({
      next: (data) => {
        this.sessoes = data;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar sessões disponíveis.';
        this.carregando = false;
      }
    });
  }
}
