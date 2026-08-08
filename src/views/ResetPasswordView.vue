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
        <h1 class="mt-5 text-title-sm font-bold text-heading">{{ t('auth.resetPassword') }}</h1>
        <p class="mt-2 text-center text-sm text-muted">Defina uma nova senha para sua conta.</p>
      </div>

      <div class="surface-card rounded-2xl border p-6 shadow-theme-lg md:p-8">
        <div
          v-if="!token"
          class="mb-5 rounded-lg bg-warning-50 px-4 py-2 text-center text-sm text-warning-500 dark:bg-warning-500/15"
        >
          Link inválido ou expirado. Solicite um novo link de redefinição.
        </div>
        <form class="space-y-5" @submit="onSubmit">
          <FormField
            name="password"
            label="Nova senha"
            type="password"
            placeholder="••••••••"
            hint="Use 8+ caracteres, com letras, números e símbolos"
          />
          <div v-if="password" class="space-y-1.5">
            <div class="flex gap-1">
              <span
                v-for="i in 4"
                :key="i"
                class="h-1.5 flex-1 rounded-full transition-colors"
                :class="i - 1 < score ? strength.color : 'bg-gray-200 dark:bg-gray-700'"
              />
            </div>
            <p class="text-xs font-medium" :class="strength.text">Força da senha: {{ strength.label }}</p>
          </div>
          <FormField
            name="confirmPassword"
            :label="t('auth.confirmPassword')"
            type="password"
            placeholder="••••••••"
          />
          <button
            type="submit"
            :disabled="loading"
            class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Salvando...
            </span>
            <span v-else>{{ t('auth.resetPassword') }}</span>
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useFieldValue } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import FormField from '@/components/ui/FormField.vue'
import IconBase from '@/components/ui/IconBase.vue'
import { useUiStore } from '@/stores/ui'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const ui = useUiStore()
const loading = ref(false)

const token = (route.query.token as string) ?? ''

const STRENGTH = [
  { label: 'Muito fraca', color: 'bg-error-500', text: 'text-error-500' },
  { label: 'Fraca', color: 'bg-error-500', text: 'text-error-500' },
  { label: 'Razoável', color: 'bg-warning-500', text: 'text-warning-500' },
  { label: 'Boa', color: 'bg-success-500', text: 'text-success-500' },
  { label: 'Forte', color: 'bg-success-500', text: 'text-success-500' },
]

function passwordScore(pw: string): number {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/\d/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

const schema = yup.object({
  password: yup.string().min(8, 'A senha deve ter ao menos 8 caracteres').required('Informe uma senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirme sua senha'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { password: '', confirmPassword: '' },
})

const password = useFieldValue<string>('password')
const score = computed(() => passwordScore(password.value ?? ''))
const strength = computed(() => STRENGTH[score.value])

const onSubmit = handleSubmit(async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  // token would be sent to the backend together with the new password
  void token
  ui.notifySuccess('Senha redefinida com sucesso! Faça login com a nova senha.')
  router.push('/login')
})
</script>
