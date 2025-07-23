namespace MeuSistemaApi.Models
{
    public class UserLoginRequest
    {   
        public required string Login { get; set; }
        public required string Senha { get; set; }  
    }
}
