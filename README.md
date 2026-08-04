# Byte Finance Bank

Aplicação de gerenciamento financeiro desenvolvida com **Next.js** e o **Bytebank Design System** como parte do Tech Challenge — Fase 01 da Pós-Tech FIAP.

## Repositórios

| Repositório | Link |
|---|---|
| Aplicação (este repo) | https://github.com/elandro18/app-financa-grupo1 |
| Design System | https://github.com/xLeonel/bytebank-design-system |
| Storybook (docs interativa) | https://xleonel.github.io/bytebank-design-system |

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Biblioteca UI | [React 19](https://react.dev) |
| CSS | [Tailwind CSS v4](https://tailwindcss.com) |
| Linguagem | TypeScript 5 |
| Componentes | [@xleonel/bytebank-design-system](https://www.npmjs.com/package/@xleonel/bytebank-design-system) (Web Components com Lit) |
| Ícones | [lucide-react](https://lucide.dev) + [@heroicons/react](https://heroicons.com) |
| HTTP | [axios](https://axios-http.com) |
| Gráficos | [recharts](https://recharts.org) |

---

## Rodando em desenvolvimento

### Pré-requisitos

- **Node.js** 20 ou superior (recomendado: 22 LTS)
- **npm** 10 ou superior

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/elandro18/app-financa-grupo1.git
cd app-financa-grupo1

# 2. Configure a URL da API (opcional; veja "Variáveis de ambiente")
# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:4000** no navegador.

### Variáveis de ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API (login, cadastro, transações, saldo) | `http://localhost:3000/` |

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento (porta 4000) |
| `npm run build` | Gera o build de produção (output standalone) |
| `npm run start` | Inicia o servidor com o build de produção (porta 4000) |

### Docker

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=http://api.bytebank.example.com -t byte-finance-bank .
docker run -p 3000:3000 byte-finance-bank
```

> O container expõe a aplicação na porta **3000** internamente (`EXPOSE 3000`). A API base é configurada em build time via `--build-arg NEXT_PUBLIC_API_URL`.

---

## Funcionalidades

- **Landing page** — página pública com navbar e modais de acesso (`LoginModal`, `RegisterModal`, `SuccessModal`)
- **Autenticação** — login (`/login`) e cadastro (`/cadastro`) integrados à API; a área autenticada é protegida pelo `AuthGuard`, que redireciona para `/login` quando não há sessão
- **Home** — saudação, saldo da conta corrente, cards de serviços e gráficos financeiros (entradas/saídas, gastos por tipo, evolução do saldo)
- **Nova transação** — formulário com tipo (Depósito, Saque, Transferência Pix), valor com máscara BRL, agência/conta ou chave Pix, e data
- **Extrato** — listagem completa de transações agrupadas por mês
- **Editar transação** — modal para alterar nome e descrição de uma transação existente
- **Excluir transação** — remoção direto pelo modal de detalhes

---

## Backend e dados

A aplicação consome uma **API externa** via `axios` (cliente em `src/http/index.js`), que injeta o token JWT nas requisições:

| Endpoint | Uso |
|---|---|
| `POST /auth/token` | Login (retorna access token) |
| `POST /auth/register` | Cadastro |
| `GET /auth/profile` | Dados do usuário logado |
| `GET /transactions` | Listagem de transações |
| `GET /transactions/balance` | Saldo da conta |

- A sessão (token + usuário) é persistida no `localStorage`/`sessionStorage` (`src/lib/session.ts`).
- `src/contexts/Account` carrega os dados da conta e transações da API e os entrega ao `TransactionsContext`, que mantém o estado em memória. Operações de adicionar/editar/excluir atualizam o estado e refletem em tempo real nas páginas.

> Em desenvolvimento, sem `NEXT_PUBLIC_API_URL`, o cliente aponta para `http://localhost:3000/`.

---

## Design System

Os componentes visuais vêm do **Bytebank Design System** — uma biblioteca de Web Components publicada no npm, construída com Lit + Vite + TypeScript.

- 📦 **npm:** `@xleonel/bytebank-design-system`
- 📖 **Documentação / Storybook:** https://xleonel.github.io/bytebank-design-system
- 💻 **Repositório:** https://github.com/xLeonel/bytebank-design-system

Os componentes funcionam como elementos HTML nativos (Shadow DOM) e são integrados ao Next.js via Web Components — sem adaptadores. A biblioteca é carregada no cliente por `src/components/DsLoader.tsx`.

---

## Estrutura do projeto

```
src/
├── app/
│   ├── (logged)/                  # área autenticada (protegida pelo AuthGuard)
│   │   ├── _components/           # AuthGuard, Sidebar, LogoutButton, Field, Modal,
│   │   │   │                      # NewTransactionModal, TransactionDetailModal, TransactionList
│   │   ├── home/                  # painel principal (saldo, gráficos, transações recentes)
│   │   ├── extrato/               # listagem de transações agrupadas por mês
│   │   ├── nova-transacao/        # formulário de nova transação
│   │   └── layout.tsx             # header + sidebar + providers (Account, Transactions)
│   ├── cadastro/                  # página de cadastro
│   ├── login/                     # página de login
│   ├── components/                # modais públicos (Login, Register, Success) e Field
│   ├── _components/
│   │   └── PublicNavbar/          # navbar das páginas públicas
│   ├── not-found.tsx              # página 404
│   ├── layout.tsx                 # root layout
│   └── page.tsx                   # landing page
├── components/
│   └── DsLoader.tsx               # carrega o Design System no cliente
├── contexts/
│   ├── Account/                   # busca conta e transações da API
│   └── Transactions/              # estado em memória das transações (CRUD)
├── http/
│   └── index.js                   # cliente axios (base URL + interceptor de token)
├── lib/
│   ├── session.ts                 # sessão (token + usuário persistidos)
│   ├── systemAccount.ts           # integração com a API (perfil, transações, saldo)
│   ├── format.ts                  # formatação BRL e máscara
│   └── webcomponent.ts            # utilitários para Web Components
└── types/
    └── custom-elements.d.ts       # tipagem TypeScript dos Web Components
```
