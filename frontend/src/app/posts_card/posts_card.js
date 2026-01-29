import React from "react";
import "./cartao_post.css";

export default function PostsCard({ post }) {
  return (
    <div className="cartao-post">
      <h3>{post.autor_nome} - {post.titulo}</h3>
      {post.imagem && (
        <img
          src={`http://127.0.0.1:8000${post.imagem}`}
          alt="Imagem do post"
          className="imagem-post"
        />
      )}
      <p>{post.descricao}</p>
      <small>
        {post.categoria}
      </small>
    </div>
  );
}
