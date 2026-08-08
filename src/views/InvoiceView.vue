<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
      <div>
        <h1 class="text-title-sm font-bold text-heading">Fatura</h1>
        <p class="mt-1 text-sm text-muted">Detalhamento da cobrança e itens do pedido.</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          @click="ui.notifySuccess('Download da fatura iniciado!')"
        >
          <IconBase name="download" :size="16" /> Baixar PDF
        </button>
        <button
          type="button"
          class="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="ui.notifySuccess('Enviando para a impressora...')"
        >
          <IconBase name="copy" :size="16" /> Imprimir
        </button>
        <button
          type="button"
          class="inline-flex h-10 items-center gap-2 rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="ui.notifySuccess('Fatura enviada por email!')"
        >
          <IconBase name="mail" :size="16" /> Enviar
        </button>
      </div>
    </div>

    <div class="surface-card mx-auto max-w-4xl rounded-2xl border shadow-theme-sm">
      <div class="space-y-8 p-6 md:p-10">
        <!-- Header -->
        <div class="flex flex-col gap-6 border-b border-themed pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
              <IconBase name="zap" :size="24" />
            </div>
            <div>
              <p class="text-lg font-bold text-heading">Acme Tecnologia Ltda.</p>
              <p class="text-xs text-muted">contato@acme.com.br</p>
            </div>
          </div>
          <div class="text-left sm:text-right">
            <h2 class="text-title-xs font-bold text-heading">FATURA #2026-0042</h2>
            <p class="mt-1 text-sm text-muted">Emissão: 28/05/2026</p>
            <p class="text-sm text-muted">Vencimento: 12/06/2026</p>
            <span
              class="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              :class="paid
                ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
                : 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500'"
            >
              {{ paid ? 'Pago' : 'Pendente' }}
            </span>
          </div>
        </div>

        <!-- Bill from / to -->
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-muted">De</p>
            <p class="mt-2 text-sm font-semibold text-heading">Acme Tecnologia Ltda.</p>
            <p class="mt-1 text-sm text-body">CNPJ: 12.345.678/0001-90</p>
            <p class="text-sm text-body">Av. Paulista, 1000 — Sala 142</p>
            <p class="text-sm text-body">São Paulo, SP — 01310-100</p>
          </div>
          <div class="sm:text-right">
            <p class="text-xs font-semibold uppercase tracking-wider text-muted">Para</p>
            <p class="mt-2 text-sm font-semibold text-heading">Marina Costa — Studio MC</p>
            <p class="mt-1 text-sm text-body">CNPJ: 98.765.432/0001-21</p>
            <p class="text-sm text-body">Rua das Flores, 250 — Conj. 8</p>
            <p class="text-sm text-body">Belo Horizonte, MG — 30140-071</p>
          </div>
        </div>

        <!-- Line items -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-themed text-xs uppercase tracking-wide text-muted">
                <th class="py-3 pr-4 font-medium">Descrição</th>
                <th class="py-3 px-4 text-center font-medium">Qtd.</th>
                <th class="py-3 px-4 text-right font-medium">Preço unit.</th>
                <th class="py-3 pl-4 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-themed">
              <tr v-for="item in ITEMS" :key="item.desc" class="text-body">
                <td class="py-4 pr-4">
                  <p class="font-medium text-heading">{{ item.desc }}</p>
                  <p class="mt-0.5 text-xs text-muted">{{ item.detail }}</p>
                </td>
                <td class="py-4 px-4 text-center">{{ item.qty }}</td>
                <td class="py-4 px-4 text-right">{{ BRL.format(item.unit) }}</td>
                <td class="py-4 pl-4 text-right font-medium text-heading">
                  {{ BRL.format(item.qty * item.unit) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Summary -->
        <div class="flex justify-end">
          <div class="w-full max-w-xs space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">Subtotal</span>
              <span class="font-medium text-heading">{{ BRL.format(subtotal) }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">Desconto</span>
              <span class="font-medium text-success-600 dark:text-success-500">
                − {{ BRL.format(discount) }}
              </span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">Impostos (5%)</span>
              <span class="font-medium text-heading">{{ BRL.format(tax) }}</span>
            </div>
            <div class="flex items-center justify-between border-t border-themed pt-3">
              <span class="text-sm font-semibold text-heading">Total</span>
              <span class="text-title-xs font-bold text-brand-500">{{ BRL.format(total) }}</span>
            </div>
          </div>
        </div>

        <!-- Note -->
        <div class="rounded-xl border border-themed bg-gray-50/60 p-4 dark:bg-gray-800/40">
          <div class="flex items-start gap-3">
            <span class="mt-0.5 text-brand-500">
              <IconBase name="info" :size="18" />
            </span>
            <div>
              <p class="text-sm font-medium text-heading">Observações</p>
              <p class="mt-1 text-sm text-body">
                Pagamento via PIX, boleto ou cartão de crédito. Em caso de atraso, será aplicada multa
                de 2% acrescida de juros de 1% ao mês. Obrigado pela preferência!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import IconBase from '@/components/ui/IconBase.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Fatura'))

const ITEMS = [
  { desc: 'Plano Pro — assinatura anual', detail: '01/06/2026 a 31/05/2027', qty: 1, unit: 1548.0 },
  { desc: 'Usuários adicionais', detail: '5 assentos extras', qty: 5, unit: 29.0 },
  { desc: 'Armazenamento extra', detail: 'Pacote de 250 GB', qty: 2, unit: 49.0 },
  { desc: 'Suporte prioritário 24/7', detail: 'Add-on mensal', qty: 1, unit: 199.0 },
]

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const subtotal = ITEMS.reduce((sum, i) => sum + i.qty * i.unit, 0)
const discount = 90.0
const taxBase = subtotal - discount
const tax = taxBase * 0.05
const total = taxBase + tax
const paid = false
</script>
