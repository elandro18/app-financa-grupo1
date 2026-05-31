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
| Ícones | [lucide-react](https://lucide.dev) |

---

## Rodando em desenvolvimento

### Pré-requisitos

- **Node.js** 18 ou superior
- **npm** 9 ou superior

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/elandro18/app-financa-grupo1.git
cd app-financa-grupo1

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

> A aplicação redireciona automaticamente para `/home` enquanto o login não está implementado. Clique em **"Já tenho conta"** na tela inicial ou acesse `/home` diretamente.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor com o build de produção |

---

## Funcionalidades

- **Home** — saldo da conta corrente e últimas transações
- **Nova transação** — formulário com tipo (Depósito, Saque, Pix), valor com máscara BRL, agência/conta ou chave Pix, e data
- **Extrato** — listagem completa de transações agrupadas por mês
- **Editar transação** — modal para alterar nome e descrição de uma transação existente
- **Excluir transação** — remoção direto pelo modal de edição

---

## Dados mockados

Não há back-end. Os dados são gerenciados via **React Context** (`TransactionsContext`) com estado local inicializado a partir de `src/mocks/users.json`. Todas as operações (adicionar, editar, excluir) atualizam o estado em memória e refletem em tempo real em todas as páginas.

---

## Design System

Os componentes visuais vêm do **Bytebank Design System** — uma biblioteca de Web Components publicada no npm, construída com Lit + Vite + TypeScript.

- 📦 **npm:** `@xleonel/bytebank-design-system`
- 📖 **Documentação / Storybook:** https://xleonel.github.io/bytebank-design-system
- 💻 **Repositório:** https://github.com/xLeonel/bytebank-design-system

Os componentes funcionam como elementos HTML nativos (Shadow DOM) e são integrados ao Next.js via Web Components — sem adaptadores.

---

## Estrutura do projeto

```
src/
├── app/
│   ├── (logged)/                  # páginas pós-login (sidebar + layout fixo)
│   │   ├── _components/           # componentes compartilhados
│   │   │   ├── Sidebar/
│   │   │   ├── LogoutButton/
│   │   │   └── NewTransactionModal/
│   │   ├── home/                  # página inicial
│   │   ├── extrato/               # listagem de transações
│   │   ├── nova-transacao/        # formulário de nova transação
│   │   └── layout.tsx
│   ├── _components/
│   │   └── PublicNavbar/          # navbar das páginas públicas
│   ├── not-found.tsx              # página 404
│   ├── layout.tsx                 # root layout
│   └── page.tsx                   # landing page
├── contexts/
│   └── Transactions/              # estado global de transações
├── lib/
│   ├── auth.ts                    # usuário atual (mock)
│   └── format.ts                  # formatação BRL e máscara
├── mocks/
│   └── users.json                 # dados iniciais mockados
└── types/
    └── custom-elements.d.ts       # tipagem TypeScript dos Web Components
```
