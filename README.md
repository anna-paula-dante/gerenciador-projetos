# Gerenciador de Projetos

Aplicação Front-end para gerenciar projetos: criar, editar, remover, favoritar,
filtrar, ordenar e pesquisar. Toda a persistência é feita no `localStorage`
(sem backend). O layout foi desenvolvido com base nas telas de referência fornecidas no Figma.

## Tecnologias

- **React 18** + **TypeScript**
- **Vite 5** (build e dev server)
- **React Router 6** (rotas)
- **CSS Modules** (estilos por componente + tokens globais em `src/index.css`)
- **lucide-react** (ícones)
- `localStorage` para persistência

## Requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Execução (desenvolvimento)

```bash
npm run dev
```

Aplicação disponível em `http://localhost:5173`.

## Build de produção

```bash
npm run build      # typecheck (tsc) + build (vite)
npm run preview    # serve o build gerado em dist/
```

## Lint

```bash
npm run lint
```

## Funcionalidades implementadas

- **Estado inicial vazio**: sem nenhum projeto, sem seed. Exibe o empty state
  ("Nenhum projeto") com botão para criar o primeiro.
- **Listagem** (`/`): grid de até 5 cards por linha no desktop, responsivo até 1 coluna.
  Contador `Projetos (X)` sempre com o total cadastrado, independente de filtros.
- **Card do projeto**: capa (imagem real ou placeholder roxo), nome, cliente,
  data de início e data final formatadas em pt-BR (`01 de setembro de 2024`),
  estrela de favorito e menu de opções.
- **CRUD completo**:
  - Novo projeto (`/projects/new`)
  - Editar projeto (`/projects/:id/edit`) — mantém `id`, `favorite`, `createdAt`
    e atualiza `updatedAt`. URL inválida mostra "Projeto não encontrado".
  - Remover projeto — modal de confirmação com overlay, `role="dialog"` e Escape.
- **Favoritos**: clique na estrela alterna `favorite` e persiste imediatamente.
  Toggle "Apenas Favoritos" filtra a listagem sem afetar o contador total.
- **Ordenação** (dropdown acessível customizado — `role="listbox"`, navegação por
  teclado —, padrão "Ordem alfabética"):
  - Ordem alfabética — `Intl.Collator('pt-BR')` (com ordenação numérica).
  - Iniciados mais recentes — `startDate` decrescente.
  - Prazo mais próximo — `endDate` crescente.
  - Funciona em conjunto com o filtro de favoritos.
- **Upload de capa**: aceita `.jpg`, `.jpeg`, `.png`, limite de 2 MB, convertida
  para Data URL (Base64) e salva no `localStorage`. Preview + remoção da capa.
- **Validações do formulário**:
  - Nome: ao menos dois tokens alfanuméricos separados por espaço (ex.: `Projeto
    01` é válido) — "Por favor, digite ao menos duas palavras".
  - Cliente: ao menos um token alfanumérico — "Por favor, digite ao menos uma palavra".
  - Datas: obrigatórias e válidas — "Selecione uma data válida".
  - Data final não pode ser anterior à inicial.
  - Erros aparecem em blur ou ao tentar salvar; botão "Salvar projeto"
    desabilitado enquanto o formulário estiver inválido.
- **Busca** (ícone de lupa no header → `/search?q=termo`):
  - Disparada apenas com **3 ou mais caracteres** válidos.
  - Case insensitive e accent insensitive (`normalize('NFD')` + remoção de diacríticos).
  - Tela "Resultado da busca" com os cards correspondentes ou estado vazio.

## Requisitos opcionais implementados

- **Histórico das últimas 5 buscas**: persistido em `localStorage`, no máximo 5
  itens, sem duplicar termos (um termo repetido volta para o topo). Cada item tem
  ícone de histórico, texto e botão de remoção individual. Clicar em um item
  reexecuta a busca.
- **Highlight da pesquisa**: o trecho correspondente ao termo é destacado dentro
  do nome do projeto. Implementado com um componente seguro (`HighlightText`) que
  divide o texto em segmentos — **sem `dangerouslySetInnerHTML`**. O match
  respeita maiúsculas/minúsculas e acentos, preservando o texto original.

## Uso de localStorage

O acesso é centralizado — nenhum componente chama `localStorage` diretamente.

- `src/services/storage.ts` — helpers genéricos `readJSON` / `writeJSON`.
- `src/services/projects.ts` — chave `project-manager:projects`. Expõe
  `createProject`, `updateProject`, `deleteProject`, `toggleFavorite`,
  `sortProjects`, `getProjectById` e um store observável
  (`subscribeProjects` / `getProjectsSnapshot`).
- `src/services/searchHistory.ts` — chave `project-manager:search-history`.
  Expõe `addSearchTerm`, `removeSearchTerm` e um store observável.

Os hooks `useProjects` e `useSearchHistory` usam `useSyncExternalStore` para
manter a UI sincronizada com o `localStorage`. Recarregar a página não apaga
projetos, favoritos, capas ou histórico.

## Modelo de dados

```ts
interface Project {
  id: string
  name: string
  client: string
  startDate: string // yyyy-mm-dd
  endDate: string   // yyyy-mm-dd
  cover?: string     // Data URL (Base64)
  favorite: boolean
  createdAt: string  // ISO
  updatedAt: string  // ISO
}
```

## Estrutura do projeto

```
src/
  components/
    BackLink/            HighlightText/       ProjectGrid/
    CoverUpload/         Layout/              ProjectMenu/
    DeleteProjectModal/  NewProjectButton/    SearchBar/
    EmptyState/          ProjectCard/         SearchHistory/
    FavoriteToggle/      ProjectForm/         SearchOverlay/
    Header/              SortSelect/
  hooks/
    useProjects.ts       useSearchHistory.ts
  pages/
    Projects/            NewProject/          EditProject/     SearchResults/
  routes/
    AppRoutes.tsx
  services/
    storage.ts           projects.ts          searchHistory.ts
  types/
    project.ts
  utils/
    date.ts              highlight.ts          text.ts          validation.ts
  index.css              main.tsx
```

## Rotas

| Rota                  | Tela                       | Header escuro |
| --------------------- | -------------------------- | ------------- |
| `/`                   | Listagem de projetos       | sim           |
| `/projects/new`       | Criar projeto              | sim           |
| `/projects/:id/edit`  | Editar projeto             | sim           |
| `/search?q=termo`     | Resultado da pesquisa      | não           |

A rota `/search` não utiliza o header escuro das demais telas; ela inicia
diretamente pela barra de busca, seguindo a estrutura definida no layout de referência.

## Principais decisões técnicas

- **Sem Redux**: um store mínimo por serviço + `useSyncExternalStore` já mantém
  todas as telas sincronizadas com o `localStorage` com pouco código.
- **`localStorage` como fonte única**: os serviços mantêm um cache em memória
  espelhado no `localStorage` e notificam os assinantes a cada alteração.
- **Datas como `yyyy-mm-dd`**: compatível com `<input type="date">` e com
  comparação lexicográfica direta para ordenação/validação. A formatação pt-BR
  usa `Intl.DateTimeFormat` com parsing local para evitar deslocamento de fuso.
- **Busca sem acento/caixa**: `normalize('NFD')` + remoção de diacríticos.
  O highlight usa um mapa de índices para casar o texto "achatado" e ainda
  devolver o texto original (com acento/caixa) em cada segmento.
- **Capa em Base64**: sem backend, a imagem é embutida como Data URL, com limite
  de 2 MB para não estourar a cota do `localStorage`.
