"use client";

import { useState } from "react";
import "./menu_bar_topo.css";

export default function Menu_bar_topo({ onBuscar }) {
  const [termo, setTermo] = useState("");

  function handleChange(e) {
    const valor = e.target.value;
    setTermo(valor);
    if (onBuscar) onBuscar(valor);
  }

  return (
    <div className="topo">
      <input
        type="text"
        className="topo-busca"
        placeholder="Buscar por título, local ou categoria"
        value={termo}
        onChange={handleChange}
      />
      <svg
        className="topo-icone"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </div>
  );
}