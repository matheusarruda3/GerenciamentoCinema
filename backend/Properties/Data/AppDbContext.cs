using Cinema.Properties.Enums;
using Cinema.Properties.Models;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Properties.Data;

public class AppDbContext: DbContext
{
    
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<AssentoSessao> Assento { get; set; }
    public DbSet<Sessao> Sessao { get; set; }
   
    
}