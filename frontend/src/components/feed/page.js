"use client";

import { useEffect, useState } from "react";
import { getPosts, updatePostStatus } from "../../service/posts";
import PostsCard from "../posts_card/posts_card";
import "./feed.css";

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function Feed({ termoBusca = "", filtrosAtivos = [] }) {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getPosts();
        const lista = Array.isArray(data) ? data : [];
        setPosts(lista.filter((p) => p.status !== "rejeitado"));
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  async function handleResolver(postId) {
    try {
      await updatePostStatus(postId, "resolvido");
      setPosts((atuais) =>
        atuais.map((p) => (p.id === postId ? { ...p, status: "resolvido" } : p))
      );
    } catch (err) {
      console.error(err);
      alert("Erro ao marcar como concluído.");
    }
  }

  if (carregando) {
    return <p className="feed-estado">Carregando ocorrências...</p>;
  }

  const statusVisiveis = filtrosAtivos.length > 0 ? filtrosAtivos : ["aprovado", "resolvido"];
  const termoNormalizado = normalizar(termoBusca.trim());

  const postsFiltrados = posts.filter((post) => {
    if (!statusVisiveis.includes(post.status)) return false;
    if (termoNormalizado === "") return true;
    const alvo = normalizar(
      `${post.titulo || ""} ${post.localizacao || ""} ${post.categoria || ""}`
    );
    return alvo.includes(termoNormalizado);
  });

  if (postsFiltrados.length === 0) {
    return (
      <div className="feed-vazio">
        <strong>Sua cidade, sua voz.</strong>
        <span>Seja a primeira voz do bairro — nenhuma ocorrência por aqui ainda.</span>
      </div>
    );
  }

  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  const papel = typeof window !== "undefined" ? localStorage.getItem("papel") : null;
  const ehModerador = papel === "moderador" || papel === "admin";

  return (
    <div>
      {postsFiltrados.map((post) => {
        const ehDono = String(post.autor_id) === String(userId);
        const podeResolver = post.status === "aprovado" && (ehDono || ehModerador);

        return (
          <PostsCard
            key={post.id}
            post={post}
            Status={post.status}
            onResolver={podeResolver ? handleResolver : undefined}
          />
        );
      })}
    </div>
  );
}