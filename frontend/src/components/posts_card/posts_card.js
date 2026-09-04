import React from "react";
import "./cartao_post.css";

export default function PostsCard({ post, Status, onAprovar, onRejeitar, onResolver }) {
  if (
    post.status?.trim().toLowerCase() !== Status.trim().toLowerCase()
  ) {
    return null;
  }

  return (
    <div className="cartao-post">
      <div className="post-header">
        <h3>{post.titulo}</h3>
        <span className={`status ${post.status.toLowerCase()}`}>
          {post.status}
        </span>
      </div>

      <p className="autor">Por {post.autor_nome}</p>

      {post.imagem && (
        <img
          src={`http://127.0.0.1:8000${post.imagem}`}
          alt="Imagem do post"
          className="imagem-post"
        />
      )}

      <p className="descricao">{post.descricao}</p>

      <small className="categoria">{post.categoria}</small>

      {/* Botões de moderação — só aparecem se as funções forem passadas
          (assim, em outras telas que usam PostsCard sem moderação, eles somem). */}
      {(onAprovar || onRejeitar || onResolver) && (
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {onAprovar && (
            <button
              onClick={() => onAprovar(post.id)}
              style={{ background: "#2e7d32", color: "#fff", padding: "6px 12px", border: "none", borderRadius: 4 }}
            >
              Aprovar
            </button>
          )}
          {onRejeitar && (
            <button
              onClick={() => onRejeitar(post.id)}
              style={{ background: "#c62828", color: "#fff", padding: "6px 12px", border: "none", borderRadius: 4 }}
            >
              Rejeitar
            </button>
          )}
          {onResolver && (
            <button
              onClick={() => onResolver(post.id)}
              style={{ background: "#1565c0", color: "#fff", padding: "6px 12px", border: "none", borderRadius: 4 }}
            >
              Marcar como Resolvido
            </button>
          )}
        </div>
      )}
    </div>
  );
}