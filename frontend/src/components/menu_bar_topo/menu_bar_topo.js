import React from 'react'

import './menu_bar_topo.css'

const Menu_bar_topo = () => {
  return (
    <div className="menu-bar-topo">
        <input
          type="text"
          placeholder="Buscar por titulo, local ou categoria"
          className="search-input"
        />
    </div>
  )
}

export default Menu_bar_topo