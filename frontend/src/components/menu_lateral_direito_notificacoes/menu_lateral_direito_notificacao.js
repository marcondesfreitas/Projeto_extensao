import React from 'react'
import Link from "next/link";

import './menu_lateral_direito_notificacao.css'

const Menu_lateral_direito_notificacao = () => {
  return (
    <div className="notificacoes">
        <h1>Notificacoes</h1>

        <Link href="/post/1" className="notificacao-item">
          <span className="icone">🤍</span>
          <p>Curtiram sua postagem</p>
        </Link>

        <Link href="/post/2" className="notificacao-item">
          <span className="icone">💬</span>
          <p>Comentaram em sua postagem</p>
        </Link>

        <Link href="/post/3" className="notificacao-item">
          <span className="icone">⏺</span>
          <p>Sua postagem foi aprovada</p>
        </Link>
      </div>
  )
}

export default Menu_lateral_direito_notificacao