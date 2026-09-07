"use client";

import "./page.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [comprovante, setComprovante] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("senha", senha);
    formData.append("telefone", telefone);
    formData.append("cpf", cpf);
    formData.append("localizacao", localizacao);

    if (fotoPerfil) {
      formData.append("foto_perfil", fotoPerfil);
    }

    if (comprovante) {
      formData.append("comprovante_residencia", comprovante);
    }

    try {
      const res = await fetch(
        `${API_URL}/users/cadastrar-usuario/`,
        {
          method: "POST",
          body: formData,
        }
      );

      let data;

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        setMensagem(
          data.erro ||
          data.detail ||
          "Erro ao cadastrar usuário"
        );
        return;
      }

      setMensagem("Usuário criado com sucesso!");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMensagem("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <img
            src="/logo.png"
            alt="Vigia"
            className="cadastro-logo"
          />

          <div className="cadastro-separator"></div>

          <h1>Criar sua conta</h1>

          <p className="cadastro-subtexto">
            Junte-se à comunidade e ajude a transformar sua região.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="campo">
            <label>Nome completo</label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Telefone</label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>CPF</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Cidade / Bairro</label>
            <input
              type="text"
              placeholder="Informe sua cidade ou bairro"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            />
          </div>

          <div className="arquivo-container">
            <div className="arquivo-info">
              <span className="arquivo-titulo">
                Comprovante de residência
              </span>

              <span className="arquivo-opcional">
                Opcional
              </span>
            </div>

            <input
              type="file"
              onChange={(e) =>
                setComprovante(e.target.files?.[0] || null)
              }
            />
          </div>

          <div className="arquivo-container">
            <div className="arquivo-info">
              <span className="arquivo-titulo">
                Foto de perfil
              </span>

              <span className="arquivo-opcional">
                Opcional
              </span>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFotoPerfil(e.target.files?.[0] || null)
              }
            />
          </div>

          <label className="checkbox-termos">
            <input
              type="checkbox"
              required
            />

            <span>
              Aceito os termos de uso da plataforma
            </span>
          </label>

          <button
            type="submit"
            className="btn-cadastrar"
          >
            Criar conta
          </button>
        </form>

        <div className="link-login">
          Já possui uma conta?

          <Link href="/login">
            Entrar
          </Link>
        </div>

        {mensagem && (
          <p className="cadastro-mensagem">
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}