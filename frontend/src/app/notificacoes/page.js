"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Menu_lateral_esquerdo from "@/components/menu_lateral_esquerdo/menu_lateral_esquerdo";
import Menu_bar_topo from "@/components/menu_bar_topo/menu_bar_topo";
import { getPosts } from "../../service/posts";
import { gerarNotificacoes, marcarTodasComoLidas } from "../../service/notificacoes";

import "./notificacoes.css";

export default function NotificacoesPage() {
  const router = useRouter();
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const logado = localStorage.getItem("logado");
    if (logado !== "true") {
      router.push("/login");
      return;
    }

    async function carregar() {
      const userId = localStorage.getItem("user_id");
      try {
        const data = await getPosts();
        const lista = Array.isArray(data) ? data : [];
        setNotificacoes(gerarNotificacoes(lista, userId));
      } catch (err) {
        console.error(err);
        setNotificacoes([]);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [router]);

  function handleMarcarTodasLidas() {
    marcarTodasComoLidas(notificacoes);
    setNotificacoes((atuais) => atuais.map((n) => ({ ...n, lida: true })));
  }

  const temNaoLidas = notificacoes.some((n) => !n.lida);

  return (
    <div className="notif-layout">
      <Menu_lateral_esquerdo />

      <main className="notif-conteudo">
        <Menu_bar_topo />

        <section className="notif-area">
          <div className="notif-cabecalho">
            <div>
              <span>ATUALIZAÇÕES</span>
              <h1>Notificações</h1>
            </div>

            {temNaoLidas && (
              <button className="notif-marcar-lidas" onClick={handleMarcarTodasLidas}>
                Marcar todas como lidas
              </button>
            )}
          </div>

          {carregando ? (
            <p className="notif-vazio">Carregando notificações...</p>
          ) : notificacoes.length === 0 ? (
            <div className="notif-vazio">
              <strong>Nenhuma novidade por aqui.</strong>
              <span>Quando suas postagens forem avaliadas, você vê o resultado aqui.</span>
            </div>
          ) : (
            <ul className="notif-lista">
              {notificacoes.map((n) => (
                <li key={n.id} className={n.lida ? "" : "nao-lida"}>
                  <span className="notif-ponto" />
                  <div className="notif-texto">
                    <p>{n.texto}</p>
                    {n.data && (
                      <span className="notif-data">
                        {new Date(n.data).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}