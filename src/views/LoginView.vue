<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-4 dark:from-gray-900 dark:via-gray-dark dark:to-gray-900">
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
      <div class="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-warning-100/60 blur-3xl dark:bg-brand-700/10" />
    </div>

    <div class="w-full max-w-md">
      <div class="mb-6 flex flex-col items-center">
        <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-theme-md">
          <span class="text-2xl font-bold">A</span>
        </span>
        <h1 class="mt-5 text-title-sm font-bold text-gray-800 dark:text-white/90">
          Bem-vindo de volta
        </h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Faça login para acessar o painel
        </p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-md dark:border-gray-800 dark:bg-gray-dark md:p-8">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div class="relative">
              <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <IconBase name="mail" :size="18" />
              </span>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="seu@email.com"
                class="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-brand-300 focus:bg-white focus-ring dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:bg-gray-800"
              />
            </div>
          </div>

          <div>
            <label for="password" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Senha
            </label>
            <div class="relative">
              <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <IconBase name="lock" :size="18" />
              </span>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-brand-300 focus:bg-white focus-ring dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:bg-gray-800"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                @click="showPassword = !showPassword"
              >
                <IconBase :name="showPassword ? 'eye-off' : 'eye'" :size="18" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                v-model="remember"
                class="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
              />
              Lembrar-me
            </label>
            <RouterLink to="/forgot-password" class="font-medium text-brand-500 hover:text-brand-600">
              Esqueceu a senha?
            </RouterLink>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 focus-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
              Entrando...
            </span>
            <span v-else>Entrar</span>
          </button>

          <p v-if="error" class="rounded-lg bg-error-50 px-4 py-2 text-center text-sm text-error-600 dark:bg-error-500/15 dark:text-error-500">
            {{ error }}
          </p>
        </form>

        <div class="mt-6 rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
          <p class="font-medium text-gray-600 dark:text-gray-300">Credenciais demo:</p>
          <p>admin@template.com / admin123</p>
          <p>user@template.com / user123</p>
        </div>
      </div>

      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Ainda não tem conta?
        <RouterLink to="/register" class="font-medium text-brand-500 hover:text-brand-600">Criar conta</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import IconBase from '@/components/ui/IconBase.vue'

const email = ref('admin@template.com')
const password = ref('admin123')
const remember = ref(true)
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function handleLogin() {
  error.value = ''
  loading.value = true
  const ok = await auth.login(email.value, password.value)
  loading.value = false
  if (!ok) {
    error.value = 'Email ou senha incorretos'
    return
  }
  const redirect = (route.query.redirect as string) || '/dashboard'
  router.push(redirect)
}
</script>
