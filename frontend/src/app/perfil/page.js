'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import './perfil.css'

export default function PerfilPage() {

    const router = useRouter()

    const [dados, setDados] = useState({
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        localizacao: "",
        foto: "",
        comprovante: "",
        logado: ""
    })

    const [nome, setNome] = useState(localStorage.getItem('nome'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const [telefone, setTelefone] = useState(localStorage.getItem('telefone'))
    const [cpf, setCpf] = useState(localStorage.getItem('cpf'))
    const [localizacao, setLocalizacao] = useState(localStorage.getItem('localizacao'))
    const [foto, setFoto] = useState(localStorage.getItem('foto_perfil'))
    const [comprovante, setComprovante] = useState(localStorage.getItem('comprovante_residencia'))
    const [logado, setLogado] = useState(localStorage.getItem('logado'))

    useEffect(() => {
        const logado = localStorage.getItem('logado')

        if (logado !== "true") {
            router.push('/login')
            return
        }

        setDados({
            nome: localStorage.getItem('nome'),
            email: localStorage.getItem('email'),
            telefone: localStorage.getItem('telefone'),
            cpf: localStorage.getItem('cpf'),
            localizacao: localStorage.getItem('localizacao'),
            foto: localStorage.getItem('foto_perfil'),
            comprovante: localStorage.getItem('comprovante_residencia'),
            logado: logado
        })
    }, [])

    function deslogar() {
        localStorage.clear()
        localStorage.setItem('logado', "false")
        router.push('/login')
    }

    console.log("LOGADO:", dados.logado)
    console.log("LOGADO:", dados.logado)
    console.log("NOME:", dados.nome)
    console.log("EMAIL:", dados.email)
    console.log("TELEFONE:", dados.telefone)

    return (
        <div>
            <div className='menu-left'>
                <h1>Vigilância Local</h1>

                <Link href="/home" className="menu-link">
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
            <div className='tela-meio'>
                <h1>Perfil de {dados.nome}</h1>
                <p>Email: {dados.email}</p>
                <p>Telefone: {dados.telefone}</p>
                <p>CPF: {dados.cpf}</p>

            </div>

            <div className='menu-filtrar'>
                <h1>Sobre</h1>
            </div>

            <div className='mapa-de-ocorrencias'>
                <h1>Conquista</h1>
            </div>

            <div className='notificacoes'>
                <h1>Atividade recente</h1>
            </div>
            <button onClick={deslogar} className='deslogar-btn'>Sair</button>

        </div>
    )
}
