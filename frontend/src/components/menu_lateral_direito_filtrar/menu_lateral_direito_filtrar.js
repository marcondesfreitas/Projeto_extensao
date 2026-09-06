"use client";

import "./menu_lateral_direito_filtrar.css";

const Menu_lateral_direito_filtrar = ({ filtrosAtivos = [], onAlternar, onLimpar }) => {
  const resolvidoAtivo = filtrosAtivos.includes("resolvido");
  const aprovadoAtivo = filtrosAtivos.includes("aprovado");

  return (
    <div className="menu-filtrar">
      <h1>Filtrar por</h1>
      <div className="filtros-container-1">
        <button
          type="button"
          className={`pill ${resolvidoAtivo ? "pill-ativo" : ""}`}
          onClick={() => onAlternar("resolvido")}
        >
          <span className="icon">✔</span> Resolvido
        </button>
      </div>
      <div className="filtros-container-2">
        <button
          type="button"
          className={`pill ${aprovadoAtivo ? "pill-ativo" : ""}`}
          onClick={() => onAlternar("aprovado")}
        >
          <span className="icon">👍</span> Aprovado
        </button>
      </div>

      {filtrosAtivos.length > 0 && (
        <button type="button" className="pill pill-limpar" onClick={onLimpar}>
          <span className="icon">✕</span> Limpar filtros
        </button>
      )}
    </div>
  );
};

export default Menu_lateral_direito_filtrar;