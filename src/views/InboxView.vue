<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-title-sm font-bold text-heading">Caixa de entrada</h1>
        <p class="mt-1 text-sm text-muted">Gerencie suas mensagens em um só lugar.</p>
      </div>
      <button
        class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
        @click="composeOpen = true"
      >
        <IconBase name="plus" :size="16" /> Escrever
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <!-- Folders -->
      <aside class="surface-card rounded-2xl border p-3 shadow-theme-sm lg:col-span-3 xl:col-span-2">
        <nav class="space-y-1">
          <button
            v-for="f in FOLDERS"
            :key="f.id"
            class="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition"
            :class="
              activeFolder === f.id
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400'
                : 'text-body hover:bg-gray-50 dark:hover:bg-gray-800'
            "
            @click="changeFolder(f.id)"
          >
            <span class="flex items-center gap-2.5">
              <IconBase :name="f.icon" :size="18" />
              {{ f.label }}
            </span>
            <span
              v-if="folderCounts[f.id] > 0"
              class="rounded-full px-2 py-0.5 text-xs font-semibold"
              :class="
                activeFolder === f.id
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-muted dark:bg-gray-800'
              "
            >
              {{ folderCounts[f.id] }}
            </span>
          </button>
        </nav>
      </aside>

      <!-- List -->
      <section
        class="surface-card rounded-2xl border shadow-theme-sm lg:col-span-4 xl:col-span-4"
        :class="selected ? 'hidden lg:block' : 'block'"
      >
        <div class="border-b border-themed p-3">
          <div class="relative">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IconBase name="search" :size="16" />
            </span>
            <input
              v-model="search"
              placeholder="Buscar e-mails..."
              class="h-9 w-full rounded-lg border border-themed bg-gray-50 pl-9 pr-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
            />
          </div>
        </div>
        <ul class="max-h-[640px] divide-y divide-themed overflow-y-auto">
          <li v-for="e in list" :key="e.id">
            <button
              class="flex w-full gap-3 px-4 py-3 text-left transition hover:bg-gray-50 dark:hover:bg-gray-800/60"
              :class="selectedId === e.id ? 'bg-brand-25 dark:bg-brand-500/10' : ''"
              @click="openEmail(e.id)"
            >
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                :class="e.accent"
              >
                {{ e.initials }}
              </span>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                  <span
                    class="truncate text-sm"
                    :class="e.unread ? 'font-semibold text-heading' : 'text-body'"
                  >
                    {{ e.sender }}
                  </span>
                  <span class="shrink-0 text-xs text-muted">{{ e.time }}</span>
                </div>
                <p
                  class="truncate text-sm"
                  :class="e.unread ? 'font-medium text-heading' : 'text-muted'"
                >
                  {{ e.subject }}
                </p>
                <p class="truncate text-xs text-muted">{{ e.preview }}</p>
              </div>
              <div class="flex shrink-0 flex-col items-center gap-2">
                <span v-if="e.unread" class="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                <span
                  role="button"
                  tabindex="0"
                  class="mt-auto"
                  :class="
                    e.starred
                      ? 'text-warning-500'
                      : 'text-gray-300 hover:text-warning-500 dark:text-gray-600'
                  "
                  @click.stop="toggleStar(e.id)"
                >
                  <IconBase name="star" :size="16" :class="e.starred ? 'fill-current' : ''" />
                </span>
              </div>
            </button>
          </li>
          <li v-if="list.length === 0" class="px-4 py-12 text-center text-sm text-muted">
            Nenhuma mensagem nesta pasta.
          </li>
        </ul>
      </section>

      <!-- Reading pane -->
      <section
        class="surface-card rounded-2xl border shadow-theme-sm lg:col-span-5 xl:col-span-6"
        :class="selected ? 'block' : 'hidden lg:block'"
      >
        <div v-if="selected" class="flex h-full flex-col">
          <header class="flex items-start justify-between gap-3 border-b border-themed p-5 md:p-6">
            <div class="flex items-start gap-3">
              <button
                class="rounded-md p-1.5 text-muted hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
                aria-label="Voltar"
                @click="selectedId = null"
              >
                <IconBase name="chevron-right" :size="18" class="rotate-180" />
              </button>
              <span
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                :class="selected.accent"
              >
                {{ selected.initials }}
              </span>
              <div>
                <h2 class="text-base font-semibold text-heading">{{ selected.subject }}</h2>
                <p class="mt-0.5 text-sm text-body">{{ selected.sender }}</p>
                <p class="text-xs text-muted">{{ selected.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button
                class="rounded-md p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                :class="selected.starred ? 'text-warning-500' : 'text-muted'"
                aria-label="Favoritar"
                @click="toggleStar(selected.id)"
              >
                <IconBase name="star" :size="18" :class="selected.starred ? 'fill-current' : ''" />
              </button>
              <button
                class="rounded-md p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Baixar"
                @click="ui.notifySuccess('Mensagem arquivada')"
              >
                <IconBase name="download" :size="18" />
              </button>
              <button
                class="rounded-md p-1.5 text-muted hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/15"
                aria-label="Excluir"
                @click="deleteEmail"
              >
                <IconBase name="trash" :size="18" />
              </button>
            </div>
          </header>
          <div class="flex-1 whitespace-pre-line p-5 text-sm leading-relaxed text-body md:p-6">
            {{ selected.body }}
          </div>
          <footer class="border-t border-themed p-5 md:p-6">
            <button
              class="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="composeOpen = true"
            >
              <IconBase name="mail" :size="16" /> Responder
            </button>
          </footer>
        </div>
        <div
          v-else
          class="flex h-full min-h-[400px] flex-col items-center justify-center gap-3 p-10 text-center"
        >
          <span
            class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/15"
          >
            <IconBase name="mail" :size="26" />
          </span>
          <p class="text-sm font-medium text-heading">Selecione uma mensagem</p>
          <p class="text-xs text-muted">Escolha um e-mail na lista para visualizar o conteúdo.</p>
        </div>
      </section>
    </div>

    <ModalBase
      v-model="composeOpen"
      title="Nova mensagem"
      subtitle="Escreva e envie um e-mail"
      size="lg"
    >
      <form class="space-y-4" @submit.prevent="sendMessage">
        <div>
          <label class="mb-1.5 block text-xs font-medium text-muted">Para</label>
          <input
            type="email"
            required
            placeholder="destinatario@email.com"
            class="h-10 w-full rounded-lg border border-themed bg-gray-50 px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
          />
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-muted">Assunto</label>
          <input
            required
            placeholder="Assunto da mensagem"
            class="h-10 w-full rounded-lg border border-themed bg-gray-50 px-3 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
          />
        </div>
        <div>
          <label class="mb-1.5 block text-xs font-medium text-muted">Mensagem</label>
          <textarea
            :rows="6"
            placeholder="Escreva sua mensagem..."
            class="w-full rounded-lg border border-themed bg-gray-50 px-3 py-2 text-sm text-body outline-none focus:border-brand-300 focus-ring dark:bg-gray-900"
          />
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="submit"
            class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          >
            <IconBase name="mail" :size="16" /> Enviar
          </button>
        </div>
      </form>
    </ModalBase>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase.vue'
import ModalBase from '@/components/ui/ModalBase.vue'

type FolderId = 'inbox' | 'sent' | 'drafts' | 'starred' | 'trash'

interface Folder {
  id: FolderId
  label: string
  icon: string
  count: number
}

interface Email {
  id: string
  folder: FolderId
  sender: string
  initials: string
  email: string
  subject: string
  preview: string
  body: string
  time: string
  unread: boolean
  starred: boolean
  accent: string
}

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Caixa de entrada'))

const FOLDERS: Folder[] = [
  { id: 'inbox', label: 'Caixa de entrada', icon: 'mail', count: 5 },
  { id: 'sent', label: 'Enviados', icon: 'chevron-right', count: 2 },
  { id: 'drafts', label: 'Rascunhos', icon: 'edit', count: 1 },
  { id: 'starred', label: 'Com estrela', icon: 'star', count: 2 },
  { id: 'trash', label: 'Lixeira', icon: 'trash', count: 0 },
]

const ACCENTS = [
  'bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400',
  'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
  'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500',
  'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
  'bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-500/15 dark:text-blue-light-500',
]

const emails = ref<Email[]>([
  {
    id: '1',
    folder: 'inbox',
    sender: 'Marina Costa',
    initials: 'MC',
    email: 'marina.costa@empresa.com',
    subject: 'Proposta comercial atualizada',
    preview: 'Olá! Segue em anexo a versão revisada da proposta com os novos valores...',
    body: 'Olá!\n\nSegue em anexo a versão revisada da proposta comercial com os novos valores discutidos na reunião de ontem. Ajustei as condições de pagamento e incluí o desconto para contrato anual.\n\nPode revisar e me dizer se podemos seguir? Fico no aguardo.\n\nAbraços,\nMarina',
    time: '09:42',
    unread: true,
    starred: true,
    accent: ACCENTS[0],
  },
  {
    id: '2',
    folder: 'inbox',
    sender: 'Equipe Financeiro',
    initials: 'EF',
    email: 'financeiro@empresa.com',
    subject: 'Fatura de maio disponível',
    preview: 'Sua fatura referente ao mês de maio já está disponível para download...',
    body: 'Prezado cliente,\n\nSua fatura referente ao mês de maio já está disponível para download no portal. O vencimento é dia 10/06/2026.\n\nQualquer dúvida estamos à disposição.\n\nAtenciosamente,\nEquipe Financeiro',
    time: '08:15',
    unread: true,
    starred: false,
    accent: ACCENTS[1],
  },
  {
    id: '3',
    folder: 'inbox',
    sender: 'Lucas Pereira',
    initials: 'LP',
    email: 'lucas.p@parceiro.io',
    subject: 'Re: Integração da API',
    preview: 'Perfeito, consegui rodar os testes aqui e tudo passou. Vamos para produção?',
    body: 'Fala!\n\nPerfeito, consegui rodar os testes aqui no ambiente de homologação e tudo passou sem erros. As credenciais novas funcionaram normalmente.\n\nPodemos agendar o deploy para produção ainda esta semana?\n\nValeu,\nLucas',
    time: 'Ontem',
    unread: true,
    starred: false,
    accent: ACCENTS[2],
  },
  {
    id: '4',
    folder: 'inbox',
    sender: 'Aline Souza',
    initials: 'AS',
    email: 'aline.souza@design.co',
    subject: 'Mockups da nova landing page',
    preview: 'Terminei os mockups da home e da página de preços. Dá uma olhada...',
    body: 'Oi!\n\nTerminei os mockups da home e da página de preços. Tentei seguir o novo guia de marca com as cores atualizadas.\n\nDeixei os arquivos no Figma, o link está no canal do projeto. Aguardo seu feedback!\n\nAbraços,\nAline',
    time: 'Ontem',
    unread: false,
    starred: true,
    accent: ACCENTS[3],
  },
  {
    id: '5',
    folder: 'inbox',
    sender: 'Rafael Lima',
    initials: 'RL',
    email: 'rafael@enterprise.com',
    subject: 'Reunião de alinhamento - quinta',
    preview: 'Pessoal, vamos confirmar a reunião de alinhamento para quinta às 14h?',
    body: 'Pessoal,\n\nVamos confirmar a reunião de alinhamento para quinta-feira às 14h? Pauta:\n\n- Roadmap do trimestre\n- Métricas de retenção\n- Próximos contratos\n\nMandem confirmação de presença.\n\nObrigado,\nRafael',
    time: '23 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[4],
  },
  {
    id: '6',
    folder: 'sent',
    sender: 'Você',
    initials: 'EU',
    email: 'voce@empresa.com',
    subject: 'Re: Proposta comercial atualizada',
    preview: 'Recebido, Marina! Vou revisar hoje à tarde e te retorno até amanhã.',
    body: 'Recebido, Marina!\n\nVou revisar hoje à tarde e te retorno até amanhã com qualquer ajuste necessário. À primeira vista parece ótimo.\n\nObrigado,',
    time: '10:05',
    unread: false,
    starred: false,
    accent: ACCENTS[0],
  },
  {
    id: '7',
    folder: 'sent',
    sender: 'Você',
    initials: 'EU',
    email: 'voce@empresa.com',
    subject: 'Relatório semanal',
    preview: 'Segue o relatório semanal com os principais indicadores da equipe.',
    body: 'Time,\n\nSegue o relatório semanal com os principais indicadores. Crescemos 8% em conversões e reduzimos o tempo de resposta do suporte.\n\nDetalhes no anexo.',
    time: '22 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[1],
  },
  {
    id: '8',
    folder: 'drafts',
    sender: 'Rascunho',
    initials: 'RA',
    email: 'voce@empresa.com',
    subject: 'Ideias para o próximo evento',
    preview: 'Algumas ideias iniciais para o evento de lançamento do produto...',
    body: 'Algumas ideias iniciais para o evento de lançamento do produto:\n\n- Local: auditório principal\n- Formato híbrido (presencial + online)\n- Convidar parceiros estratégicos\n\n(rascunho não finalizado)',
    time: '20 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[2],
  },
])

const activeFolder = ref<FolderId>('inbox')
const selectedId = ref<string | null>('1')
const search = ref('')
const composeOpen = ref(false)

const folderCounts = computed<Record<FolderId, number>>(() => {
  const counts: Record<FolderId, number> = { inbox: 0, sent: 0, drafts: 0, starred: 0, trash: 0 }
  for (const e of emails.value) {
    if (e.folder === 'inbox' && e.unread) counts.inbox++
    if (e.folder === 'sent') counts.sent++
    if (e.folder === 'drafts') counts.drafts++
    if (e.starred) counts.starred++
    if (e.folder === 'trash') counts.trash++
  }
  return counts
})

const list = computed(() =>
  emails.value.filter((e) => {
    const inFolder = activeFolder.value === 'starred' ? e.starred : e.folder === activeFolder.value
    if (!inFolder) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      return (
        e.sender.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q)
      )
    }
    return true
  })
)

const selected = computed(() => emails.value.find((e) => e.id === selectedId.value) ?? null)

function openEmail(id: string) {
  selectedId.value = id
  const e = emails.value.find((m) => m.id === id)
  if (e) e.unread = false
}

function toggleStar(id: string) {
  const e = emails.value.find((m) => m.id === id)
  if (e) e.starred = !e.starred
}

function changeFolder(id: FolderId) {
  activeFolder.value = id
  selectedId.value = null
}

function deleteEmail() {
  if (!selected.value) return
  selected.value.folder = 'trash'
  selectedId.value = null
  ui.notifySuccess('Mensagem movida para a lixeira')
}

function sendMessage() {
  composeOpen.value = false
  ui.notifySuccess('Mensagem enviada com sucesso')
}
</script>
