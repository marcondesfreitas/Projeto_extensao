import React from "react";

import "./cartao_post.css";

const CATEGORIAS = {
  iluminacao: {
    cor: "#E0A526",
    icone: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 18h6M10 21h4M12 3a5 5 0 0 0-3 9c.6.5 1 1.3 1 2h4c0-.7.4-1.5 1-2a5 5 0 0 0-3-9Z" />
      </svg>
    ),
  },

  buraco: {
    cor: "#6B93C2",
    icone: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 19h16M4 15c4-6 12-6 16 0" />
      </svg>
    ),
  },

  seguranca: {
    cor: "#D9645A",
    icone: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m12 3 7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      </svg>
    ),
  },

  lixo: {
    cor: "#6B8E4E",
    icone: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
      </svg>
    ),
  },

  outros: {
    cor: "#8B7EC8",
    icone: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16h.01" />
      </svg>
    ),
  },
};

export default function PostsCard({
  post,
  Status,
  onAprovar,
  onRejeitar,
  onResolver,
  onExcluir,
}) {
  if (
    Status &&
    post.status?.trim().toLowerCase() !==
      Status.trim().toLowerCase()
  ) {
    return null;
  }

  const categoriaInfo =
    CATEGORIAS[post.categoria] || {
      cor: "#8A93A3",
      icone: null,
    };

  return (
    <div
      className="cartao-post"
      style={{
        "--cor": categoriaInfo.cor,
      }}
    >
      <div className="post-header">
        <h3>{post.titulo}</h3>

        <span
          className={`status ${post.status?.toLowerCase()}`}
        >
          {post.status}
        </span>
      </div>

      <p className="autor">
        Por {post.autor_nome}
      </p>

      {post.imagem && (
        <div className="img-wrap">
          <img
            src={`http://127.0.0.1:8000${post.imagem}`}
            alt="Imagem do post"
          />
        </div>
      )}

      <p className="descricao">
        {post.descricao}
      </p>

      <span
        className="categoria"
        style={{
          "--cor": categoriaInfo.cor,
        }}
      >
        {categoriaInfo.icone}
        {post.categoria}
      </span>

      {(onAprovar ||
        onRejeitar ||
        onResolver ||
        onExcluir) && (
        <div
          className="post-acoes"
        >
          {onAprovar && (
            <button
              className="btn-aprovar"
              onClick={() => onAprovar(post.id)}
            >
              Aprovar
            </button>
          )}

          {onRejeitar && (
            <button
              className="btn-rejeitar"
              onClick={() => onRejeitar(post.id)}
            >
              Rejeitar
            </button>
          )}

          {onResolver && (
            <button
              className="btn-resolver"
              onClick={() => onResolver(post.id)}
            >
              Marcar como Resolvido
            </button>
          )}

          {onExcluir && (
            <button
              className="btn-excluir"
              onClick={() => onExcluir(post.id)}
            >
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  );
}