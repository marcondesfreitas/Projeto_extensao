"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");       // troquei username -> email
  const [password, setPassword] = useState(""); // senha
  const [mensagem, setMensagem] = useState("");
  const [userId, setUserId] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }), // envia exatamente o que o backend espera
      });

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.detail || data.error || "Erro no login");
        return;
      }

      // backend atual não retorna JWT, então só salvamos id do usuário
      setUserId(data.user.id);
      setMensagem(`Login realizado com sucesso! Bem-vindo, ${data.user.nome}`);
    } catch (err) {
      console.error(err);
      setMensagem("Erro de conexão com o servidor");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
      {userId && <p>ID do usuário: {userId}</p>}
    </div>
  );
}
