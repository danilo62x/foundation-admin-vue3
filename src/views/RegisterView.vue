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
          <span class="text-2xl font-bold">A</span>
        </span>
        <h1 class="mt-5 text-title-sm font-bold text-heading">{{ t('auth.register') }}</h1>
        <p class="mt-2 text-sm text-muted">Preencha os dados para começar</p>
      </div>

      <div class="surface-card rounded-2xl border p-6 shadow-theme-lg md:p-8">
        <form class="space-y-5" @submit="onSubmit">
          <FormField
            name="name"
            :label="t('auth.name')"
            type="text"
            placeholder="Seu nome completo"
          />
          <FormField
            name="email"
            :label="t('auth.email')"
            type="email"
            placeholder="seu@email.com"
          />
          <FormField
            name="password"
            :label="t('auth.password')"
            type="password"
            placeholder="••••••••"
            hint="Mínimo de 8 caracteres"
          />
          <FormField
            name="confirmPassword"
            :label="t('auth.confirmPassword')"
            type="password"
            placeholder="••••••••"
          />

          <div class="space-y-1.5">
            <FormField
              name="acceptTerms"
              as="checkbox"
              label="Li e aceito os termos de uso e a política de privacidade"
            />
            <p v-if="termsError" class="text-xs text-error-500">{{ termsError }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Criando conta...
            </span>
            <span v-else>{{ t('auth.register') }}</span>
          </button>
        </form>
      </div>

      <p class="mt-6 text-center text-sm text-muted">
        {{ t('auth.alreadyHaveAccount') }}
        <RouterLink to="/login" class="font-medium text-brand-500 hover:text-brand-600">
          {{ t('auth.login') }}
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import FormField from '@/components/ui/FormField.vue'
import { useUiStore } from '@/stores/ui'

const { t } = useI18n()
const router = useRouter()
const ui = useUiStore()
const loading = ref(false)

const schema = yup.object({
  name: yup.string().trim().required('Informe seu nome'),
  email: yup.string().email('E-mail inválido').required('Informe seu e-mail'),
  password: yup.string().min(8, 'A senha deve ter ao menos 8 caracteres').required('Informe uma senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirme sua senha'),
  acceptTerms: yup.boolean().oneOf([true], 'Você precisa aceitar os termos'),
})

const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  },
})

const termsError = computed(() => (meta.value.touched ? errors.value.acceptTerms : undefined))

const onSubmit = handleSubmit(async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  ui.notifySuccess('Conta criada com sucesso! Faça login para continuar.')
  router.push('/login')
})
</script>
