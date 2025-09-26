"use client";
import Link from "next/link";
import "./page.css";

export default function BoasVindas() {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="logo-container">
          <img src="/logo_icone.png" alt="Logo" className="welcome-logo" />
          <h1 className="app-name">Vigilância Local</h1>
          <div className="separator">
            <p className="app-tagline">Entre para denunciar problemas locais, apoiar vizinhos e acompanhar soluções na sua região.</p>
          </div>
        </div>

        <div className="button-group">
          <Link href="/login">
            <button className="btn-outline">Entrar</button>
          </Link>
          <Link href="/cadastrar">
            <button className="btn-filled">Criar conta</button>
          </Link>
        </div>

      </div>
    </div>
  );
}
