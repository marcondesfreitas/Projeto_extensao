'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

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
            <h1>Home Page</h1>
            {nome ? <p>Bem-vindo, {nome}!</p> : <p>Você não está logado.</p>}
            <button onClick={deslogar}>deslogar</button>
        </div>
    )
}
