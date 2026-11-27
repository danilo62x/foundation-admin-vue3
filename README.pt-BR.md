# Foundation Admin / Vue 3

[Read in English](./README.md)

[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue.svg)](./LICENSE) ![Grátis](https://img.shields.io/badge/pre%C3%A7o-gr%C3%A1tis-brightgreen)

Foundation Admin / Vue 3 é a implementação em Vue 3 do layout admin Foundation: 5 templates irmãos compartilham as mesmas 25 telas e a mesma identidade visual, um por stack. Este aqui é feito com Vue 3.5 com `<script setup>`, estilizado com Foundation Sites 6.8 (folha de estilo pré-compilada). Autenticação e dados são fictícios, então a aplicação inteira roda sem backend. Vem com tema claro e escuro, três idiomas e configuração de PWA.

## Páginas incluídas

25 views de rota em `src/views/`:

- Landing: página pública de marketing com hero, recursos e planos
- Login: formulário de acesso com validação e credenciais fictícias
- Register: formulário de criação de conta
- ForgotPassword: pedido de link de redefinição
- ResetPassword: formulário para definir a nova senha
- Dashboard: cartões de KPI com sparklines, gráficos e atividade recente
- Charts: página de analytics com gráficos de barra, área e rosca (ApexCharts)
- Forms: inputs, selects, date picker, upload de arquivos e validação inline
- Tables: tabela com ordenação, filtros, paginação e seleção de linhas
- Components: catálogo dos componentes de UI base
- UiAdvanced: modais, abas, toasts e outros widgets compostos
- Typography: escala tipográfica, títulos e utilitários de texto
- Integrations: cartões de serviços externos com liga/desliga
- Profile: página do usuário com dados pessoais e atividade
- Pricing: comparativo de planos
- Settings: preferências do app, tema e idioma
- Inbox: tela estilo webmail com pastas e lista de mensagens
- FileManager: listagem de arquivos com pastas e ações
- Gallery: grade de imagens
- Invoice: detalhe de fatura pronto para impressão
- Billing: formas de pagamento e histórico de faturas
- Documentation: página de referência do template dentro do app
- Maintenance: página isolada de manutenção
- ComingSoon: página isolada de pré-lançamento
- NotFound: página de erro 404

## Stack

- Vue 3.5 com `<script setup>` e TypeScript 5.7 (strict)
- Foundation Sites 6.8 (folha de estilo pré-compilada)
- Vite 6 com `vite-plugin-pwa` 1.3 (PWA instalável, cache offline)
- Vue Router 4.4 com rotas carregadas sob demanda
- Pinia 3 com `pinia-plugin-persistedstate` (stores auth, menu, ui)
- vue-i18n 11 com três idiomas (en, es, pt-BR)
- ApexCharts 5 via vue3-apexcharts 1.11
- TanStack Vue Table 8.21
- Editor de texto rico Tiptap 3 (`@tiptap/vue-3`, starter kit)
- Validação de formulários com VeeValidate 4.15 + Yup 1.7
- @vuepic/vue-datepicker 13

## Requisitos

- Node.js 18 ou mais novo
- npm

## Como rodar

```bash
npm install
npm run dev
```

O Vite sobe um servidor de desenvolvimento com hot reload. A autenticação é simulada em na store de auth do Pinia, então nenhum backend é necessário. Credenciais de demonstração:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build de produção

```bash
npm run build
```

Roda a checagem de tipos do TypeScript e gera o bundle de produção em `dist/`. Para conferir localmente: `npm run preview`.

## Estrutura do projeto

```
src/
├── assets/styles/     app.scss, _compat.scss
├── components/
│   ├── landing/       seções da landing page pública
│   ├── layout/        header, sidebar e footer
│   └── ui/            componentes de UI compartilhados
├── composables/       funções de composição compartilhadas
├── i18n/locales/      en.json, es.json, pt-BR.json
├── router/            definição de rotas e guards
├── stores/            auth.ts, menu.ts, ui.ts (Pinia)
└── views/             25 views de rota
```

## Tema e personalização

O Foundation entra pré-compilado (`foundation-sites/dist/css/foundation.min.css`), o que evita o atrito de resolução Sass da entrada original. O `src/assets/styles/app.scss` aplica o tema por cima. Abaixo ficam os tokens de design em tempo de execução, declarados como custom properties: a rampa da marca (`--color-brand-25` até `--color-brand-950`, com o 500 como primária #465fff), as cores de estado e os tokens semânticos de superfície sob o prefixo `--tx-` (sidebar, header, card, borda, texto). O modo escuro troca os valores `--tx-` em tempo de execução, a partir de uma classe no elemento raiz. Para trocar a marca, altere a rampa e os valores `--tx-` juntos. O `_compat.scss` implementa o vocabulário de utilitários que o markup compartilha com o original em Tailwind e liga os tokens aos componentes do framework, para que cards, tabelas e campos de formulário sigam o tema.

## Internacionalização

Três idiomas acompanham o template: inglês, espanhol e português do Brasil. O idioma do navegador é detectado no primeiro acesso e o seletor no header persiste a escolha.

## O mesmo layout em outras stacks

Este repositório é uma de 5 implementações do mesmo layout admin Foundation. Todas têm as mesmas 25 telas e a mesma identidade visual, e todas são gratuitas:

- React 19: https://github.com/danilo62x/foundation-admin-react
- Angular 19: https://github.com/danilo62x/foundation-admin-angular
- Laravel 11 + Blade: https://github.com/danilo62x/foundation-admin-laravel
- Static HTML: https://github.com/danilo62x/foundation-admin-html

Mais templates gratuitos (painéis admin, sistemas por segmento e apps Flutter): https://github.com/danilo62x?tab=repositories

## Licença

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
