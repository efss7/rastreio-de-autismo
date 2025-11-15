<template>
  <header class="sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300"
          :class="isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/80 border-gray-200'">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Spacer (esquerda) -->
        <div class="w-10"></div>
        
        <!-- Título Central -->
        <div class="flex-1 flex justify-center">
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-center transition-colors duration-300"
              :class="isDark ? 'text-white' : 'text-gray-900'">
            <span class="gradient-primary bg-clip-text text-transparent">
              M-CHAT-R/F
            </span>
            <span :class="isDark ? 'text-gray-300' : 'text-gray-700'"> - </span>
            <span :class="isDark ? 'text-gray-300' : 'text-gray-800'">
              Triagem de Autismo
            </span>
          </h1>
        </div>
        
        <!-- Toggle de Tema (direita) -->
        <div class="flex items-center gap-2">
          <button
            @click="toggleTheme"
            class="relative p-2 rounded-lg transition-all duration-300 hover:scale-110"
            :class="isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-primary-100 hover:bg-primary-200'"
            title="Alternar tema"
          >
            <!-- Ícone Sol -->
            <svg
              v-if="!isDark"
              class="w-6 h-6 text-primary-600 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            
            <!-- Ícone Lua -->
            <svg
              v-else
              class="w-6 h-6 text-primary-400 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            
            <!-- Indicador de estado -->
            <span class="absolute -top-1 -right-1 w-3 h-3 rounded-full transition-colors duration-300"
                  :class="isDark ? 'bg-primary-400' : 'bg-primary-600'">
            </span>
          </button>
        </div>
      </div>
      
      <!-- Subtítulo -->
      <p class="text-center text-sm md:text-base mt-2 transition-colors duration-300"
         :class="isDark ? 'text-gray-400' : 'text-gray-600'">
        Preencha os dados do paciente para iniciar a avaliação
      </p>
    </div>
    
    <!-- Indicador de Progresso -->
    <div class="max-w-7xl mx-auto px-4 py-4">
      <ProgressIndicator />
    </div>
  </header>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
import ProgressIndicator from './ProgressIndicator.vue'

const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
/* Animação do toggle */
button {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Efeito de pulso no indicador */
button span {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
