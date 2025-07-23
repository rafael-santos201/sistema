using MeuSistemaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MeuSistemaApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }   
    }
}
