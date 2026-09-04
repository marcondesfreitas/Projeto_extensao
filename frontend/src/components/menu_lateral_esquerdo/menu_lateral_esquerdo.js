"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import "./menu_lateral_esquerdo.css";

const itens = [
  {
    label: "Home",
    href: "/home",
    icon: (
      <path d="M3 10.5 12 3l9 7.5M5.5 9.5V20a1 1 0 0 0 1 1h4v-6h3v6h4a1 1 0 0 0 1-1V9.5" />
    ),
  },
  {
    label: "Criar Postagem",
    href: "/criar_postagens",
    icon: <path d="M12 3v18M3 12h18" />,
  },
  {
    label: "Notificações",
    href: "/notificacoes",
    icon: (
      <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6ZM9.5 19a2.5 2.5 0 0 0 5 0" />
    ),
  },
  {
    label: "Perfil",
    href: "/perfil",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      </>
    ),
  },
];

const itemModerador = {
  label: "Moderador",
  href: "/moderador",
  icon: <path d="m12 3 7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />,
};

export default function Menu_lateral_esquerdo() {
  const pathname = usePathname();
  const router = useRouter();

  const [inicial, setInicial] = useState("?");
  const [papel, setPapel] = useState("");

  useEffect(() => {
    const nome = localStorage.getItem("nome");
    const papelUsuario = localStorage.getItem("papel");

    if (nome) {
      setInicial(nome.trim().charAt(0).toUpperCase());
    }

    if (papelUsuario) {
      setPapel(papelUsuario);
    }
  }, []);

  function deslogar() {
    localStorage.clear();
    localStorage.setItem("logado", "false");
    router.push("/login");
  }

  const itensVisiveis =
    papel === "moderador" || papel === "admin"
      ? [...itens, itemModerador]
      : itens;

  return (
    <nav className="rail">
      <div className="rail-topo">
        <span className="rail-marca">Vigilância Local</span>

        <ul className="rail-lista">
          {itensVisiveis.map((item) => {
            const ativo = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rail-link ${ativo ? "ativo" : ""}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>

                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        className="rail-avatar"
        onClick={deslogar}
        title="Sair"
      >
        {inicial}
      </button>
    </nav>
  );
}