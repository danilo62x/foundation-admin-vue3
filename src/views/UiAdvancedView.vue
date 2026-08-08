<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-title-sm font-bold text-heading">Componentes avançados</h1>
      <p class="mt-1 text-sm text-muted">
        Abas, acordeão, tooltips, etapas, avaliação, badges, avatares e mais — versão Foundation.
      </p>
    </div>

    <!-- Breadcrumb -->
    <CardComponent title="Breadcrumb" subtitle="Trilha de navegação" icon="chevron-right">
      <Breadcrumb
        :items="[
          { label: 'Início', href: '#', icon: 'dashboard' },
          { label: 'Componentes', href: '#' },
          { label: 'Avançados' },
        ]"
      />
    </CardComponent>

    <!-- Tabs -->
    <CardComponent title="Abas" subtitle="Painéis com aba ativa sublinhada" icon="grid">
      <Tabs
        v-model="tab"
        :tabs="[
          { label: 'Visão geral', icon: 'dashboard' },
          { label: 'Atividade', icon: 'bell' },
          { label: 'Configurações', icon: 'settings' },
        ]"
      >
        <template #tab-0>
          <p>Resumo geral do projeto, métricas e indicadores principais em um só lugar.</p>
        </template>
        <template #tab-1>
          <p>Histórico de eventos recentes, notificações e ações realizadas pela equipe.</p>
        </template>
        <template #tab-2>
          <p>Ajuste preferências, integrações e permissões da sua conta.</p>
        </template>
      </Tabs>
    </CardComponent>

    <!-- Accordion -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <CardComponent title="Acordeão" subtitle="Apenas um item aberto" icon="chevron-down">
        <Accordion
          :default-open="[0]"
          :items="[
            { title: 'O que está incluído?', icon: 'package', content: 'Todos os componentes de UI, temas claro e escuro, e exemplos prontos.' },
            { title: 'Posso personalizar as cores?', icon: 'palette', content: 'Sim, todas as cores usam tokens de design configuráveis em tempo de execução.' },
            { title: 'Há suporte a TypeScript?', icon: 'type', content: 'Completo — todos os componentes possuem props tipadas.' },
          ]"
        />
      </CardComponent>

      <CardComponent title="Acordeão múltiplo" subtitle="Vários itens abertos ao mesmo tempo" icon="chevron-down">
        <Accordion
          multiple
          :default-open="[0, 1]"
          :items="[
            { title: 'Entrega', content: 'Enviamos para todo o Brasil em até 5 dias úteis.' },
            { title: 'Trocas e devoluções', content: 'Você tem até 30 dias para solicitar a troca.' },
            { title: 'Garantia', content: 'Todos os produtos têm garantia de 12 meses.' },
          ]"
        />
      </CardComponent>
    </div>

    <!-- Tooltip -->
    <CardComponent title="Tooltips" subtitle="Posicionamento em quatro direções" icon="info">
      <div class="flex flex-wrap items-center gap-4">
        <Tooltip content="Dica no topo" placement="top">
          <button
            class="inline-flex h-10 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Topo
          </button>
        </Tooltip>
        <Tooltip content="Dica embaixo" placement="bottom">
          <button
            class="inline-flex h-10 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Abaixo
          </button>
        </Tooltip>
        <Tooltip content="Dica à esquerda" placement="left">
          <button
            class="inline-flex h-10 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Esquerda
          </button>
        </Tooltip>
        <Tooltip content="Dica à direita" placement="right">
          <button
            class="inline-flex h-10 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Direita
          </button>
        </Tooltip>
        <Tooltip content="Mais informações" placement="top">
          <span
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconBase name="help" :size="18" />
          </span>
        </Tooltip>
      </div>
    </CardComponent>

    <!-- Steps -->
    <CardComponent title="Etapas" subtitle="Stepper horizontal com estados" icon="check">
      <Steps
        :current="step"
        :on-change="(n) => (step = n)"
        :steps="[
          { label: 'Carrinho', description: 'Itens selecionados' },
          { label: 'Endereço', description: 'Entrega' },
          { label: 'Pagamento', description: 'Cartão ou Pix' },
          { label: 'Confirmação', description: 'Pedido feito' },
        ]"
      />
      <div class="mt-6 flex justify-center gap-3">
        <button
          class="inline-flex h-9 items-center rounded-lg border border-themed px-4 text-sm font-medium text-body hover:bg-gray-50 disabled:opacity-50 dark:hover:bg-gray-800"
          :disabled="step === 1"
          @click="step = Math.max(1, step - 1)"
        >
          Anterior
        </button>
        <button
          class="inline-flex h-9 items-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
          :disabled="step === 4"
          @click="step = Math.min(4, step + 1)"
        >
          Próximo
        </button>
      </div>
    </CardComponent>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <!-- Rate -->
      <CardComponent title="Avaliação" subtitle="Estrelas com prévia no hover" icon="star">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <Rate v-model="rate" />
            <span class="text-sm text-muted">{{ rate }} de 5</span>
          </div>
          <div class="flex items-center gap-3 border-t border-themed pt-4">
            <span class="text-sm text-body">Somente leitura:</span>
            <Rate :model-value="4" readonly :size="18" />
          </div>
        </div>
      </CardComponent>

      <!-- TagInput -->
      <CardComponent title="Entrada de tags" subtitle="Digite e pressione Enter" icon="tag">
        <TagInput v-model="tags" placeholder="Adicionar tecnologia…" />
        <p class="mt-2 text-xs text-muted">{{ tags.length }} tag(s) · use Backspace para remover a última</p>
      </CardComponent>
    </div>

    <!-- Badges -->
    <CardComponent title="Badges" subtitle="Variantes soft e solid" icon="tag">
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <Badge color="brand">Primário</Badge>
          <Badge color="success">Sucesso</Badge>
          <Badge color="warning">Aviso</Badge>
          <Badge color="error">Erro</Badge>
          <Badge color="gray">Neutro</Badge>
        </div>
        <div class="flex flex-wrap gap-2">
          <Badge color="brand" variant="solid">Primário</Badge>
          <Badge color="success" variant="solid">Sucesso</Badge>
          <Badge color="warning" variant="solid">Aviso</Badge>
          <Badge color="error" variant="solid">Erro</Badge>
          <Badge color="gray" variant="solid">Neutro</Badge>
        </div>
        <div class="flex flex-wrap gap-2 border-t border-themed pt-4">
          <Badge color="success" dot>Online</Badge>
          <Badge color="warning" dot>Pendente</Badge>
          <Badge color="gray" dot>Offline</Badge>
          <Badge color="brand" icon="star">Premium</Badge>
          <Badge color="success" icon="check">Verificado</Badge>
        </div>
      </div>
    </CardComponent>

    <!-- Avatars -->
    <CardComponent title="Avatares" subtitle="Imagem, iniciais, status e grupo" icon="user">
      <div class="space-y-5">
        <div class="flex items-end gap-3">
          <Avatar name="Ana Silva" size="xs" />
          <Avatar name="Bruno Costa" size="sm" />
          <Avatar name="Carla Dias" size="md" />
          <Avatar name="Diego Luz" size="lg" />
          <Avatar name="Erica Melo" size="xl" />
        </div>
        <div class="flex items-center gap-6 border-t border-themed pt-5">
          <div class="flex items-center gap-3">
            <Avatar name="Marina Reis" status="online" />
            <div>
              <p class="text-sm font-medium text-heading">Marina Reis</p>
              <p class="text-xs text-muted">Online · Produto</p>
            </div>
          </div>
          <Avatar name="João Pedro" status="busy" />
          <Avatar name="Lia Souza" status="offline" />
        </div>
        <div class="border-t border-themed pt-5">
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Grupo empilhado</p>
          <AvatarGroup :extra="5">
            <Avatar name="Marina Costa" />
            <Avatar name="Lucas Pinto" />
            <Avatar name="André Sá" />
            <Avatar name="Rafa Lima" />
          </AvatarGroup>
        </div>
      </div>
    </CardComponent>

    <!-- Skeleton -->
    <CardComponent title="Skeleton" subtitle="Placeholders de carregamento" icon="grid">
      <template #toolbar>
        <button
          class="inline-flex h-9 items-center gap-2 rounded-lg border border-themed px-3 text-sm font-medium text-body hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="loading = !loading"
        >
          <IconBase name="reset" :size="15" />
          {{ loading ? 'Mostrar conteúdo' : 'Mostrar loading' }}
        </button>
      </template>

      <div v-if="loading" class="space-y-5">
        <div class="flex items-center gap-3">
          <Skeleton variant="circle" :width="48" :height="48" />
          <div class="flex-1 space-y-2">
            <Skeleton variant="line" width="40%" />
            <Skeleton variant="line" width="25%" />
          </div>
        </div>
        <Skeleton variant="rect" :height="120" />
        <div class="space-y-2">
          <Skeleton variant="line" />
          <Skeleton variant="line" width="90%" />
          <Skeleton variant="line" width="75%" />
        </div>
      </div>
      <div v-else class="space-y-5">
        <div class="flex items-center gap-3">
          <Avatar name="Time Produto" size="lg" />
          <div>
            <p class="text-sm font-semibold text-heading">Equipe de Produto</p>
            <p class="text-xs text-muted">12 membros ativos</p>
          </div>
        </div>
        <div
          class="flex h-[120px] items-center justify-center rounded-xl bg-brand-50 text-sm font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
        >
          Conteúdo carregado
        </div>
        <p class="text-sm text-body">
          O conteúdo real substitui os placeholders assim que os dados terminam de carregar, evitando saltos de layout.
        </p>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import Tabs from '@/components/ui/Tabs.vue'
import Accordion from '@/components/ui/Accordion.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import Steps from '@/components/ui/Steps.vue'
import Rate from '@/components/ui/Rate.vue'
import Badge from '@/components/ui/Badge.vue'
import Avatar from '@/components/ui/Avatar.vue'
import AvatarGroup from '@/components/ui/AvatarGroup.vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import TagInput from '@/components/ui/TagInput.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import IconBase from '@/components/ui/IconBase.vue'

onMounted(() => useUiStore().setPageTitle('Componentes avançados'))

const tab = ref(0)
const rate = ref(3)
const step = ref(2)
const tags = ref<string[]>(['Vue', 'Foundation', 'TypeScript'])
const loading = ref(true)
</script>
