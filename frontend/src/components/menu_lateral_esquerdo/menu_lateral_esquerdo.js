import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

import "./menu_lateral.css";

const Menu_lateral_esquerdo = () => {
    
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

  return (
    <div className="div_menu-lateral_esquerdo">
      <div className="menu-left">
        <h1>Vigilância Local</h1>

        <Link href="/home" className="menu-link">
          <Image src="/home-icone.png" width={18} height={18} alt="home" />
          <span>Home</span>
        </Link>

        <Link href="/criar_postagens" className="menu-link">
          <Image src="/adicionar-icone.png" width={18} height={18} alt="post" />
          <span>Criar Postagem</span>
        </Link>

        <Link href="/notificacoes" className="menu-link">
          <Image
            src="/notificacao-icone.png"
            width={18}
            height={18}
            alt="notificações"
          />
          <span>Notificações</span>
        </Link>

        <Link href="/perfil" className="menu-link">
          <Image src="/perfil-icone.png" width={18} height={18} alt="perfil" />
          <span>Perfil</span>
        </Link>
        {papel === "moderador" && (
          <Link href="/moderador" className="menu-link">
            <Image
              src="/moderador-icone.png"
              width={18}
              height={18}
              alt="moderador"
            />
            <span>Moderador</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu_lateral_esquerdo;
