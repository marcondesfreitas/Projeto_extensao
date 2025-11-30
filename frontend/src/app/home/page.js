'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import './home.css';

export default function HomePage() {

    const router = useRouter();
    const [nome, setNome] = useState(null)

    useEffect(() => {

        const logado = localStorage.getItem('logado')
        const nomeSalvo = localStorage.getItem('nome')

        if (logado !== true) {
            setNome(nomeSalvo)
        } else {
            router.push('/home');
        }

    }, [])

    function deslogar() {
        localStorage.clear()
        localStorage.setItem('logado', false);
        router.push('/login');
    }

    return (
        <div>
            <div className='menu-left'>
                <h1>Vigilância Local</h1>

                <Link href="/sobre" className="menu-link">
                    <Image src="/home-icone.png" width={18} height={18} alt="home" />
                    <span>Home</span>
                </Link>

                <Link href="/sobre" className="menu-link">
                    <Image src="/adicionar-icone.png" width={18} height={18} alt="post" />
                    <span>Criar Postagem</span>
                </Link>

                <Link href="/sobre" className="menu-link">
                    <Image src="/notificacao-icone.png" width={18} height={18} alt="notificações" />
                    <span>Notificações</span>
                </Link>

                <Link href="/perfil" className="menu-link">
                    <Image src="/perfil-icone.png" width={18} height={18} alt="perfil" />
                    <span>Perfil</span>
                </Link>

                <Link href="/sobre" className="menu-link">
                    <Image src="/moderador-icone.png" width={18} height={18} alt="moderador" />
                    <span>Moderador</span>
                </Link>
            </div>

            <div className='menu-bar-topo'>
                <input
                    type="text"
                    placeholder="Buscar por titulo, local ou categoria"
                    className="search-input"
                />

            </div>

            <div className='menu-filtrar'>
                <h1>Filtrar por</h1>
                <div className='filtros-container-1'>
                    <button className="pill">
                        <span className="icon">✔</span> Resolvido
                    </button>
                    <button className="pill">
                        <span className="icon">⏱</span> Pendente
                    </button>
                </div>
                <div className='filtros-container-2'>
                    <button className="pill">
                        <span className="icon">👍</span> Aprovado
                    </button>
                    <button className="pill">
                        <span className="icon">📍</span> Próximo
                    </button>
                </div>
            </div>

            <div className='mapa-de-ocorrencias'>
                <h1>Mapa de ocorrencias</h1>
            </div>

            <div className='notificacoes'>
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

        </div>
    )
}
