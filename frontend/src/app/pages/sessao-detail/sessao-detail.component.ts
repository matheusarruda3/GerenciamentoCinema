import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Sessao } from '../../models/sessao.model';

@Component({
  standalone: true,
  selector: 'app-sessao-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './sessao-detail.component.html',
  styleUrls: ['./sessao-detail.component.scss']
})
export class SessaoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  sessao?: Sessao;
  idSessao!: number;
  reservados: number[] = [];
  assentoSelecionado: number | null = null;

  feedback = '';
  ok = false;

  ngOnInit(): void {
    this.idSessao = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getSessao(this.idSessao).subscribe({
      next: (s) => {
        this.sessao = Array.isArray(s) ? s[0] : s;
        this.carregarReservas();
      },
      error: () => this.mostrarMsg('Erro ao carregar sessão', false)
    });
  }

  carregarReservas() {
  if (!this.sessao) return;

  this.api.getAssentosReservados(this.idSessao).subscribe({
    next: (lista) => {
      this.reservados = lista;
      console.log('Assentos reservados:', lista);
    },
    error: (err) => {
      console.error('Erro ao carregar assentos reservados', err);
    }
  });
}



  selecionarAssento(numero: number) {
    if (this.reservados.includes(numero)) {
      this.mostrarMsg('Esse assento já está reservado', false);
      return;
    }
    this.assentoSelecionado = numero;
  }

  confirmarReserva() {
    if (!this.assentoSelecionado) return;

    this.api.reservarAssento(this.idSessao, this.assentoSelecionado).subscribe({
      next: () => {
        this.reservados.push(this.assentoSelecionado!);
        this.mostrarMsg(`Assento ${this.assentoSelecionado} reservado com sucesso!`, true);
        this.assentoSelecionado = null;
      },
      error: () => this.mostrarMsg('Erro ao reservar assento', false)
    });
  }

  cancelarSelecao() {
    this.assentoSelecionado = null;
  }

  mostrarMsg(msg: string, sucesso: boolean) {
    this.feedback = msg;
    this.ok = sucesso;
    setTimeout(() => (this.feedback = ''), 2500);
  }
}
