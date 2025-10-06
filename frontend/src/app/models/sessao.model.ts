export enum SessaoStatus {
  Ativa = 0,
  Encerrada = 1,
  Cancelada = 2,
  EmAndamento = 3
}

export enum StatusAssento {
  DISPONIVEL = 0,
  RESERVADO = 1
}

export interface Sessao {
  id: number;
  nomeFilme: string;
  sala: string;
  dataHora: string;
  duracaoMinutos: number;
  capacidade: number;
  sessaoStatus: SessaoStatus;
}

export interface SessaoCreateDTO {
  nomeFilme: string;
  sala: string;
  capacidade: number;
  dataHora: string;
  duracaoMinutos: number;
  sessaoStatus: SessaoStatus;
}



