"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Feed from "../../components/feed/page";
import Menu_lateral_esquerdo from "@/components/menu_lateral_esquerdo/menu_lateral_esquerdo";

import "./home.css";
import Menu_bar_topo from "@/components/menu_bar_topo/menu_bar_topo";
import Menu_lateral_direito_filtrar from "@/components/menu_lateral_direito_filtrar/menu_lateral_direito_filtrar";
import Mapa_ocorrencias from "@/components/mapa_ocorrencias/mapa_ocorrencias";
import Menu_lateral_direito_notificacao from "@/components/menu_lateral_direito_notificacoes/menu_lateral_direito_notificacao";

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

  return (
    <div>

      <div>
        <Menu_lateral_esquerdo />
      </div>

      <div>
        <Menu_bar_topo />
      </div>

      <div>
        <Feed />
      </div>

      <div>
        <Menu_lateral_direito_filtrar />
      </div>

      <div>
        <Mapa_ocorrencias />
      </div>

      <div>
        <Menu_lateral_direito_notificacao />
      </div>
      
    </div>
  );
}
