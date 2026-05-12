# Feedback do curso online

API Express + interface React (Vite). Dados só em memória enquanto o servidor roda. Sem banco, sem API externa.

## Pastas

| Pasta | Conteúdo |
|-------|-----------|
| `backend/` | Express, Zod, CORS |
| `frontend/` | React: `/` (form) e `/feedbacks/lista` (lista) |
| `docs/` | `docs/API.md` |

## Requisitos

Node.js e npm.

## Instalar

```bash
npm run install:backend
npm run install:frontend
```

Para `npm run dev:all` na raiz:

```bash
npm install
```

## Ambiente

### `backend/.env`

```bash
cp backend/.env.example backend/.env
```

Mínimo:

```env
API_PORT=3000
```

CORS opcional (várias origens, vírgula):

```env
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
```

### `frontend/.env.development`

Porta igual ao backend:

```env
API_PROXY_TARGET=http://localhost:3000
```

Chamada direta à API (opcional):

```env
VITE_API_BASE_URL=http://localhost:3000
```

Com `VITE_API_BASE_URL`, ajuste CORS no backend se precisar.

## Desenvolvimento

Proxy do Vite manda `/feedbacks` para `API_PROXY_TARGET` (padrão `http://localhost:3000`). API desligada ou porta errada: 502 no browser, `ECONNREFUSED` no terminal do Vite.

**Um comando (recomendado):**

```bash
npm install
npm run dev:all
```

Abrir `http://localhost:5173` (HTTP, como o Vite indicar).

**Dois terminais:** `npm run dev` e `npm run dev:frontend`.

### Problemas

| Sintoma | Checar |
|---------|--------|
| 502 ou `ECONNREFUSED` em `/feedbacks/*` | Backend ligado? Mesma porta em `API_PORT` e `API_PROXY_TARGET`? |
| Porta em uso | Mesmo número no `.env` do backend e no proxy do frontend |

## API

Detalhes: [`docs/API.md`](docs/API.md).

- `GET /`: versão
- `GET /feedbacks/lista`: lista
- `POST /feedbacks/enviar`: cria (`userName`, `message`)
- `POST /feedbacks/remover/:id`: remove (body `{}`)

## Build

Frontend:

```bash
npm run build:frontend
```

Preview:

```bash
cd frontend && npm run preview
```

Backend:

```bash
cd backend && npm run build
```

Produção: estático + `VITE_API_BASE_URL` ou proxy na mesma origem; CORS nos domínios reais.

## Scripts (raiz)

| Script | Função |
|--------|--------|
| `npm run dev:all` | Backend + Vite |
| `npm run dev` | Só backend |
| `npm run dev:frontend` | Só Vite |
| `npm run start` | Backend sem watch |
| `npm run install:all` | Instala raiz, backend e frontend |
| `npm run install:backend` / `install:frontend` | Instala um pacote |
| `npm run build:frontend` | Build React |

## Licença

[`LICENSE`](LICENSE).
