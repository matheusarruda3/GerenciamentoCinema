import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sessao, SessaoCreateDTO } from '../models/sessao.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;


  getSessoes(): Observable<Sessao[]> {
    return this.http.get<Sessao[]>(`${this.base}/Cinema/receber-sessoes`);
  }

 getSessoesDisponiveis(): Observable<Sessao[]> {
  return this.http.get<Sessao[]>(`${this.base}/Cinema/receber-sessoes-ativas`);
}


  
  getSessao(id: number): Observable<Sessao> {
    return this.http.get<Sessao>(`${this.base}/Cinema/receber-sessao/${id}`);
  }

 criarSessao(data: any) {
  return this.http.post(`${this.base}/Cinema/criar-sessao`, data);
}

atualizarSessao(id: number, data: any) {
  return this.http.put(`${this.base}/Cinema/atualizar-sessao/${id}`, data);
}


  removerSessao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/Cinema/remover-sessao/${id}`);
  }

  reservarAssento(idSessao: number, numero: number): Observable<void> {
    return this.http.post<void>(`${this.base}/Cinema/reservar-assento/${idSessao}/${numero}`, {});
  }

  consultarOcupacao(idSessao: number, numero: number): Observable<string> {
    return this.http.get<string>(`${this.base}/Cinema/consultar-ocupacao/${idSessao}/${numero}`);
  }

  getAssentosReservados(idSessao: number) {
  return this.http.get<number[]>(`${this.base}/Cinema/assentos-reservados/${idSessao}`);
}

}
