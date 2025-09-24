"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { redefinirSenha } from "@/services/api";

export default function RedefinirSenhaPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (novaSenha !== confirmaSenha) {
      setMensagem("As senhas não coincidem!");
      return;
    }
    const data = await redefinirSenha(token, novaSenha);
    setMensagem(data.message || data.error);
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Redefinir senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmaSenha}
          onChange={(e) => setConfirmaSenha(e.target.value)}
          required
        />
        <button type="submit">Alterar senha</button>
      </form>
      <p>{mensagem}</p>
    </div>
  );
}
