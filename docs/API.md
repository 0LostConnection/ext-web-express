# API HTTP — backend Express

Base: `{ORIGIN}` (ex.: `http://localhost:{API_PORT}` — `API_PORT` definido em `.env` no backend).

Todas as respostas JSON seguem envelope:

| Situação | Formato |
|----------|---------|
| Sucesso | `{ "status": "success", "data": … }` |
| Erro | `{ "status": "error", "message": string, "errors?": … }` |

---

## Metadados

### `GET /`

| | |
|--|--|
| **Descrição** | Versão da API (lida de `backend/package.json`). |
| **Resposta 200** | `{ "status": "success", "data": { "version": string } }` |

---

## Feedbacks

Prefixo: **`/feedbacks`**

### `GET /feedbacks/` · `GET /feedbacks/lista`

| | |
|--|--|
| **Descrição** | Lista todos os feedbacks (memória; mesmo handler nas duas rotas). |
| **Corpo** | — |
| **Resposta 200** | `{ "status": "success", "data": Feedback[] }` |

**`Feedback`:**

| Campo | Tipo |
|-------|------|
| `id` | string (UUID) |
| `userName` | string |
| `message` | string |
| `createdAt` | string (ISO 8601) |

---

### `GET /feedbacks/:id`

| | |
|--|--|
| **Descrição** | Obtém um feedback pelo `id`. |
| **Parâmetros de rota** | `id` — UUID |
| **Resposta 200** | `{ "status": "success", "data": Feedback }` |
| **Resposta 404** | `{ "status": "error", "message": "Feedback não encontrado" }` |

---

### `POST /feedbacks/enviar`

| | |
|--|--|
| **Descrição** | Cria um feedback. |
| **Headers** | `Content-Type: application/json` |
| **Corpo** | Ver abaixo |
| **Resposta 201** | `{ "status": "success", "data": Feedback }` |
| **Resposta 400** | Validação Zod: `{ "status": "error", "message": "Corpo da requisição inválido", "errors": … }` |

**Corpo (JSON):**

| Campo | Tipo | Regra |
|-------|------|--------|
| `userName` | string | obrigatório, não vazio após trim |
| `message` | string | obrigatório, não vazio após trim |

---

### `DELETE /feedbacks/remover/:id`

| | |
|--|--|
| **Descrição** | Remove o feedback com o `id` indicado. |
| **Parâmetros de rota** | `id` — UUID |
| **Resposta 200** | `{ "status": "success", "message": "Feedback removido", "data": { "id": string } }` |
| **Resposta 404** | `{ "status": "error", "message": "Feedback não encontrado" }` |

---

## Resumo rápido

| Método | Caminho | Ação |
|--------|---------|------|
| GET | `/` | Versão da API |
| GET | `/feedbacks/` | Listar |
| GET | `/feedbacks/lista` | Listar (alias) |
| GET | `/feedbacks/:id` | Obter por ID |
| POST | `/feedbacks/enviar` | Criar |
| DELETE | `/feedbacks/remover/:id` | Remover |
