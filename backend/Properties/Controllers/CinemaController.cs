using Cinema.Properties.DTO;
using Cinema.Properties.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Properties.Controllers;



[ApiController]
[Route("[controller]")]
public class CinemaController : ControllerBase
{
    private readonly ICinemaService cinemaService;

    public CinemaController(ICinemaService cinemaService)
    {
        this.cinemaService = cinemaService;
    }

    [HttpPost("criar-sessao")]
    public async Task<IActionResult> CriarSessao([FromBody] SessaoDTO data, CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await cinemaService.CreateAsync(data, ct);
        return Ok();
    }

    [HttpDelete("remover-sessao/{id}")]
    public async Task<IActionResult> RemoverSessao(int id, CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        await cinemaService.DeleteAsync(id, ct);
        return Ok();
        
    }

    [HttpPut("atualizar-sessao/{id}")]
    public async Task<IActionResult> AtualizarSessao(int id, [FromBody] SessaoDTO data, CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        await cinemaService.UpdateAsync(id, data, ct);
        return Ok();
    }

    [HttpGet("receber-sessoes")]
    public async Task<IActionResult> ReceberSessoes(CancellationToken ct)
    {
        var sessoes = await cinemaService.getAllAsync(ct);
        return Ok(sessoes);
    }


    [HttpGet("receber-sessoes-ativas")]
    public async Task<IActionResult> ReceberAtivas(CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var sessoes =  await cinemaService.getByDisponibilidade(ct);
        return Ok(sessoes);
    }

    [HttpPost("reservar-assento/{id}/{numero}")]
    public async Task<IActionResult> ReservarAssento(int id, int numero, CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        await cinemaService.reservarAssentoAsync(numero, id, ct);
        return Ok();
    }

    [HttpGet("consultar-ocupacao/{id}/{numero}")]
    public async Task<IActionResult> ConsultarOcupacao(int id, int numero, CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var status = await cinemaService.consultarOcupacaoAsync(id, numero, ct);
        return Ok(status.ToString());
    }

    [HttpGet("receber-sessao/{id}")]
    public async Task<IActionResult> ReceberSessao(int id, CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var sessao =  await cinemaService.getByIdAsync(id, ct);
        return Ok(sessao);
    }

    [HttpGet("assentos-reservados/{idSessao}")]
    public async Task<IActionResult> AssentosReservados(int idSessao, CancellationToken ct)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var reservados = await cinemaService.GetAssentosReservados(idSessao,ct);
        
        return Ok(reservados);
    }

    
}