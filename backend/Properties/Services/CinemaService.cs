using Cinema.Properties.Data;
using Cinema.Properties.DTO;
using Cinema.Properties.Enums;
using Cinema.Properties.Models;
using Cinema.Properties.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Properties.Services;

public class CinemaService : ICinemaService
{
    
    private readonly AppDbContext _context;

    public CinemaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Sessao>> getAllAsync(CancellationToken ct)
    {
        var sessoes = await _context.Sessao.ToListAsync(ct);
        return sessoes; 
    }


    public async Task<List<Sessao>> getByDisponibilidade(CancellationToken ct)
    {
        var sessoes = await _context.Sessao.AsNoTracking().Where(s => s.SessaoStatus== SessaoStatus
            .DISPONIVEL).ToListAsync(ct);
        if (sessoes.Count == 0)
            throw new Exception ("Nenhuma sessão disponivel.");
        
        return sessoes;
    }

    public async Task CreateAsync(SessaoDTO data,CancellationToken ct)
    {
        var sessao = new Sessao
        {
            NomeFilme = data.NomeFilme,
            Sala = data.Sala,
            Capacidade = data.Capacidade,
            DataHora = DateTime.SpecifyKind(data.DataHora, DateTimeKind.Utc),
            DuracaoMinutos = data.DuracaoMinutos,
            SessaoStatus = data.Status
        };
        await _context.Sessao.AddAsync(sessao,ct);
        await _context.SaveChangesAsync(ct);
        
        
    }

    public async Task UpdateAsync(int id, SessaoDTO data,CancellationToken ct)
    {
        var sessao = await _context.Sessao.FindAsync(new object[]{id},ct);
        
        if (sessao == null)
            throw new Exception ("Nehuma sessão encontrada.");
        sessao.NomeFilme = data.NomeFilme;
        sessao.Sala = data.Sala;
        sessao.Capacidade = data.Capacidade;
        sessao.DataHora = data.DataHora;
        sessao.DuracaoMinutos = data.DuracaoMinutos;
        sessao.SessaoStatus = data.Status;
        await _context.SaveChangesAsync(ct);

    }

    public async Task DeleteAsync(int id,CancellationToken ct)
    {
        var sessao = await _context.Sessao.FindAsync(new object[]{id},ct);
        
        if (sessao == null)
            throw new Exception("Nenhuma sessão encontrada.");
        _context.Sessao.Remove(sessao);
        await _context.SaveChangesAsync(ct);
        
    }

    public async Task reservarAssentoAsync(int numeroAssento, int idSessao,CancellationToken ct)
    {   
        
        var sessao = await _context.Sessao.FindAsync(new object[] { idSessao }, ct);
        if (sessao == null)
            throw new Exception("Sessão não encontrada.");

        if (numeroAssento < 1 || numeroAssento > sessao.Capacidade)
            throw new Exception("Número de assento inválido.");

        
        var assento = await _context.Assento
            .FirstOrDefaultAsync(a => a.SessaoId == idSessao && a.Numero == numeroAssento, ct);

        if (assento != null)
        {
            if (assento.Status == Status.RESERVADO)
                throw new Exception("Assento já reservado.");

            
            assento.Status = Status.RESERVADO;
            _context.Assento.Update(assento);
        }
        else
        {
            
            assento = new AssentoSessao
            {
                SessaoId = idSessao,
                Numero = numeroAssento,
                Status = Status.RESERVADO
            };
            await _context.Assento.AddAsync(assento, ct);
        }

        await _context.SaveChangesAsync(ct);
    }

   public async Task<Status> consultarOcupacaoAsync(int numeroAssento, int idSessao, CancellationToken ct)
    {
        
        var assento = await  _context.Assento.FirstOrDefaultAsync(a=> a.SessaoId == idSessao && a.Numero == numeroAssento, ct );
        
        if (assento == null)
            return Status.DISPONIVEL;
        
        return assento.Status;
    }
   
    public async Task<Sessao?> getByIdAsync(int id, CancellationToken ct)
    {
        return await _context.Sessao.FirstOrDefaultAsync(s => s.Id == id, ct);
    }

    public async Task <List<int>> GetAssentosReservados(int idSessao, CancellationToken ct)
    {
        var assentos = await   _context.Assento.Where(a => a.SessaoId == idSessao 
                                                           && a.Status== Status.RESERVADO).
            Select(a=>a.Numero).ToListAsync(ct);
        
        return assentos;
    }
    
   
    
    
    
    
    
}