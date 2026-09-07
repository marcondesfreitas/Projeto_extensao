"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPosts } from "../../service/posts";
import { gerarNotificacoes } from "../../service/notificacoes";

import "./menu_lateral_direito_notificacao.css";

export default function Menu_lateral_direito_notificacao() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const userId = localStorage.getItem("user_id");
      try {
        const data = await getPosts();
        const lista = Array.isArray(data) ? data : [];
        // Mostra só as 4 mais recentes aqui; a lista completa fica em /notificacoes.
        setNotificacoes(gerarNotificacoes(lista, userId).slice(0, 4));
      } catch (err) {
        console.error(err);
        setNotificacoes([]);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <div className="notificacoes">
      <h1>Notificações</h1>

      {carregando ? (
        <p className="notificacoes-vazio">Carregando...</p>
      ) : notificacoes.length === 0 ? (
        <p className="notificacoes-vazio">Nenhuma novidade por aqui.</p>
      ) : (
        <ul>
          {notificacoes.map((n) => (
            <li key={n.id} className={n.lida ? "" : "nao-lida"}>
              <span className="ponto" />
              {n.texto}
            </li>
          ))}
        </ul>
      )}

      <Link href="/notificacoes" className="notificacoes-ver-todas">
        Ver todas
      </Link>
    </div>
  );
}