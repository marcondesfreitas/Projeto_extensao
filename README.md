# Sistema de Denúncias de Problemas Locais

Sistema web desenvolvido para permitir que cidadãos registrem e acompanhem denúncias de problemas em locais públicos, como ruas danificadas, iluminação pública, lixo acumulado e problemas de infraestrutura.

O sistema é desenvolvido utilizando Django no backend e Next.js no frontend.

## Tecnologias

### Backend

- Python
- Django
- Django REST Framework
- API REST

### Frontend

- Next.js
- React
- TypeScript
- HTML5
- CSS

## Funcionalidades

- Cadastro de usuários
- Login e autenticação
- Criação de denúncias
- Descrição do problema
- Registro da localização
- Classificação por categoria
- Upload de imagens
- Visualização das denúncias
- Acompanhamento do status
- Atualização do status das denúncias
- Gerenciamento das denúncias
- Painel administrativo

## Arquitetura

O projeto é dividido em duas partes principais:

```text
┌─────────────────────┐
│       Next.js       │
│      Frontend       │
└──────────┬──────────┘
           │
           │ HTTP / REST API
           ▼
┌─────────────────────┐
│       Django        │
│       Backend       │
│    REST Framework   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Database       │
└─────────────────────┘
