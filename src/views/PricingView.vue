<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1 class="text-title-md font-bold text-heading">Planos & Preços</h1>
      <p class="mx-auto mt-3 max-w-2xl text-sm text-muted md:text-base">
        Escolha o plano ideal para sua empresa. Sem taxas ocultas. Cancele quando quiser.
      </p>

      <div class="mt-6 inline-flex items-center gap-3 rounded-full border border-themed bg-card-bg p-1.5 surface-card">
        <button
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition"
          :class="!annual ? 'bg-brand-500 text-white shadow-theme-xs' : 'text-body'"
          @click="annual = false"
        >
          Mensal
        </button>
        <button
          type="button"
          class="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition"
          :class="annual ? 'bg-brand-500 text-white shadow-theme-xs' : 'text-body'"
          @click="annual = true"
        >
          Anual
          <span class="rounded-full bg-success-100 px-1.5 text-[10px] font-bold text-success-700 dark:bg-success-500/20 dark:text-success-400">
            -20%
          </span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="plan in plans"
        :key="plan.key"
        class="surface-card relative flex flex-col rounded-2xl border p-6 transition"
        :class="plan.featured
          ? 'border-brand-500 shadow-theme-lg ring-1 ring-brand-500/30'
          : 'border-themed shadow-theme-sm'"
      >
        <div
          v-if="plan.featured"
          class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
        >
          Mais popular
        </div>

        <div class="flex h-12 w-12 items-center justify-center rounded-xl" :style="{ background: plan.color + '22', color: plan.color }">
          <IconBase :name="plan.icon" :size="22" />
        </div>

        <h3 class="mt-4 text-xl font-bold text-heading">{{ plan.name }}</h3>
        <p class="mt-1 text-sm text-muted">{{ plan.desc }}</p>

        <div class="mt-5 flex items-baseline gap-1">
          <span class="text-sm text-muted">R$</span>
          <span class="text-4xl font-bold text-heading">{{ annual ? plan.priceAnnual : plan.priceMonthly }}</span>
          <span class="text-sm text-muted">/mês</span>
        </div>
        <p v-if="annual" class="mt-1 text-xs text-muted">
          Cobrado anualmente (R$ {{ plan.priceAnnual * 12 }}/ano)
        </p>
        <p v-else class="mt-1 text-xs text-muted">Pagamento mensal</p>

        <button
          type="button"
          class="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition"
          :class="plan.featured
            ? 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600'
            : 'border border-themed text-body hover:bg-gray-50 dark:hover:bg-gray-800'"
          @click="ui.notifySuccess(`Plano ${plan.name} selecionado!`)"
        >
          {{ plan.cta }}
        </button>

        <ul class="mt-6 space-y-3 border-t border-themed pt-5">
          <li v-for="feat in plan.features" :key="feat.text" class="flex items-start gap-3 text-sm">
            <IconBase
              :name="feat.included ? 'check' : 'x'"
              :size="16"
              :stroke-width="2.5"
              :class="feat.included ? 'shrink-0 text-success-500' : 'shrink-0 text-gray-300'"
            />
            <span :class="feat.included ? 'text-body' : 'text-muted line-through'">{{ feat.text }}</span>
          </li>
        </ul>
      </div>
    </div>

    <CardComponent title="Comparação completa de recursos" subtitle="Veja o que está incluído em cada plano" icon="grid">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-themed">
              <th class="py-3 pr-4 text-xs font-semibold uppercase tracking-wider text-muted">Recurso</th>
              <th v-for="plan in plans" :key="plan.key" class="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider" :style="{ color: plan.color }">
                {{ plan.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="section in compareTable" :key="section.section">
              <tr class="border-b border-themed bg-gray-50/40 dark:bg-gray-800/40">
                <td colspan="4" class="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-muted">
                  {{ section.section }}
                </td>
              </tr>
              <tr v-for="row in section.rows" :key="row.label" class="border-b border-themed">
                <td class="py-3 pr-4 text-body">{{ row.label }}</td>
                <td v-for="(val, i) in row.values" :key="i" class="px-4 py-3 text-center">
                  <span v-if="val === true">
                    <IconBase name="check" :size="16" :stroke-width="2.5" class="mx-auto text-success-500" />
                  </span>
                  <span v-else-if="val === false">
                    <IconBase name="x" :size="16" :stroke-width="2.5" class="mx-auto text-gray-300 dark:text-gray-600" />
                  </span>
                  <span v-else class="font-medium text-heading">{{ val }}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </CardComponent>

    <!-- FAQ -->
    <CardComponent title="Perguntas frequentes" icon="help">
      <ul class="space-y-3">
        <li v-for="(q, i) in faq" :key="q.q" class="rounded-lg border border-themed">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-heading"
            @click="openFaq = openFaq === i ? -1 : i"
          >
            {{ q.q }}
            <IconBase
              name="chevron-down"
              :size="18"
              :class="['shrink-0 text-muted transition-transform', openFaq === i && 'rotate-180']"
            />
          </button>
          <div v-if="openFaq === i" class="border-t border-themed px-4 py-3 text-sm text-body">
            {{ q.a }}
          </div>
        </li>
      </ul>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import IconBase from '@/components/ui/IconBase.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Planos & Preços'))

const annual = ref(false)
const openFaq = ref(0)

const plans = [
  {
    key: 'start',
    name: 'Start',
    desc: 'Ideal para começar com o pé direito',
    icon: 'zap',
    color: '#0ba5ec',
    priceMonthly: 49,
    priceAnnual: 39,
    cta: 'Começar grátis',
    featured: false,
    features: [
      { text: 'Até 3 usuários', included: true },
      { text: '5 GB de armazenamento', included: true },
      { text: 'Suporte por email', included: true },
      { text: 'Relatórios básicos', included: true },
      { text: 'API access', included: false },
      { text: 'Branding customizado', included: false },
      { text: 'SLA 99,9%', included: false },
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    desc: 'Para times em crescimento',
    icon: 'rocket',
    color: '#465fff',
    priceMonthly: 129,
    priceAnnual: 103,
    cta: 'Assinar Pro',
    featured: true,
    features: [
      { text: 'Até 15 usuários', included: true },
      { text: '100 GB de armazenamento', included: true },
      { text: 'Suporte prioritário 24/5', included: true },
      { text: 'Relatórios avançados', included: true },
      { text: 'API access completo', included: true },
      { text: 'Branding customizado', included: true },
      { text: 'SLA 99,9%', included: false },
    ],
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    desc: 'Para grandes organizações',
    icon: 'shield',
    color: '#7c3aed',
    priceMonthly: 399,
    priceAnnual: 319,
    cta: 'Falar com vendas',
    featured: false,
    features: [
      { text: 'Usuários ilimitados', included: true },
      { text: 'Armazenamento ilimitado', included: true },
      { text: 'Suporte dedicado 24/7', included: true },
      { text: 'Relatórios customizados', included: true },
      { text: 'API access completo', included: true },
      { text: 'Branding customizado', included: true },
      { text: 'SLA 99,99%', included: true },
    ],
  },
]

const compareTable = [
  {
    section: 'Plataforma',
    rows: [
      { label: 'Usuários', values: ['3', '15', 'Ilimitado'] },
      { label: 'Armazenamento', values: ['5 GB', '100 GB', 'Ilimitado'] },
      { label: 'Projetos ativos', values: ['5', '50', 'Ilimitado'] },
    ],
  },
  {
    section: 'Recursos',
    rows: [
      { label: 'Relatórios avançados', values: [false, true, true] },
      { label: 'API access', values: [false, true, true] },
      { label: 'Branding customizado', values: [false, true, true] },
      { label: 'Single Sign-On (SSO)', values: [false, false, true] },
      { label: 'Audit logs', values: [false, false, true] },
    ],
  },
  {
    section: 'Suporte',
    rows: [
      { label: 'Email', values: [true, true, true] },
      { label: 'Chat ao vivo', values: [false, true, true] },
      { label: 'Telefone', values: [false, false, true] },
      { label: 'Account manager', values: [false, false, true] },
      { label: 'SLA garantido', values: ['—', '99,9%', '99,99%'] },
    ],
  },
]

const faq = [
  { q: 'Posso cancelar a qualquer momento?', a: 'Sim. Você pode cancelar sua assinatura a qualquer momento, sem multa. O acesso continua até o fim do período pago.' },
  { q: 'Vocês oferecem trial gratuito?', a: 'Sim! Todos os planos pagos vêm com 14 dias de trial gratuito. Não pedimos cartão de crédito no cadastro.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos cartão de crédito (Visa, Mastercard, Amex), boleto, PIX e transferência bancária para planos Enterprise.' },
  { q: 'Posso fazer upgrade ou downgrade depois?', a: 'Claro. Você pode mudar de plano a qualquer momento. O valor é ajustado proporcionalmente.' },
  { q: 'Há desconto para ONGs ou estudantes?', a: 'Sim. Oferecemos descontos especiais para organizações sem fins lucrativos e instituições educacionais. Entre em contato.' },
]
</script>
