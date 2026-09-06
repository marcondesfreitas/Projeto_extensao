"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./perfil.css";

import Menu_lateral_esquerdo from "@/components/menu_lateral_esquerdo/menu_lateral_esquerdo";
import Menu_bar_topo from "@/components/menu_bar_topo/menu_bar_topo";
import PostsCard from "@/components/posts_card/posts_card";

export default function PerfilPage() {
  const router = useRouter();

  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    localizacao: "",
    foto: "",
  });

  const [postagens, setPostagens] = useState([]);
  const [carregandoPostagens, setCarregandoPostagens] = useState(true);

  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novoCpf, setNovoCpf] = useState("");
  const [novaLocalizacao, setNovaLocalizacao] = useState("");
  const [novaFoto, setNovaFoto] = useState(null);

  useEffect(() => {
    const logado = localStorage.getItem("logado");

    if (logado !== "true") {
      router.push("/login");
      return;
    }

    const dadosUsuario = {
      nome: localStorage.getItem("nome") || "",
      email: localStorage.getItem("email") || "",
      telefone: localStorage.getItem("telefone") || "",
      cpf: localStorage.getItem("cpf") || "",
      localizacao: localStorage.getItem("localizacao") || "",
      foto:
        localStorage.getItem("foto_perfil") &&
        localStorage.getItem("foto_perfil") !== "null"
          ? localStorage.getItem("foto_perfil")
          : "",
    };

    setDados(dadosUsuario);

    setNovoNome(dadosUsuario.nome);
    setNovoEmail(dadosUsuario.email);
    setNovoTelefone(dadosUsuario.telefone);
    setNovoCpf(dadosUsuario.cpf);
    setNovaLocalizacao(dadosUsuario.localizacao);

    const userId = localStorage.getItem("user_id");

    if (userId) {
      carregarPostagens(userId);
    } else {
      console.error("ID do usuário não encontrado no localStorage.");
      setCarregandoPostagens(false);
    }
  }, [router]);

  async function carregarPostagens(userId) {
    try {
      setCarregandoPostagens(true);

      const res = await fetch(
        `http://127.0.0.1:8000/posts/postagens/?autor_id=${userId}`
      );

      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }

      const data = await res.json();

      console.log("Postagens recebidas:", data);

      setPostagens(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar postagens:", error);
      setPostagens([]);
    } finally {
      setCarregandoPostagens(false);
    }
  }

  async function excluirPostagem(postId) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta postagem?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/posts/postagens/${postId}/`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        alert(
          data.erro ||
            data.error ||
            "Não foi possível excluir a postagem."
        );

        return;
      }

      setPostagens((postagensAtuais) =>
        postagensAtuais.filter(
          (post) => post.id !== postId
        )
      );

      alert("Postagem excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
      alert("Erro de conexão com o servidor.");
    }
  }

  function abrirEdicao() {
    setMensagem("");
    setEditando(true);
  }

  function cancelarEdicao() {
    setNovoNome(dados.nome);
    setNovoEmail(dados.email);
    setNovoTelefone(dados.telefone);
    setNovoCpf(dados.cpf);
    setNovaLocalizacao(dados.localizacao);
    setNovaFoto(null);
    setEditando(false);
    setMensagem("");
  }

  async function salvarPerfil(e) {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setMensagem("Erro: ID do usuário não encontrado.");
      return;
    }

    setSalvando(true);
    setMensagem("");

    const formData = new FormData();

    formData.append("nome", novoNome);
    formData.append("email", novoEmail);
    formData.append("telefone", novoTelefone);
    formData.append("cpf", novoCpf);
    formData.append("localizacao", novaLocalizacao);

    if (novaFoto) {
      formData.append("foto_perfil", novaFoto);
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/users/usuario/${userId}/`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensagem(
          data.erro ||
            data.error ||
            "Erro ao atualizar o perfil."
        );

        setSalvando(false);
        return;
      }

      const usuario = data.user || data;

      const novosDados = {
        nome: usuario.nome || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
        cpf: usuario.cpf || "",
        localizacao: usuario.localizacao || "",
        foto: usuario.foto_perfil || dados.foto,
      };

      setDados(novosDados);

      localStorage.setItem("nome", novosDados.nome);
      localStorage.setItem("email", novosDados.email);
      localStorage.setItem("telefone", novosDados.telefone);
      localStorage.setItem("cpf", novosDados.cpf);
      localStorage.setItem(
        "localizacao",
        novosDados.localizacao
      );

      if (usuario.foto_perfil) {
        localStorage.setItem(
          "foto_perfil",
          usuario.foto_perfil
        );
      }

      setMensagem("Perfil atualizado com sucesso!");
      setEditando(false);
      setNovaFoto(null);
    } catch (err) {
      console.error(err);
      setMensagem("Erro de conexão com o servidor.");
    } finally {
      setSalvando(false);
    }
  }

  function deslogar() {
    localStorage.clear();
    localStorage.setItem("logado", "false");
    router.push("/login");
  }

  return (
    <div className="perfil-layout">
      <Menu_lateral_esquerdo />

      <main className="perfil-conteudo">
        <Menu_bar_topo />

        <section className="perfil-area">
          <div className="perfil-card">
            {!editando ? (
              <>
                <div className="perfil-cabecalho">
                  <div className="perfil-foto-container">
                    {dados.foto ? (
                      <img
                        src={dados.foto}
                        alt={`Foto de ${dados.nome}`}
                        className="perfil-foto"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="perfil-foto-sem-imagem">
                        {dados.nome
                          ? dados.nome
                              .charAt(0)
                              .toUpperCase()
                          : "U"}
                      </div>
                    )}
                  </div>

                  <div className="perfil-titulo">
                    <span>PERFIL DO USUÁRIO</span>

                    <h1>
                      {dados.nome || "Usuário"}
                    </h1>

                    <p>
                      Informações da sua conta
                    </p>
                  </div>

                  <button
                    className="editar-perfil-btn"
                    onClick={abrirEdicao}
                  >
                    Editar perfil
                  </button>
                  <button
                    onClick={deslogar}
                    className="deslogar-btn"
                  >
                    Sair da conta
                  </button>
                </div>

                <div className="perfil-linha" />

                <div className="perfil-informacoes">
                  <div className="perfil-item">
                    <span>Nome</span>
                    <strong>{dados.nome}</strong>
                  </div>

                  <div className="perfil-item">
                    <span>Email</span>
                    <strong>{dados.email}</strong>
                  </div>

                  <div className="perfil-item">
                    <span>Telefone</span>
                    <strong>{dados.telefone}</strong>
                  </div>

                  <div className="perfil-item">
                    <span>CPF</span>
                    <strong>{dados.cpf}</strong>
                  </div>

                  <div className="perfil-item">
                    <span>Localização</span>
                    <strong>
                      {dados.localizacao}
                    </strong>
                  </div>
                </div>

                {mensagem && (
                  <p className="perfil-mensagem sucesso">
                    {mensagem}
                  </p>
                )}

                <div className="perfil-linha" />

                <div className="minhas-postagens">
                  <div className="postagens-titulo">
                    <span>MINHAS POSTAGENS</span>

                    <h2>
                      Postagens realizadas
                    </h2>

                    <p>
                      Aqui estão as postagens que você criou.
                    </p>
                  </div>

                  {carregandoPostagens ? (
                    <div className="postagens-vazia">
                      Carregando suas postagens...
                    </div>
                  ) : postagens.length === 0 ? (
                    <div className="postagens-vazia">
                      Você ainda não possui nenhuma postagem.
                    </div>
                  ) : (
                    <div className="lista-postagens">
                      {postagens.map((post) => (
                        <PostsCard
                          key={post.id}
                          post={post}
                          Status={post.status}
                          onExcluir={excluirPostagem}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <form
                className="form-editar-perfil"
                onSubmit={salvarPerfil}
              >
                <div className="editar-cabecalho">
                  <div>
                    <span>EDITAR PERFIL</span>

                    <h1>
                      Atualizar informações
                    </h1>

                    <p>
                      Altere seus dados e salve as mudanças.
                    </p>
                  </div>
                </div>

                <div className="editar-foto-area">
                  {novaFoto ? (
                    <img
                      src={URL.createObjectURL(novaFoto)}
                      alt="Nova foto"
                      className="editar-preview-foto"
                    />
                  ) : dados.foto ? (
                    <img
                      src={dados.foto}
                      alt="Foto atual"
                      className="editar-preview-foto"
                    />
                  ) : (
                    <div className="perfil-foto-sem-imagem">
                      {novoNome
                        ? novoNome
                            .charAt(0)
                            .toUpperCase()
                        : "U"}
                    </div>
                  )}

                  <div className="input-foto">
                    <label>
                      Alterar foto de perfil
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setNovaFoto(
                          e.target.files?.[0] || null
                        )
                      }
                    />
                  </div>
                </div>

                <div className="perfil-linha" />

                <div className="form-grid">
                  <div className="campo-editar">
                    <label>Nome</label>

                    <input
                      type="text"
                      value={novoNome}
                      onChange={(e) =>
                        setNovoNome(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="campo-editar">
                    <label>Email</label>

                    <input
                      type="email"
                      value={novoEmail}
                      onChange={(e) =>
                        setNovoEmail(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="campo-editar">
                    <label>Telefone</label>

                    <input
                      type="text"
                      value={novoTelefone}
                      onChange={(e) =>
                        setNovoTelefone(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="campo-editar">
                    <label>CPF</label>

                    <input
                      type="text"
                      value={novoCpf}
                      onChange={(e) =>
                        setNovoCpf(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="campo-editar campo-completo">
                    <label>Localização</label>

                    <input
                      type="text"
                      value={novaLocalizacao}
                      onChange={(e) =>
                        setNovaLocalizacao(e.target.value)
                      }
                    />
                  </div>
                </div>

                {mensagem && (
                  <p className="perfil-mensagem erro">
                    {mensagem}
                  </p>
                )}

                <div className="editar-acoes">
                  <button
                    type="button"
                    className="cancelar-edicao-btn"
                    onClick={cancelarEdicao}
                    disabled={salvando}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="salvar-edicao-btn"
                    disabled={salvando}
                  >
                    {salvando
                      ? "Salvando..."
                      : "Salvar alterações"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}