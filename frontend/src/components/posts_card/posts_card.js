import React from "react";
import "./cartao_post.css";

export default function PostsCard({ post, Status }) {
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
    </div>
  );
}
