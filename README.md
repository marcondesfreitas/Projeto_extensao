# Vigilância Local

Sistema web desenvolvido para permitir que cidadãos registrem e acompanhem denúncias de problemas em locais públicos, como ruas danificadas, iluminação pública, lixo acumulado e problemas de infraestrutura.

O sistema é dividido em duas partes: um backend em **Django REST Framework**, responsável pela API e pelo banco de dados, e um frontend em **Next.js**, responsável pela interface do usuário.

## Tecnologias

### Backend

- Python
- Django
- Django REST Framework
- Pillow (upload de imagens)
- django-cors-headers (comunicação com o frontend)

### Frontend

- Next.js (App Router)
- React
- Leaflet / React-Leaflet (mapa de ocorrências)
- HTML5 / CSS

## Arquitetura

```text
┌─────────────────────┐
│       Next.js       │
│      Frontend       │
│   (localhost:3000)  │
└──────────┬──────────┘
           │
           │ HTTP / REST API
           ▼
┌─────────────────────┐
│       Django        │
│       Backend       │
│    REST Framework   │
│  (127.0.0.1:8000)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Database        │
│      (SQLite)        │
└─────────────────────┘
```

## Funcionalidades

- Cadastro de usuários e login
- Criação de denúncias (título, descrição, categoria, imagem)
- Captura automática de localização (GPS do navegador)
- Busca de endereço com preenchimento automático de coordenadas
- Ajuste manual da localização no mapa (pino arrastável)
- Mapa de ocorrências com marcadores por denúncia
- Filtro do feed por status (aprovado / resolvido)
- Busca por título, local ou categoria
- Painel de moderação (aprovar, rejeitar, marcar como resolvido, excluir)
- Perfil do usuário com edição de dados e histórico de postagens próprias
- Notificações sobre o andamento das próprias denúncias

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Python 3.10 ou superior** — [python.org](https://www.python.org/downloads/)
- **Node.js 18 ou superior** (inclui o npm) — [nodejs.org](https://nodejs.org/)
- **Git** (opcional, para clonar o repositório)

Para verificar se já estão instalados, rode no terminal:

```bash
python --version
node --version
npm --version
```

## Estrutura do projeto

```text
projeto/
├── backend/              # API em Django
│   ├── posts/            # App de denúncias/postagens
│   ├── users/             # App de usuários e autenticação
│   ├── media/             # Imagens enviadas pelos usuários (criado automaticamente)
│   └── manage.py
│
└── frontend/              # Aplicação em Next.js
    ├── src/app/           # Páginas (Home, Perfil, Moderador, etc.)
    ├── components/        # Componentes reutilizáveis (cards, menus, mapa)
    └── service/           # Funções que conversam com a API do backend
```

---

## 1. Instalando e rodando o Backend (Django)

### 1.1. Acesse a pasta do backend

```bash
cd backend
```

### 1.2. Crie um ambiente virtual (recomendado)

Isso evita que as dependências do projeto se misturem com outras coisas instaladas no seu computador.

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux / macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

Você vai saber que o ambiente virtual está ativo porque o terminal mostra `(venv)` no início da linha.

### 1.3. Instale as dependências

Se o projeto já tiver um arquivo `requirements.txt`:

```bash
pip install -r requirements.txt
```

Se não tiver, instale manualmente o essencial:

```bash
pip install django djangorestframework django-cors-headers pillow
```

### 1.4. Configure o banco de dados

Por padrão, o projeto usa **SQLite** — não é necessário instalar nenhum banco separado. Só é preciso criar as tabelas:

```bash
python manage.py migrate
```

### 1.5. Crie um usuário administrador (opcional, para acessar o painel `/admin`)

```bash
python manage.py createsuperuser
```

Siga as instruções no terminal (usuário, e-mail, senha).

### 1.6. Rode o servidor

```bash
python manage.py runserver
```

Se tudo der certo, aparece algo como:

```text
Starting development server at http://127.0.0.1:8000/
```

Deixe esse terminal aberto — o backend precisa continuar rodando enquanto você usa o sistema.

> ⚠️ **Atenção:** esse é um servidor de desenvolvimento. Não use em produção — veja a [documentação oficial do Django](https://docs.djangoproject.com/en/stable/howto/deployment/) para isso.

---

## 2. Instalando e rodando o Frontend (Next.js)

### 2.1. Abra um **novo terminal** (deixe o backend rodando no outro) e acesse a pasta do frontend

```bash
cd frontend
```

### 2.2. Instale as dependências

```bash
npm install
```

Esse projeto usa mapa interativo (Leaflet), então confirme que essas duas bibliotecas também foram instaladas — se não aparecerem no `package.json`, instale manualmente:

```bash
npm install leaflet react-leaflet
```

### 2.3. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse **http://localhost:3000** no navegador.

---

## 3. Rodando o projeto completo

Resumindo, você precisa de **dois terminais abertos ao mesmo tempo**:

| Terminal | Comando | Endereço |
|---|---|---|
| 1 — Backend | `python manage.py runserver` | http://127.0.0.1:8000 |
| 2 — Frontend | `npm run dev` | http://localhost:3000 |

Acesse sempre pelo endereço do **frontend** (`localhost:3000`) — é ele que consome a API do backend por trás dos panos.

---

## Endpoints principais da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/users/login/` | Login do usuário |
| `PUT` | `/users/usuario/<id>/` | Atualizar dados do perfil |
| `GET` | `/posts/postagens/` | Listar todas as denúncias |
| `GET` | `/posts/postagens/?autor_id=<id>` | Listar denúncias de um usuário específico |
| `POST` | `/posts/postagens/` | Criar uma nova denúncia |
| `PATCH` | `/posts/postagens/<id>/status/` | Atualizar o status (aprovado, rejeitado, resolvido) |
| `DELETE` | `/posts/postagens/<id>/` | Excluir uma denúncia |

---

## Problemas comuns

**As imagens não aparecem (erro 404 em `/media/...`)**
Confirme que a pasta `media/` existe dentro de `backend/` e contém os arquivos enviados. Ela normalmente **não** é versionada no Git (fica no `.gitignore`), então, ao clonar o projeto em outra máquina, os uploads antigos não vêm junto — só os registros no banco, que passam a "apontar para o vazio". Isso é esperado; novos uploads feitos localmente voltam a funcionar normalmente.

**Erro de CORS no navegador**
Confirme que `django-cors-headers` está instalado e configurado no `settings.py`, permitindo a origem `http://localhost:3000`.

**Erro 404 ao criar ou listar postagens**
Confirme que a URL usada no frontend (em `service/posts.js`) bate exatamente com o que está definido no `urls.py` do backend — qualquer mudança de nome de rota em um lado precisa ser refletida no outro.

**Localização automática imprecisa**
A geolocalização por navegador (sem GPS de hardware, como em notebooks) pode errar bastante em cidades menores. Use a busca de endereço ou ajuste manualmente arrastando o pino no mapa ao criar uma denúncia.

---

## Autor

Projeto de extensão — Marcondes Sousa de Freitas.
