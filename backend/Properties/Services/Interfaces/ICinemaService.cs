using Cinema.Properties.DTO;
using Cinema.Properties.Enums;
using Cinema.Properties.Models;

namespace Cinema.Properties.Services.Interfaces;

public interface ICinemaService
{
    Task<List<Sessao>> getAllAsync(CancellationToken ct);

    Task<List<Sessao>> getByDisponibilidade(CancellationToken ct);
    
    Task CreateAsync(SessaoDTO data, CancellationToken ct);
    
    Task UpdateAsync (int id, SessaoDTO data,CancellationToken ct);
    
    Task DeleteAsync(int id, CancellationToken ct);

    Task reservarAssentoAsync(int numeroAssento, int idSessao,CancellationToken ct);

    Task<Status> consultarOcupacaoAsync(int idSessao, int numeroAssento, CancellationToken ct);

    Task<Sessao?> getByIdAsync(int id, CancellationToken ct);

    Task <List<int>> GetAssentosReservados(int idSessao, CancellationToken ct);
}