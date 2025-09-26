"use client";

import './page.css'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [userId, setUserId] = useState(null);

  const router = useRouter();

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
        localStorage.setItem('logado', false);
        return;
      }

      localStorage.setItem('logado', true);
      localStorage.setItem('nome', data.user)
      console.log(localStorage.getItem('nome'))
      router.push('/home');

    } catch (err) {
      console.error(err);
      setMensagem("Erro de conexão com o servidor");
      localStorage.setItem('logado', false);
    }
  };

  return (
    <div className='Div-Body'>
      <div className='Div-login'>
        <div className='Div-esquerda-login'>
          <div className='Div_logo'>
            <img src='/logo_icone.png' alt='logo' className='Logo_img' />
            <p className='Text-Logo'>Vigilância Local</p>
          </div>
          <p className='Text_Div_Esquerda'>
            Entre para denunciar problemas locais, apoiar vizinhos e acompanhar soluções na sua região.
          </p>
          <div className='Div_logo_footer'>
            <img src='/Logo-Icone_Footer.png' alt='logo' className='Logo-Icone_Footer' />
            <p className='Text_logo_footer'>Comunidade segura</p>

          </div>
        </div>
        <div className='Div-direita-login'>
          <p className='Text-Rigth-2'>Login</p>
          <p className='Text-Rigth-1'>Use seu Email e senha para entrar.</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
              className='Input-email'
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
              className='Input-senha'
            />
            <button type="submit" className='Btn-Entar'>Entrar</button>
          </form>
          <Link href="/solicitar-redefinicao">Esqueci a senha</Link><br />
          <Link href="/cadastrar">Criar conta</Link>
        </div>

        {mensagem && <p>{mensagem}</p>}
        {userId && <p>ID do usuário: {userId}</p>}
      </div>
    </div>
  );
}
