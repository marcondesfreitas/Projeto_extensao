"use client";

import { useState } from "react";
import { solicitarRedefinicao } from "@/services/api";
import "./redefinicao.css";

export default function SolicitarRedefinicaoPage() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCarregando(true);
    setMensagem("");

    try {
      const data = await solicitarRedefinicao(email);

      setMensagem(
        data.message ||
        data.erro ||
        data.error ||
        "Não foi possível enviar o link."
      );
    } catch (error) {
      setMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="redefinicao-page">
      <section className="redefinicao-card">
        <div className="redefinicao-header">
          
          <h1>Vigia</h1>

          <div className="redefinicao-linha"></div>

          <h2>Redefinir senha</h2>

          <p>
            Informe o e-mail da sua conta e enviaremos um link
            para você criar uma nova senha.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="redefinicao-form"
        >
          <label htmlFor="email">E-mail</label>

          <div className="redefinicao-input-container">
            <span className="redefinicao-input-icon">✉</span>

            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
          >
            {carregando ? "Enviando..." : "Enviar link"}
          </button>
        </form>

        {mensagem && (
          <div className="redefinicao-mensagem">
            {mensagem}
          </div>
        )}

        <div className="redefinicao-voltar">
          <a href="/login">
            ← Voltar para o login
          </a>
        </div>

        <div className="redefinicao-footer">
          <span>Vigia</span>
          <small>Comunidade que transforma</small>
        </div>
      </section>
    </main>
  );
}