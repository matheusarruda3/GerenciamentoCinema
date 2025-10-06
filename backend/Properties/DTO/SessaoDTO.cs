using Cinema.Properties.Enums;

namespace Cinema.Properties.DTO;

public record SessaoDTO( string NomeFilme, string Sala, int Capacidade, DateTime DataHora, int DuracaoMinutos , SessaoStatus Status );