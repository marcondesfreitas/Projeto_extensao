"use client";
import { useState } from "react";
import { solicitarRedefinicao } from "@/services/api";
import "./redefinicao.css";

export default function SolicitarRedefinicaoPage() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await solicitarRedefinicao(email);
    setMensagem(data.message || data.error);
  };

  return (
    <div className="container-redefinicao">
      <p className="app-name">Vigilância Local</p>
      <img src="/logo_icone.png" alt="Logo" className="welcome-logo" />
      <h1>Redefinir senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar link</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
