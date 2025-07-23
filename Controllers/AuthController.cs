using BCrypt.Net;
using MeuSistemaApi.Data;
using MeuSistemaApi.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;



namespace MeuSistemaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginRequest request)
        {
            var usuario = _context.Usuarios.SingleOrDefault(u => u.Login == request.Login);
            if (usuario == null || !BCrypt.Net.BCrypt.Verify(request.Senha, usuario.Senhahash))
            {
                return Unauthorized(new { mensage = "Senha Incorreta" });
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, usuario.Login),
                new Claim(ClaimTypes.Role, usuario.Tipo)
            };

            var key = Encoding.ASCII.GetBytes("X9v!4r#bT2qLp8Mz$wYe7@FkN6HsUJd3");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { token = tokenString });
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(new { status = "API  online!" });
        }
    }
    }
