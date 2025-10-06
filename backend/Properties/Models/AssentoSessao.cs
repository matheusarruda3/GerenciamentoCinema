using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Cinema.Properties.Enums;

namespace Cinema.Properties.Models;


[Table("assentos_sessoes")]
public class AssentoSessao
{
    [Key]
    public int Id { get; set; }
    
    public Status Status {get; set;}
    
    public int SessaoId { get; set; }
    
    public Sessao Sessao { get; set; }
    
   
    
    public int Numero{get; set;}
    
    

}