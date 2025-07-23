import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErro(null);
    setLoading(true);

    try {
      const response = await fetch("https://meusistemaapi.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha }),
      });

      if (!response.ok) {
        const erroApi = await response.json();
        throw new Error(erroApi.message || "Falha no login");
      }

      const data = await response.json();
      alert("Login bem-sucedido! Token: " + data.token);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={estilos.container}>
      <div style={estilos.card}>
        <h2 style={estilos.titulo}>Login</h2>

        <label style={estilos.label}>Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Digite seu login"
          disabled={loading}
          style={estilos.input}
        />

        <label style={estilos.label}>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          disabled={loading}
          style={estilos.input}
        />

        {erro && <p style={estilos.erro}>{erro}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={estilos.botao}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}

const estilos = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  titulo: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  botao: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  erro: {
    color: "red",
    marginBottom: "1rem",
  },
};
