<template>
  <div class="mb-8">
    <div class="flex items-center justify-between max-w-3xl mx-auto">
      <!-- Etapa 1: Dados Pessoais -->
      <div class="flex items-center flex-1">
        <div 
          class="flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300"
          :class="currentStep >= 1 
            ? 'bg-primary-600 text-white' 
            : (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500')"
        >
          <svg v-if="currentStep > 1" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span v-else>1</span>
        </div>
        <div class="ml-3 hidden sm:block">
          <p 
            class="text-sm font-medium transition-colors duration-300" 
            :class="currentStep >= 1 
              ? (isDark ? 'text-white' : 'text-gray-900')
              : (isDark ? 'text-gray-500' : 'text-gray-500')"
          >
            Dados Pessoais
          </p>
        </div>
        <div 
          class="flex-1 h-1 mx-4 transition-all duration-300"
          :class="currentStep > 1 
            ? 'bg-primary-600' 
            : (isDark ? 'bg-gray-700' : 'bg-gray-200')"
        ></div>
      </div>

      <!-- Etapa 2: Questionário -->
      <div class="flex items-center flex-1">
        <div 
          class="flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300"
          :class="currentStep >= 2 
            ? 'bg-primary-600 text-white' 
            : (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500')"
        >
          <svg v-if="currentStep > 2" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span v-else>2</span>
        </div>
        <div class="ml-3 hidden sm:block">
          <p 
            class="text-sm font-medium transition-colors duration-300" 
            :class="currentStep >= 2 
              ? (isDark ? 'text-white' : 'text-gray-900')
              : (isDark ? 'text-gray-500' : 'text-gray-500')"
          >
            Questionário
          </p>
        </div>
        <div 
          class="flex-1 h-1 mx-4 transition-all duration-300"
          :class="currentStep > 2 
            ? 'bg-primary-600' 
            : (isDark ? 'bg-gray-700' : 'bg-gray-200')"
        ></div>
      </div>

      <!-- Etapa 3: Resultado -->
      <div class="flex items-center">
        <div 
          class="flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300"
          :class="currentStep >= 3 
            ? 'bg-primary-600 text-white' 
            : (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500')"
        >
          3
        </div>
        <div class="ml-3 hidden sm:block">
          <p 
            class="text-sm font-medium transition-colors duration-300" 
            :class="currentStep >= 3 
              ? (isDark ? 'text-white' : 'text-gray-900')
              : (isDark ? 'text-gray-500' : 'text-gray-500')"
          >
            Resultado
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const { isDark } = useTheme()

const currentStep = computed(() => {
  return route.meta.step || 1
})
</script>
