<template>
  <div class="min-h-screen transition-colors duration-300" 
       :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'">
    <AppHeader />
    
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme'
import AppHeader from './components/AppHeader.vue'

const { isDark } = useTheme()
</script>

<style>
/* Transição entre rotas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


