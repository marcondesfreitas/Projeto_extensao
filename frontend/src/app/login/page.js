"use client";

import "./page.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function getMediaUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const res = await fetch(
        `${API_URL}/users/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            senha: password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensagem(
          data.erro ||
          data.detail ||
          data.error ||
          "Erro no login"
        );

        localStorage.setItem("logado", "false");
        return;
      }

      const usuario = data.user;

      localStorage.setItem("user_id", String(usuario.id));
      localStorage.setItem("logado", "true");
      localStorage.setItem("papel", usuario.papel || "");
      localStorage.setItem("perfil", usuario.perfil || "");
      localStorage.setItem("nome", usuario.nome || "");
      localStorage.setItem("email", usuario.email || "");
      localStorage.setItem("telefone", usuario.telefone || "");
      localStorage.setItem("cpf", usuario.cpf || "");
      localStorage.setItem(
        "localizacao",
        usuario.localizacao || ""
      );

      if (usuario.foto_perfil) {
        localStorage.setItem(
          "foto_perfil",
          usuario.foto_perfil
        );
      } else {
        localStorage.removeItem("foto_perfil");
      }

      if (usuario.comprovante_residencia) {
        localStorage.setItem(
          "comprovante_residencia",
          usuario.comprovante_residencia
        );
      } else {
        localStorage.removeItem("comprovante_residencia");
      }

      router.push("/home");
    } catch (err) {
      console.error(err);

      setMensagem(
        "Erro de conexão com o servidor"
      );

      localStorage.setItem(
        "logado",
        "false"
      );
    }
  };

  return (
    <main className="vigia-login-page">
      <div className="vigia-login-card">

        <section className="vigia-login-left">

          <div className="vigia-login-brand">
            <img
              src="/icone_img.png"
              alt="VIGIA"
              className="vigia-login-logo"
            />

            <div className="vigia-login-brand-text">
              <span>VIGIA</span>
              <small>VEJA. DENUNCIE. TRANSFORME.</small>
            </div>
          </div>

          <div className="vigia-login-intro">
            <h1>Sua cidade, sua voz.</h1>

            <p>
              Denuncie problemas da sua região,
              acompanhe ocorrências e ajude a
              transformar sua comunidade.
            </p>
          </div>

          <div className="vigia-login-footer">
            <div className="vigia-footer-icon">
              V
            </div>

            <div>
              <strong>Comunidade ativa</strong>
              <span>Juntos por uma cidade melhor.</span>
            </div>
          </div>

        </section>

        <section className="vigia-login-right">

          <div className="vigia-login-header">
            <span>ACESSO À PLATAFORMA</span>

            <h2>Entrar</h2>

            <p>
              Acesse sua conta para continuar.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="vigia-login-form"
          >

            <div className="vigia-input-group">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="vigia-input-group">
              <label htmlFor="senha">
                Senha
              </label>

              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="vigia-login-options">
              <Link href="/solicitar-redefinicao">
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              className="vigia-login-button"
            >
              Entrar
            </button>

          </form>

          {mensagem && (
            <p className="vigia-login-message">
              {mensagem}
            </p>
          )}

          <div className="vigia-create-account">
            <span>
              Ainda não possui uma conta?
            </span>

            <Link href="/cadastrar">
              Criar conta
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
}