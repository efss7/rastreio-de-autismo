import { ref, watch } from 'vue'

// Estado global compartilhado entre todos os componentes
const isDark = ref(false)

// Inicializar tema apenas uma vez
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark'
  applyTheme()
}

// Aplicar tema ao documento
const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Watch para aplicar tema automaticamente quando mudar
watch(isDark, () => {
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
})

// Inicializar tema assim que o módulo for carregado
if (typeof window !== 'undefined') {
  initTheme()
}

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
}
