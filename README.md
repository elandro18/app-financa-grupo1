# Byte Finance Bank

## Stack

| Camada          | Tecnologia                                        |
| --------------- | ------------------------------------------------- |
| Framework       | [Next.js 16.2.6](https://nextjs.org) (App Router) |
| Biblioteca UI   | [React 19.2.4](https://react.dev)                 |
| CSS             | [Tailwind CSS v4](https://tailwindcss.com)        |
| Linguagem       | TypeScript 5                                      |
| Ícones          | [lucide-react](https://lucide.dev)                |
| Package manager | pnpm                                              |

## Setup

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

### Scripts

| Comando    | Faz                |
| ---------- | ------------------ |
| `pnpm dev` | Dev server (Turbo) |

## Estrutura

```
src/
├── app/
│   ├── (logged)/                  # route group: páginas pós-login
│   │   ├── _components/           # componentes compartilhados entre rotas
│   │   │   ├── Field/             # wrapper de input + constantes de estilo
│   │   │   ├── Modal/             # Modal genérico + ModalHeader
│   │   │   ├── NewTransactionModal/
│   │   │   ├── TransactionDetailModal/
│   │   │   ├── TransactionList/   # lista usada por home + extrato
│   │   │   └── Sidebar/
│   │   ├── home/
│   │   │   ├── _components/       # exclusivos da home
│   │   │   └── page.tsx
│   │   ├── extrato/
│   │   │   ├── _components/
│   │   │   ├── _constants/        # MONTH_NAMES (no nível de rota)
│   │   │   └── page.tsx
│   │   └── layout.tsx             # header + Sidebar + TransactionsProvider
│   ├── login/page.tsx             # placeholder (vazio)
│   ├── globals.css                # Tailwind + tokens via @theme inline
│   ├── layout.tsx                 # root
│   └── page.tsx                   # landing
├── contexts/                      # React Contexts (state global)
│   └── Transactions/index.tsx     # TransactionsProvider + useTransactions()
├── lib/                           # helpers compartilhados entre todo o app
│   ├── auth.ts                    # getCurrentUser() — fonte única do usuário ativo
│   └── format.ts                  # brl (Intl), maskAmount
└── mocks/
    └── users.json                 # dados de mock (3 usuários)
```

## Convenções

### Pastas de componente

Cada componente vive em uma pasta nomeada em PascalCase com `index.tsx`:

```
ComponentName/
├── index.tsx
├── types/index.ts             # se tiver tipos (Props, etc)
├── constants/index.ts         # se tiver constantes (strings, arrays)
├── helpers/index.ts           # se tiver funções auxiliares puras
└── hooks/
    └── useFoo/index.ts        # um hook por subpasta camelCase
```

- **Sem tipos? Sem `types/`.** Não cria pasta vazia.
- **Sem constantes? Sem `constants/`.** Idem.
- **Sem helpers? Sem `helpers/`.** Idem.
- **Sem hooks? Sem `hooks/`.** Idem.
- `types/`, `constants/` e `helpers/` são arquivos únicos (`index.ts`). `hooks/` agrupa subpastas — **uma por hook**, com nome em camelCase igual ao da função (`useFoo/index.ts`). Permite escalar quando o componente tem mais de um hook.
- O `index.tsx` importa via `./types`, `./constants`, `./helpers`, e `./hooks/useFoo` (caminho explícito até o hook).

Exemplos:

- `Field/` tem `types/` e `constants/`
- `Modal/` só tem `types/`
- `Sidebar/` só tem `constants/`
- `ExtratoView/` tem `types/` e `helpers/` (`groupByMonth`)
- `NewTransactionModal/` tem todos: `types/`, `constants/`, `helpers/` (`parseAmount`, `toDisplayDate`) e `hooks/useNewTransactionForm/`
- `ServicesCard/` não tem nenhum

### Folders não-rotáveis (`_`)

Prefixo `_` marca pastas que **não geram rota** no App Router, mesmo dentro de route segments:

- `_components/` em `(logged)/` e em rotas específicas
- `_constants/` em `extrato/` (constantes no nível de rota)

> **Dentro de `_components/` o underscore não se repete** — já estamos em escopo não-rotável. Por isso usamos `_components/Modal/types/` (sem `_`), mas `extrato/_constants/` (com `_`).

### Imports com alias `@/`

O `tsconfig.json` configura o alias `"@/*": ["./src/*"]`. Isso permite importar de qualquer lugar do projeto sem ficar fazendo `../../../` longos:

```ts
// ❌ relativo "ladeira abaixo" — frágil e ilegível
import { getCurrentUser } from "../../../../lib/auth";

// ✅ com alias — começa sempre em `src/`
import { getCurrentUser } from "@/lib/auth";
```

Convenção do projeto:

- **Use `@/`** quando importar de pastas "estáveis": `@/lib/...`, `@/mocks/...`, ou cruzando seções (ex: `home/` importando de `extrato/`)
- **Use `./` ou `../`** pra arquivos da própria pasta ou imediatamente vizinhos: `./types`, `./constants`, `../Modal`

Exemplo real (`NewTransactionModal/index.tsx`):

```ts
import { maskAmount } from "@/lib/format"; // @/ para lib compartilhada
import { useTransactions } from "@/lib/transactions-context"; // @/ idem
import { BTN_PRIMARY_CLS, Field, INPUT_CLS } from "../Field"; // vizinho
import { Modal, ModalHeader } from "../Modal"; // vizinho
import { TRANSACTION_TYPES } from "./constants"; // mesma pasta
import type { Props } from "./types"; // mesma pasta
```

A regra prática: se subir **2 ou mais níveis** (`../../`), troca pra `@/`.

### Re-exports para evitar paths longos

`Field/index.tsx` re-exporta as constantes:

```ts
export {
  BTN_DANGER_CLS,
  BTN_PRIMARY_CLS,
  INPUT_CLS,
  INPUT_DISABLED_CLS,
} from "./constants";
```

Assim consumidores importam de `../Field` em vez de `../Field/constants`. Mesmo padrão pra tipos públicos: `TransactionDetailModal/index.tsx` re-exporta `Transaction`.

## Arquitetura

### Camada de dados

Toda leitura de dados do "usuário atual" passa por **`getCurrentUser()`** em `src/lib/auth.ts`:

```ts
import mock from "@/mocks/users.json";

export function getCurrentUser() {
  return mock.users[0]; // hoje fixo no índice 0
}
```

Quando o login real existir, **só esse arquivo muda** — três pontos consumem: `(logged)/layout.tsx`, `home/page.tsx`, e (transitivamente, via Provider) o resto.

### State de transações

Como adicionar/editar/excluir transações precisa atualizar várias telas em tempo real (home + extrato + saldo), o estado vive em um **Context**:

```
src/contexts/Transactions/index.tsx
├── TransactionsProvider — envolve {children} em (logged)/layout.tsx
├── useTransactions() — hook usado por:
│   ├── BalanceCard (lê balance)
│   ├── RecentTransactionsCard (lê transactions)
│   ├── ExtratoView (lê transactions)
│   ├── NewTransactionModal (chama addTransaction)
│   └── TransactionDetailModal (chama updateTransaction, deleteTransaction)
└── Operações: addTransaction, updateTransaction, deleteTransaction
```

#### Cálculo do saldo

O `balance` no Context é derivado dinamicamente:

```
baseline = saldoInicial − Σ(transaçõesIniciais)
balance  = baseline + Σ(transaçõesAtuais)
```

O `saldoInicial` representa o estado **depois** das transações iniciais, então cada nova transação mexe direto no display. O React Compiler memoiza o cálculo automaticamente.

### Tipo `Transaction`

Vive em `_components/TransactionDetailModal/types/index.ts` (re-exportado do `index.tsx`). Forma:

```ts
{
  id: string;
  type: string;       // "Depósito", "Transferência", "Pix"
  amount: number;     // positivo = entrada, negativo = saída
  date: string;       // "DD/MM/YYYY"
  description?: string;
}
```

Convenção de sinal: `Depósito` é positivo; `Transferir`/`Pix` ficam negativos automaticamente no `NewTransactionModal`.

### Helpers de formatação

`src/lib/format.ts`:

| Helper            | Faz                                                                      |
| ----------------- | ------------------------------------------------------------------------ |
| `brl`             | `Intl.NumberFormat` pt-BR / BRL. Use `brl.format(amount)`                |
| `maskAmount(raw)` | Máscara em tempo real: trata dígitos como centavos. `"1234"` → `"12,34"` |


