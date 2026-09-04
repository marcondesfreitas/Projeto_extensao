Sistema de Denúncias de Problemas Locais

Sistema web desenvolvido para permitir que cidadãos registrem e acompanhem denúncias de problemas em locais públicos, como ruas danificadas, iluminação pública, lixo acumulado, problemas de infraestrutura, entre outros.

O sistema é desenvolvido utilizando Django no backend e Next.js no frontend.

🚀 Tecnologias
Backend
Python
Django
Django REST Framework
API REST
Frontend
Next.js
React
TypeScript
HTML5
CSS
📋 Funcionalidades
Cadastro de usuários
Login e autenticação
Criação de denúncias
Descrição do problema
Registro da localização
Classificação por categoria
Upload de imagens
Visualização das denúncias
Acompanhamento do status
Atualização do status das denúncias
Gerenciamento das denúncias
Painel administrativo
🏗️ Arquitetura

O projeto é dividido em duas partes principais:

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


O Next.js é responsável pela interface do sistema, enquanto o Django gerencia a API, autenticação, banco de dados e regras de negócio.

📁 Estrutura do projeto
projeto/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/
│   └── apps/
│
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   └── public/
│
└── README.md

⚙️ Instalação
Pré-requisitos

Antes de iniciar o projeto, tenha instalado:

Python 3.x
Node.js
npm
Git
Banco de dados utilizado pelo projeto
1. Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>

🔧 Backend

Entre na pasta do backend:

cd backend


Crie um ambiente virtual:

python -m venv venv


Ative o ambiente virtual.

Windows
venv\Scripts\activate

Linux / macOS
source venv/bin/activate


Instale as dependências:

pip install -r requirements.txt


Execute as migrações:

python manage.py migrate


Crie um superusuário:

python manage.py createsuperuser


Inicie o servidor:

python manage.py runserver


O backend estará disponível em:

http://127.0.0.1:8000

🎨 Frontend

Em outro terminal, entre na pasta do frontend:

cd frontend


Instale as dependências:

npm install


Crie o arquivo .env.local:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000


Execute o projeto:

npm run dev


O frontend estará disponível em:

http://localhost:3000

🔐 Variáveis de ambiente

As configurações sensíveis devem ser armazenadas em variáveis de ambiente.

Backend

Exemplo:

DEBUG=True
SECRET_KEY=sua-chave-secreta
DATABASE_URL=sua-url-do-banco

Frontend

Exemplo:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000


Nunca envie informações sensíveis ou arquivos .env para o repositório.

📝 Fluxo de uma denúncia

O processo de criação de uma denúncia funciona da seguinte forma:

O usuário acessa o sistema.
Realiza o cadastro ou login.
Acessa a opção de criar uma denúncia.
Seleciona a categoria do problema.
Adiciona uma descrição.
Informa a localização.
Pode adicionar imagens.
Envia a denúncia.
O Django registra a ocorrência.
Um responsável analisa a denúncia.
O status é atualizado conforme o andamento.
📊 Status das denúncias

As denúncias podem seguir o seguinte fluxo:

Pendente
   ↓
Em análise
   ↓
Em andamento
   ↓
Resolvido


Também pode existir o status:

Rejeitado


quando a denúncia não for considerada válida.

🌐 API

O backend disponibiliza uma API REST para comunicação com o frontend.

Exemplos de endpoints:

POST   /api/auth/login/
POST   /api/auth/register/

GET    /api/denuncias/
POST   /api/denuncias/
GET    /api/denuncias/{id}/
PUT    /api/denuncias/{id}/
DELETE /api/denuncias/{id}/

GET    /api/categorias/
GET    /api/localizacoes/


Os endpoints devem ser ajustados conforme a implementação atual do projeto.

🛠️ Painel administrativo

O Django disponibiliza um painel administrativo para gerenciamento do sistema.

Acesse:

http://127.0.0.1:8000/admin/


O painel pode ser utilizado para gerenciar:

Usuários
Denúncias
Categorias
Localizações
Status
Imagens
Demais informações do sistema
🧪 Testes

Para executar os testes do Django:

python manage.py test


Para executar o frontend em desenvolvimento:

npm run dev

📦 Produção
Frontend

Gerar o build:

npm run build


Executar:

npm start

Backend

Para produção, recomenda-se:

Utilizar DEBUG=False
Configurar uma SECRET_KEY segura
Configurar o banco de dados
Configurar CORS
Configurar ALLOWED_HOSTS
Configurar arquivos estáticos
Configurar arquivos de mídia
Utilizar HTTPS
Utilizar um servidor de aplicação adequado
🔒 Segurança

O sistema deve utilizar boas práticas de segurança, incluindo:

HTTPS em produção
Senhas armazenadas de forma segura
Proteção dos endpoints administrativos
Validação dos dados enviados
Validação dos arquivos enviados
Configuração correta do CORS
DEBUG=False em produção
Variáveis sensíveis fora do código-fonte
🤝 Contribuição

Para contribuir com o projeto, crie uma nova branch:

git checkout -b feature/nova-funcionalidade


Faça suas alterações:

git add .
git commit -m "feat: adiciona nova funcionalidade"


Envie a branch:

git push origin feature/nova-funcionalidade


Depois, abra um Pull Request.

📄 Licença

Este projeto está sob a licença definida pelos autores.

👨‍💻 Tecnologias utilizadas
Django
Django REST Framework
Next.js
React
TypeScript
Python