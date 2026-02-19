import React from 'react'

import './menu_lateral_direito_filtrar.css'

const Menu_lateral_direito_filtrar = () => {
  return (
    <div className="menu-filtrar">
        <h1>Filtrar por</h1>
        <div className="filtros-container-1">
          <button className="pill">
            <span className="icon">✔</span> Resolvido
          </button>
          <button className="pill">
            <span className="icon">⏱</span> Pendente
          </button>
        </div>
        <div className="filtros-container-2">
          <button className="pill">
            <span className="icon">👍</span> Aprovado
          </button>
          <button className="pill">
            <span className="icon">📍</span> Próximo
          </button>
        </div>
      </div>
  )
}

export default Menu_lateral_direito_filtrar