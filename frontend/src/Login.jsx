import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErro(null);
    setLoading(true);

    try {
      const response = await fetch("https://sistema-t3b5.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha }),
      });

      if (!response.ok) {
        const erroApi = await response.json();
        throw new Error(erroApi.message || "Falha no login");
      }

      const data = await response.json();
      // Supondo que a API retorne data.token e data.role (ex: "ADM" ou "FUNCIONARIO")
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "ADM") {
        navigate("/painel-adm");
      } else {
        navigate("/painel-funcionario");
      }
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-purple-700">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <label className="block font-medium mb-1">Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Digite seu login"
          disabled={loading}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block font-medium mb-1">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          disabled={loading}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}
