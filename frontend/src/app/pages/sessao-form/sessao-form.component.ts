import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Sessao, SessaoCreateDTO } from '../../models/sessao.model';

@Component({
  standalone: true,
  selector: 'app-sessao-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sessao-form.component.html',
  styleUrls: ['./sessao-form.component.scss']
})
export class SessaoFormComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEdit = false;
  idSessao!: number;
  feedback = '';

  form: SessaoCreateDTO = {
    nomeFilme: '',
    sala: '',
    capacidade: 0,
    duracaoMinutos: 0,
    dataHora: '',
    sessaoStatus: 0
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.idSessao = Number(id);

      this.api.getSessao(this.idSessao).subscribe({
        next: (s) => {
          const sessao = Array.isArray(s) ? s[0] : s;
          if (sessao) {
            this.form = {
              nomeFilme: sessao.nomeFilme,
              sala: sessao.sala,
              capacidade: sessao.capacidade,
              duracaoMinutos: sessao.duracaoMinutos,
              dataHora: sessao.dataHora,
              sessaoStatus: sessao.sessaoStatus
            };
          } else {
            this.feedback = 'Sessão não encontrada.';
          }
        },
        error: () => (this.feedback = 'Erro ao carregar sessão.')
      });
    }
  }

  atualizarCapacidade() {
    if (['1', '2', '3'].includes(this.form.sala)) {
      this.form.capacidade = 300;
    } else if (['4', '5'].includes(this.form.sala)) {
      this.form.capacidade = 250;
    } else {
      this.form.capacidade = 0;
    }
  }

  cancelar() {
    this.router.navigate(['/admin']);
  }

  salvar() {
    // 🧩 Converte o campo sessaoStatus → status antes de enviar
    const payload = {
      nomeFilme: this.form.nomeFilme,
      sala: this.form.sala,
      capacidade: this.form.capacidade,
      duracaoMinutos: this.form.duracaoMinutos,
      dataHora: this.form.dataHora,
      status: Number(this.form.sessaoStatus) // 👈 backend espera "Status"
    };

    if (this.isEdit) {
      this.api.atualizarSessao(this.idSessao, payload).subscribe({
        next: () => {
          alert('Sessão atualizada com sucesso!');
          this.router.navigate(['/admin']);
        },
        error: () => alert('Erro ao atualizar sessão.')
      });
    } else {
      this.api.criarSessao(payload).subscribe({
        next: () => {
          alert('Sessão criada com sucesso!');
          this.router.navigate(['/admin']);
        },
        error: () => alert('Erro ao criar sessão.')
      });
    }
  }
}
