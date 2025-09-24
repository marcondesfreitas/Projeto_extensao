"use client";

import './page.css'

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [userId, setUserId] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.detail || data.error || "Erro no login");
        return;
      }

      setUserId(data.user.id);
      setMensagem(`Login realizado com sucesso! Bem-vindo, ${data.user.nome}`);
    } catch (err) {
      console.error(err);
      setMensagem("Erro de conexão com o servidor");
    }
  };

  return (
    <div className='Div-Body'>
      <div className='Div-login'>
        <div className='Div-direita-login'>

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
          <Link href="/solicitar-redefinicao">Esqueci a senha</Link><br />
          <Link href="/cadastrar">Criar conta</Link>
        </div>
        <div className='Div-esquerda-login'>
          <div className='Div_logo'>
            <img src='/logo_icone.png' alt='logo' className='Logo_img'/>
            <p className='Text-Logo'>Vigilância Local</p>
          </div>
          <p className='Text_Div_Esquerda'>
            Entre para denunciar problemas locais, apoiar vizinhos e acompanhar soluções na sua região.
          </p>
          <div className='Div_logo_footer'>
            <img src='/Logo-Icone_Footer.png' alt='logo' className='Logo-Icone_Footer'/>
            <p className='Text_logo_footer'>Comunidade segura</p>
            
          </div>
        </div>
        {mensagem && <p>{mensagem}</p>}
        {userId && <p>ID do usuário: {userId}</p>}
      </div>
    </div>
  );
}
