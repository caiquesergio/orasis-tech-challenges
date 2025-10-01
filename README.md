# Dashboard de Métricas - Orasis Tech Challenge

## 📊 Visão Geral

Este projeto é um dashboard administrativo desenvolvido em Next.js para visualização de métricas de usuários da plataforma. O dashboard exibe cards informativos com dados sobre usuários totais, ativos, inativos e administradores, com atualizações em tempo real.

## ✨ Funcionalidades

### Obrigatórias ✅
- [x] Dashboard responsivo com cards de métricas
- [x] Exibição de total de usuários, usuários ativos, inativos e administradores
- [x] Consumo de dados mockados via JSON
- [x] Implementação em Next.js com TypeScript
- [x] Testes unitários com Jest e Testing Library
- [x] Pipeline de CI/CD com GitHub Actions

### Opcionais ✅
- [x] Atualização em tempo real via polling (30 segundos)
- [x] Uso de ícones Material-UI
- [x] Animações e microinterações com Framer Motion
- [x] Acessibilidade básica (ARIA labels, navegação por teclado)
- [x] Deploy automatizado via pipeline
- [x] Análise de performance com Lighthouse
- [x] Componentes reutilizáveis e bem organizados

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações e transições
- **Material-UI Icons** - Iconografia
- **Jest + Testing Library** - Testes unitários
- **GitHub Actions** - CI/CD Pipeline
- **Lighthouse CI** - Análise de performance

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18.x ou superior
- npm ou yarn

### Instalação e Execução

```bash
# Clone o repositório
git clone <repository-url>

# Navegue para o diretório do projeto
cd dashboard-app

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Servidor de produção
npm start

# Testes
npm run test          # Executa os testes
npm run test:watch    # Testes em modo watch
npm run test:coverage # Testes com coverage

# Linting
npm run lint
```

## 🧪 Testes

O projeto inclui testes unitários cobrindo:

- Utilitários de formatação e cálculo
- Componentes React
- Hooks customizados
- Funções de API mockada

```bash
# Executar todos os testes
npm run test

# Executar com coverage
npm run test:coverage

# Executar em modo watch
npm run test:watch
```

## 📁 Estrutura do Projeto

```
dashboard-app/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx           # Página inicial
│   ├── components/             # Componentes React
│   │   ├── Dashboard.tsx       # Componente principal
│   │   ├── MetricCard.tsx      # Card de métrica
│   │   ├── LoadingSpinner.tsx  # Componente de loading
│   │   ├── ErrorMessage.tsx    # Componente de erro
│   │   └── __tests__/         # Testes dos componentes
│   ├── hooks/                  # Custom hooks
│   │   └── useDashboard.ts    # Hook para dados do dashboard
│   ├── types/                  # Definições de tipos TypeScript
│   │   └── dashboard.ts       # Tipos do dashboard
│   └── utils/                  # Utilitários
│       ├── api.ts             # Funções de API mockada
│       └── __tests__/         # Testes dos utilitários
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline CI/CD
├── public/                    # Arquivos estáticos
├── jest.config.js            # Configuração do Jest
├── jest.setup.js             # Setup dos testes
├── tailwind.config.js        # Configuração do Tailwind
├── tsconfig.json             # Configuração do TypeScript
└── package.json              # Dependências e scripts
```

## 🎨 Design e UX

### Características do Design
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Acessível**: Implementa boas práticas de acessibilidade
- **Moderno**: Interface limpa e profissional
- **Animado**: Transições suaves e microinterações

### Paleta de Cores
- **Azul**: Métricas principais e elementos primários
- **Verde**: Usuários ativos e indicadores positivos
- **Amarelo**: Usuários inativos e alertas
- **Roxo**: Administradores e funcionalidades avançadas

## ⚡ Performance

O projeto foi otimizado para performance:

- **Lazy Loading**: Carregamento otimizado de componentes
- **Code Splitting**: Divisão automática do código
- **Image Optimization**: Otimização automática de imagens
- **Caching**: Estratégias de cache do Next.js
- **Bundle Analysis**: Análise do tamanho do bundle

## 🔄 Atualização em Tempo Real

O dashboard implementa atualização automática via polling:

- **Intervalo**: 30 segundos (configurável)
- **Graceful Loading**: Não interrompe a experiência do usuário
- **Error Recovery**: Tratamento automático de erros
- **Manual Refresh**: Botão para atualização manual

## 🌐 Deploy

### Configuração de Deploy

O projeto está configurado para deploy automatizado via GitHub Actions:

1. **Build e Testes**: Executa automaticamente em PRs e pushes
2. **Análise de Qualidade**: Lighthouse CI para performance
3. **Deploy**: Automatizado para produção na branch main

### Plataformas Suportadas
- **Vercel** (configuração incluída)
- **Netlify** (compatível)
- **AWS Amplify** (compatível)
- **Docker** (Dockerfile pode ser adicionado)

## 🧩 Funcionalidades Técnicas

### Hooks Customizados
- `useDashboard`: Gerencia estado e polling dos dados
- `useCounterAnimation`: Animação de contadores

### Componentes Reutilizáveis
- `MetricCard`: Card genérico para métricas
- `LoadingSpinner`: Indicador de carregamento
- `ErrorMessage`: Tratamento de erros

### Utilitários
- Formatação de números grandes (1K, 1M)
- Cálculo automático de usuários inativos
- Sanitização e validação de dados

## 🔒 Boas Práticas Implementadas

### Código
- **TypeScript**: Tipagem forte em todo o projeto
- **ESLint + Prettier**: Padronização de código
- **Commits Convencionais**: Histórico organizado
- **Componentização**: Componentes pequenos e reutilizáveis

### Testes
- **Cobertura de Código**: Meta de >70% de cobertura
- **Testes de Acessibilidade**: Validação de ARIA labels
- **Mocks**: Simulação de APIs e dependências externas

### Performance
- **Core Web Vitals**: Otimização para métricas do Google
- **Tree Shaking**: Remoção de código não utilizado
- **Compression**: Compressão automática de assets
