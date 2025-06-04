# @onda/types

Repositório centralizado de tipos TypeScript para todos os aplicativos da Onda (pacote privado).

bunx npm version minor --no-git-tag-version --no-git-checks
git init
git add .
git commit -m "⚡ perf: "
git push -u origin producao

<!-- index.ts
import BackendWorkerFinanceiro from "./backend-wroker-financeiro";
export type t = typeof BackendWorkerFinanceiro; -->

## Instalação

```bash
npm install @onda/types
# ou
yarn add @onda/types
```

**Nota:** Este é um pacote privado. Certifique-se de ter acesso à organização `@onda` no npm.

## Uso

### Importando types de aplicações específicas

```typescript
// Para o backend-wave
import { User, Wave, CreateWaveRequest } from "@onda/types/backend-wave";
// ou importar tudo
import BackendWaveTypes from "@onda/types/backend-wave";

// Para o backend-onda
import { Profile, Post, CreatePostRequest } from "@onda/types/backend-onda";
// ou importar tudo
import BackendOndaTypes from "@onda/types/backend-onda";
```

### Importando types comuns

```typescript
// Types comuns disponíveis no pacote principal
import { BaseEntity, PaginationParams, ApiResponse } from "@onda/types";
```

### Exemplo de uso prático

```typescript
// Em um componente React
import { User, Wave } from "@onda/types/backend-wave";
import { Profile, Post } from "@onda/types/backend-onda";

interface Props {
    user: User;
    waves: Wave[];
    profile: Profile;
    posts: Post[];
}

const MyComponent: React.FC<Props> = ({ user, waves, profile, posts }) => {
    // Seu código aqui
};
```

```typescript
// Em uma função de API
import { CreateWaveRequest, WaveResponse } from "@onda/types/backend-wave";

async function createWave(data: CreateWaveRequest): Promise<WaveResponse> {
    // Implementação da função
}
```

## Estrutura do Projeto

```
@onda/types/
├── backend-wave/
│   ├── index.d.ts    # Types do backend-wave
│   └── index.js      # Compatibilidade JS
├── backend-onda/
│   ├── index.d.ts    # Types do backend-onda
│   └── index.js      # Compatibilidade JS
├── index.d.ts        # Types comuns
├── index.js          # Arquivo principal JS
└── package.json
```

## Types Disponíveis

### Backend Wave

-   `User` - Dados do usuário
-   `Wave` - Dados de uma wave
-   `CreateWaveRequest` - Payload para criar wave
-   `UpdateWaveRequest` - Payload para atualizar wave
-   `WaveResponse` - Resposta da API para wave
-   `WaveListResponse` - Resposta da API para lista de waves

### Backend Onda

-   `Profile` - Perfil do usuário
-   `Post` - Dados de um post
-   `CreatePostRequest` - Payload para criar post
-   `UpdatePostRequest` - Payload para atualizar post
-   `PostResponse` - Resposta da API para post
-   `PostListResponse` - Resposta da API para lista de posts
-   `Follow` - Dados de follow
-   `FollowStats` - Estatísticas de seguidores
-   `Notification` - Dados de notificação

### Types Comuns

-   `BaseEntity` - Interface base para entidades
-   `PaginationParams` - Parâmetros de paginação
-   `PaginatedResponse<T>` - Resposta paginada genérica
-   `ApiResponse<T>` - Resposta da API genérica
-   `ErrorResponse` - Resposta de erro padrão

## Adicionando Novos Apps

Para adicionar types de um novo app:

1. Crie uma nova pasta com o nome do app (ex: `frontend-mobile/`)
2. Adicione os arquivos `index.d.ts` e `index.js`
3. Atualize o `package.json` adicionando o novo export no campo `exports`
4. Adicione a pasta no campo `files`
5. Atualize este README

Exemplo para adicionar `mobile-app`:

```json
// No package.json, adicione em exports:
"./mobile-app": {
  "types": "./mobile-app/index.d.ts",
  "import": "./mobile-app/index.js",
  "require": "./mobile-app/index.js"
}

// E em files:
"files": [
  "backend-wave/**/*",
  "backend-onda/**/*",
  "mobile-app/**/*",
  "index.d.ts",
  "index.js"
]
```

## Scripts

-   `npm run build` - Compila os types TypeScript
-   `npm publish` - Publica o pacote no npm (roda build automaticamente)

## Versionamento

Siga o padrão [Semantic Versioning](https://semver.org/):

-   **MAJOR**: Mudanças que quebram compatibilidade
-   **MINOR**: Adição de funcionalidades mantendo compatibilidade
-   **PATCH**: Correções de bugs mantendo compatibilidade

## Funções

POST:: criar
GET:: buscar_pelo_filtro
GET:: buscar_pelo_id
PATCH:: atualizar_pelo_id
DELETE:: deletar_pelo_id
