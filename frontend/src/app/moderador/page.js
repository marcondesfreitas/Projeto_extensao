"use client";

import { useEffect, useState } from "react";

import { getPosts, updatePostStatus } from "../../service/posts";

import PostsCard from "../../components/posts_card/posts_card";

import "./moderador.css";

import Menu_lateral_esquerdo from "@/components/menu_lateral_esquerdo/menu_lateral_esquerdo";
import Menu_bar_topo from "@/components/menu_bar_topo/menu_bar_topo";

const Page = () => {
  const [posts, setPosts] = useState([]);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState("");


  useEffect(() => {
    async function Carregar() {
      try {
        setCarregando(true);

        const data = await getPosts();

        console.log("POSTS RECEBIDOS:", data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data?.results)) {
          setPosts(data.results);
        } else {
          console.warn("getPosts() não retornou um array:", data);
          setPosts([]);
        }

      } catch (err) {
        console.error("ERRO AO CARREGAR POSTS:", err);

        setErro("Não foi possível carregar as postagens.");

        setPosts([]);

      } finally {
        setCarregando(false);
      }
    }

    Carregar();

  }, []);


  async function handleUpdateStatus(postId, novoStatus) {
    try {
      await updatePostStatus(postId, novoStatus);

      setPosts((postsAtuais) =>
        postsAtuais.filter((p) => p.id !== postId)
      );

    } catch (err) {
      console.error(err);

      alert("Erro ao atualizar o status do post.");
    }
  }


  return (
    <div className="moderador-layout">

      <Menu_lateral_esquerdo />


      <div className="moderador-main">

        <Menu_bar_topo />


        <main className="div-feed-principal">

          <div className="div-feed">

            {carregando && (
              <div className="moderador-mensagem">
                Carregando postagens...
              </div>
            )}


            {erro && (
              <div className="moderador-mensagem erro">
                {erro}
              </div>
            )}


            {!carregando && !erro && posts.length === 0 && (
              <div className="moderador-mensagem">
                Nenhuma postagem pendente encontrada.
              </div>
            )}


            {!carregando &&
              posts.map((post) => (
                <PostsCard
                  key={post.id}
                  post={post}
                  Status="Pendente"

                  onAprovar={(id) =>
                    handleUpdateStatus(id, "aprovado")
                  }

                  onRejeitar={(id) =>
                    handleUpdateStatus(id, "rejeitado")
                  }

                  onResolver={(id) =>
                    handleUpdateStatus(id, "resolvido")
                  }
                />
              ))}

          </div>

        </main>

      </div>

    </div>
  );
};

export default Page;