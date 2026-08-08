# Foundation Admin / Vue 3

[Leia em português](./README.pt-BR.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE) ![Free](https://img.shields.io/badge/price-free-brightgreen)

Foundation Admin / Vue 3 is the Vue 3 implementation of the Foundation admin layout: 5 sibling templates share the same 25 screens and the same visual identity, one per stack. This one is built with Vue 3.5 with `<script setup>`, styled with Foundation Sites 6.8 (prebuilt stylesheet). Authentication and data are mocked, so the whole application runs without a backend. It ships with a light and a dark theme, three languages and an installable PWA setup.

Live preview: https://template.dev.br/preview/foundation-admin-vue3/

## Pages included

25 route views in `src/views/`:

- Landing: public marketing page with hero, feature and pricing sections
- Login: sign-in form with validation and mock credentials
- Register: account creation form
- ForgotPassword: request form for a reset link
- ResetPassword: form to set a new password
- Dashboard: KPI stat cards with sparklines, charts and recent activity
- Charts: analytics page with bar, area and donut charts (ApexCharts)
- Forms: inputs, selects, date picker, file upload and inline validation
- Tables: data table with sorting, filtering, pagination and row selection
- Components: catalog of the base UI components
- UiAdvanced: modals, tabs, toasts and other composite widgets
- Typography: type scale, headings and text helpers
- Integrations: third-party service cards with toggles
- Profile: user page with personal data and activity
- Pricing: plan comparison
- Settings: application preferences, theme and language
- Inbox: mail-style app screen with folders and message list
- FileManager: file listing with folders and file actions
- Gallery: image grid
- Invoice: printable invoice detail
- Billing: payment methods and invoice history
- Documentation: in-app reference page for the template
- Maintenance: standalone downtime page
- ComingSoon: standalone pre-launch page
- NotFound: 404 error page

## Tech stack

- Vue 3.5 with `<script setup>` and TypeScript 5.7 (strict)
- Foundation Sites 6.8 (prebuilt stylesheet)
- Vite 6 with `vite-plugin-pwa` 1.3 (installable PWA, offline cache)
- Vue Router 4.4 with lazy loaded routes
- Pinia 3 with `pinia-plugin-persistedstate` (auth, menu, ui stores)
- vue-i18n 11 with three locales (en, es, pt-BR)
- ApexCharts 5 via vue3-apexcharts 1.11
- TanStack Vue Table 8.21
- Tiptap 3 rich text editor (`@tiptap/vue-3`, starter kit)
- VeeValidate 4.15 + Yup 1.7 form validation
- @vuepic/vue-datepicker 13

## Requirements

- Node.js 18 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Vite starts a dev server with hot reload. Authentication is simulated in the Pinia auth store, so no backend is needed. Demo credentials:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build for production

```bash
npm run build
```

Runs the TypeScript check and writes the production bundle to `dist/`. Preview it locally with `npm run preview`.

## Project structure

```
src/
├── assets/styles/     app.scss, _compat.scss
├── components/
│   ├── landing/       sections of the public landing page
│   ├── layout/        header, sidebar, footer
│   └── ui/            shared UI components
├── composables/       shared composition functions
├── i18n/locales/      en.json, es.json, pt-BR.json
├── router/            route definitions and guards
├── stores/            auth.ts, menu.ts, ui.ts (Pinia)
└── views/             25 route views
```

## Theming and customization

Foundation comes in prebuilt (`foundation-sites/dist/css/foundation.min.css`), which avoids the Sass resolution friction of its source entry. `src/assets/styles/app.scss` layers the theme on top of it. Below that sit the runtime design tokens, declared as CSS custom properties: the brand ramp (`--color-brand-25` through `--color-brand-950`, with 500 as the primary #465fff), the state colors, and semantic surface tokens under the `--tx-` prefix (sidebar, header, card, border, text). Dark mode swaps the `--tx-` values at runtime, driven by a class on the root element. To rebrand the template, change the brand ramp and the `--tx-` values together. `_compat.scss` implements the utility vocabulary the markup shares with the Tailwind original and maps the tokens onto the framework components, so cards, tables and form controls follow the theme.

## Internationalization

Three locales ship with the template: English, Spanish and Brazilian Portuguese. The browser language is detected on first load and the header switcher persists the user choice.

## The same layout in other stacks

This repository is one of 5 implementations of the same Foundation admin layout. Every one has the same 25 views and the same visual identity, and all of them are free:

- React 19: https://github.com/danilo62x/foundation-admin-react
- Angular 19: https://github.com/danilo62x/foundation-admin-angular
- Laravel 11 + Blade: https://github.com/danilo62x/foundation-admin-laravel
- Static HTML: https://github.com/danilo62x/foundation-admin-html

The full catalog of free and paid templates is at https://template.dev.br

## Support this project

This template is free and MIT licensed. If it saves you time, you can support the work with a donation at https://template.dev.br/doar?template=foundation-admin-vue3

## License

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
