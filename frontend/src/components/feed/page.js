"use client";

import { useEffect, useState } from "react";
import { getPosts } from "../../service/posts";
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

  return (
    <div>
      {postsFiltrados.map((post) => (
        <PostsCard key={post.id} post={post} Status={post.status} />
      ))}
    </div>
  );
}