"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { redefinirSenha } from "@/services/api";
import "./redefinir-senha.css";

export default function RedefinirSenhaPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMensagem("Link de redefinição inválido.");
      return;
    }

    if (novaSenha !== confirmaSenha) {
      setMensagem("As senhas não coincidem!");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const data = await redefinirSenha(token, novaSenha);

      setMensagem(
        data.message ||
        data.erro ||
        data.error ||
        "Não foi possível alterar a senha."
      );
    } catch (error) {
      setMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="redefinir-senha-page">
      <section className="redefinir-senha-card">
        <div className="redefinir-senha-header">
          

          <h1>Vigia</h1>

          <div className="redefinir-senha-linha"></div>

          <h2>Nova senha</h2>

          <p>
            Crie uma nova senha segura para recuperar o acesso
            à sua conta.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="redefinir-senha-form"
        >
          <div className="redefinir-senha-field">
            <label htmlFor="nova-senha">
              Nova senha
            </label>

            <div className="redefinir-senha-input-container">
              <span className="redefinir-senha-input-icon">
                🔒
              </span>

              <input
                id="nova-senha"
                type="password"
                placeholder="Digite sua nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="redefinir-senha-requisitos">
              A senha deve possuir pelo menos 6 caracteres.
            </div>
          </div>

          <div className="redefinir-senha-field">
            <label htmlFor="confirma-senha">
              Confirmar senha
            </label>

            <div className="redefinir-senha-input-container">
              <span className="redefinir-senha-input-icon">
                🔒
              </span>

              <input
                id="confirma-senha"
                type="password"
                placeholder="Digite a senha novamente"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
          >
            {carregando ? "Alterando..." : "Alterar senha"}
          </button>
        </form>

        {mensagem && (
          <div className="redefinir-senha-mensagem">
            {mensagem}
          </div>
        )}

        <div className="redefinir-senha-voltar">
          <a href="/login">
            ← Voltar para o login
          </a>
        </div>

        <div className="redefinir-senha-footer">
          <span>Vigia</span>
          <small>Comunidade que transforma</small>
        </div>
      </section>
    </main>
  );
}