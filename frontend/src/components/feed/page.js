"use client";

import { useEffect, useState } from "react";
import { getPosts } from "../../service/posts";
import PostsCard from "../posts_card/posts_card";
import "./feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getPosts();
        const lista = Array.isArray(data) ? data : [];
        // A Home mostra só o que já passou pela moderação.
        setPosts(lista.filter((p) => p.status === "aprovado" || p.status === "resolvido"));
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

  if (posts.length === 0) {
    return <p className="feed-estado">Nenhuma ocorrência publicada ainda.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        // Status={post.status} faz o PostsCard sempre renderizar esse item
        // específico (o filtro interno dele compara post.status com essa prop).
        <PostsCard key={post.id} post={post} Status={post.status} />
      ))}
    </div>
  );
}