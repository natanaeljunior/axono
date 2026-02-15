# ResidencyFlow

Base de um app React com Vite.

## Pré-requisitos

- Node.js 18+

## Como rodar

```bash
# Instalar dependências
npm install

# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Estrutura do projeto

```
src/
  components/   # Componentes reutilizáveis
  pages/        # Páginas/rotas
  hooks/        # Custom hooks
  utils/        # Funções utilitárias
  assets/       # Imagens, ícones, etc.
  App.jsx       # Componente raiz
  main.jsx      # Entry point
  index.css     # Estilos globais
```

## Alias de import

Use `@/` para importar a partir de `src/`:

```js
import { MeuComponente } from '@/components/MeuComponente'
```
