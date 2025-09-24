"use client";
import Link from "next/link";
import { useState } from "react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("senha", senha);
    formData.append("telefone", telefone);
    formData.append("cpf", cpf);
    formData.append("localizacao", localizacao);
    if (fotoPerfil) formData.append("foto_perfil", fotoPerfil);
    if (comprovante) formData.append("comprovante_residencia", comprovante);

    try {
      const res = await fetch("http://127.0.0.1:8000/users/cadastrar-usuario/", {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { erro: "Resposta inválida do servidor" };
      }

      if (!res.ok) {
        setMensagem(data.erro || "Erro ao cadastrar usuário");
      } else {
        setMensagem("Usuário criado com sucesso! ID: " + data.id);
      }
    } catch (err) {
      setMensagem("Erro de conexão com o servidor");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <br />
        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        <br />
        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <br />
        <input type="text" placeholder="Localização" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
        <br />

        <label>Foto de perfil:</label>
        <input type="file" onChange={(e) => setFotoPerfil(e.target.files[0])} />
        <br />

        <label>Comprovante de residência:</label>
        <input type="file" onChange={(e) => setComprovante(e.target.files[0])} />
        <br />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p style={{ marginTop: 20 }}>{mensagem}</p>}
    </div>
  );
}
