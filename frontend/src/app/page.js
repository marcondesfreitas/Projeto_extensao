"use client";

import Link from "next/link";
import "./page.css";

export default function BoasVindas() {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="Vigia"
            className="welcome-logo"
          />

          <div className="separator"></div>

          <p className="app-tagline">
            Veja. Denuncie. Transforme.
          </p>

          <p className="app-description">
            Registre problemas da sua região, acompanhe denúncias e ajude a
            transformar a sua comunidade.
          </p>
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