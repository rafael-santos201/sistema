namespace MeuSistemaApi.Models;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Usuarios")]
public class Usuario
{
    [Column("id")]
    public int Id { get; set; }

    [Column("login")]
    public string Login { get; set; }

    [Column("senha_hash")]
    public string Senhahash { get; set; }

    [Column("tipo")]
    public string Tipo { get; set; }
}
