# B2Bit Frontend
Este projeto, chamado **b2bit-frontend**, é uma aplicação web de front-end desenvolvida como parte de um desafio de processo seletivo.

A aplicação é construída com:
- React: usado para criar a interface da aplicação com componentes interativos e reutilizáveis.
- TypeScript: adiciona tipagem ao JavaScript, prevenindo erros e tornando o código mais confiável.
- Vite: ferramenta de desenvolvimento e build que permite rodar a aplicação rapidamente.
- Tailwind CSS: framework de classes utilitárias para estilizar componentes de forma rápida e consistente.
- Shadcn/ui: biblioteca de componentes prontos e estilizados com Tailwind, acelerando a criação da interface.


## Funcionalidades principais
O foco do projeto é implementar um fluxo de autenticação de usuário. Ele possui duas rotas principais:
- Página de login (`/login`): o usuário insere e-mail e senha. A aplicação valida as credenciais via API, salva os tokens em caso de sucesso e redireciona para a página de perfil.
- Página de perfil (`/profile`): rota protegida, acessível apenas por usuários autenticados. Exibe os dados do usuário buscados na API.
- Logout: encerra a sessão e retorna o usuário à tela de login.


## Como executar o projeto
Este guia vai te ajudar a preparar e rodar a aplicação localmente.

### 1. Pré-requisitos
Certifique-se de ter instalado:
- Node.js
- npm

### 2. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/b2bit-frontend.git
cd b2bit-frontend
```

### 3. Instalar dependências
```bash
npm install
```

### 4. Rodar o projeto
```bash
npm run dev
```
Acesse no navegador: `http://localhost:5173`

### 5. Usar a aplicação
- Login: insira e-mail e senha
- Perfil: visualize seus dados
- Logout: encerre a sessão