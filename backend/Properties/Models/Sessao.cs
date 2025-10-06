using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Cinema.Properties.Enums;

namespace Cinema.Properties.Models;


[Table("sessoes")]
public class Sessao
{
    
    [Key]
    public int Id { get; set; }
    
  
    
    public int Capacidade  { get; set; }
    
    public string? NomeFilme { get; set; }
    
    
    public SessaoStatus SessaoStatus { get; set; }
    
    public DateTime DataHora { get; set; }
    
    public string? Sala{ get; set; }
    
    public int DuracaoMinutos { get; set; }












}