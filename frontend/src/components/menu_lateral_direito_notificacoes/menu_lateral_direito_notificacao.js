"use client";

import "./menu_lateral_direito_notificacao.css";

// Lista estática por enquanto — plugar em dados reais quando o backend
// de notificações existir.
const notificacoes = [
  { id: 1, texto: "Curtiram sua postagem", lida: true },
  { id: 2, texto: "Comentaram em sua postagem", lida: true },
  { id: 3, texto: "Sua postagem foi aprovada", lida: false },
];

export default function Menu_lateral_direito_notificacao() {
  return (
    <div className="notificacoes">
      <h1>Notificações</h1>
      <ul>
        {notificacoes.map((n) => (
          <li key={n.id} className={n.lida ? "" : "nao-lida"}>
            <span className="ponto" />
            {n.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}