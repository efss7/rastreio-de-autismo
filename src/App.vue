<template>
  <div class="min-h-screen transition-colors duration-300" 
       :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'">
    <AppHeader />
    
    <main>
      <DadosPessoaisForm />
    </main>
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme'
import AppHeader from './components/AppHeader.vue'
import DadosPessoaisForm from './components/DadosPessoaisForm.vue'

const { isDark } = useTheme()
</script>


