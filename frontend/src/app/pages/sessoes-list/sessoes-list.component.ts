import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Sessao } from '../../models/sessao.model';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sessoes-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './sessoes-list.component.html',
  styleUrls: ['./sessoes-list.component.scss'],
  providers: [DatePipe]
})
export class SessoesListComponent implements OnInit {
  private api = inject(ApiService);
  sessoes: Sessao[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    
    this.api.getSessoes().subscribe({

      next: (s) => { 
        this.sessoes = s; 
        this.loading = false; 
      },
      error: (e) => { 
        this.error = e?.error?.message ?? 'Erro ao carregar sessões'; 
        this.loading = false; 
      }
    });
  }
}
