"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Feed from "../../components/feed/page";
import Menu_lateral_esquerdo from "@/components/menu_lateral_esquerdo/menu_lateral_esquerdo";
import Menu_bar_topo from "@/components/menu_bar_topo/menu_bar_topo";
import Menu_lateral_direito_filtrar from "@/components/menu_lateral_direito_filtrar/menu_lateral_direito_filtrar";
import Menu_lateral_direito_notificacao from "@/components/menu_lateral_direito_notificacoes/menu_lateral_direito_notificacao";

import "./home.css";

const Mapa_ocorrencias = dynamic(
  () => import("@/components/mapa_ocorrencias/mapa_ocorrencias"),
  { ssr: false }
);

export default function HomePage() {
  const router = useRouter();
  const [nome, setNome] = useState(null);
  const [papel, setPapel] = useState("");

  useEffect(() => {
    const logado = localStorage.getItem("logado");
    const nomeSalvo = localStorage.getItem("nome");
    const papel_local = localStorage.getItem("papel");

    if (logado !== true) {
      setNome(nomeSalvo);
      setPapel(papel_local);
    } else {
      router.push("/home");
    }
  }, []);

  function deslogar() {
    localStorage.clear();
    localStorage.setItem("logado", false);
    router.push("/login");
  }

  const [termoBusca, setTermoBusca] = useState("");
  const [filtrosAtivos, setFiltrosAtivos] = useState([]);

  function alternarFiltro(chave) {
    setFiltrosAtivos((atuais) =>
      atuais.includes(chave) ? atuais.filter((f) => f !== chave) : [...atuais, chave]
    );
  }

  function limparFiltros() {
    setFiltrosAtivos([]);
  }

  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="home-shell">
      <Menu_lateral_esquerdo />

      <div className="home-content">
        <Menu_bar_topo onBuscar={setTermoBusca} />

        <div className="home-body">
          <main className="home-main">
            <div className="home-bulletin">
              <span>Boletim de ocorrências</span>
              <strong>{hoje}</strong>
            </div>

            <Feed termoBusca={termoBusca} filtrosAtivos={filtrosAtivos} />
          </main>

          <aside className="home-right-rail">
            <div>
              <Menu_lateral_direito_filtrar
                filtrosAtivos={filtrosAtivos}
                onAlternar={alternarFiltro}
                onLimpar={limparFiltros}
              />
            </div>
            <div>
              <Mapa_ocorrencias />
            </div>
            <div>
              <Menu_lateral_direito_notificacao />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}