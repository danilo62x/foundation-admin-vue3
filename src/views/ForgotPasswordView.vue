<template>
  <div
    class="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4 py-10 dark:from-gray-900 dark:via-gray-dark dark:to-gray-900"
  >
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
      <div class="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-warning-100/60 blur-3xl dark:bg-brand-700/10" />
    </div>

    <div class="w-full max-w-md">
      <div class="mb-6 flex flex-col items-center">
        <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-theme-md">
          <IconBase name="lock" :size="26" />
        </span>
        <h1 class="mt-5 text-title-sm font-bold text-heading">{{ t('auth.forgotPassword') }}</h1>
        <p class="mt-2 text-center text-sm text-muted">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <div class="surface-card rounded-2xl border p-6 shadow-theme-lg md:p-8">
        <div v-if="sentTo" class="flex flex-col items-center text-center">
          <span class="flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-500 dark:bg-success-500/15">
            <IconBase name="check" :size="28" />
          </span>
          <h2 class="mt-4 text-base font-semibold text-heading">Link enviado para seu e-mail</h2>
          <p class="mt-2 text-sm text-muted">
            Enviamos um link de redefinição para
            <span class="font-medium text-body">{{ sentTo }}</span>. Verifique sua caixa de entrada e o spam.
          </p>
          <div class="mt-4 w-full rounded-lg border border-dashed border-themed bg-gray-50/60 p-3 text-xs text-muted dark:bg-gray-900/40">
            Não recebeu?
            <button
              type="button"
              class="font-medium text-brand-500 hover:text-brand-600"
              @click="sentTo = null"
            >
              Tentar outro e-mail
            </button>
          </div>
        </div>

        <form v-else class="space-y-5" @submit="onSubmit">
          <FormField
            name="email"
            :label="t('auth.email')"
            type="email"
            placeholder="seu@email.com"
          />
          <button
            type="submit"
            :disabled="loading"
            class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Enviando...
            </span>
            <span v-else>{{ t('auth.sendResetLink') }}</span>
          </button>
        </form>
      </div>

      <p class="mt-6 text-center text-sm text-muted">
        <RouterLink to="/login" class="font-medium text-brand-500 hover:text-brand-600">
          {{ t('common.back') }} — {{ t('auth.login') }}
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import FormField from '@/components/ui/FormField.vue'
import IconBase from '@/components/ui/IconBase.vue'

const { t } = useI18n()
const loading = ref(false)
const sentTo = ref<string | null>(null)

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Informe seu e-mail'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { email: '' },
})

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  sentTo.value = values.email
})
</script>
