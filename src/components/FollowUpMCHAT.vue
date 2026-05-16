<template>
  <div class="w-full py-8 px-4">
    <div class="max-w-4xl mx-auto w-full">
      <!-- Card de Instrução -->
      <div class="card mb-6 animate-slide-up shadow-xl border-2 border-warning-300 bg-warning-50">
        <div class="card-body">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <svg class="w-12 h-12 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-warning-900 mb-2">
                Consulta de Seguimento Detalhada (M-CHAT-R/F)
              </h2>
              <p class="text-warning-800 mb-3">
                A triagem inicial indicou <strong>risco médio</strong> ({{ pontuacaoInicial }} pontos). 
              </p>
              <p class="text-warning-700 text-sm">
                Os itens abaixo falharam na triagem. Conduza uma entrevista com o responsável para cada item, 
                usando os exemplos como guia. Marque <strong>PASSOU</strong> se após esclarecimentos o comportamento for típico, 
                ou <strong>FALHOU</strong> se continuar indicando risco.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Progresso -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">Progresso da Entrevista</span>
          <span class="text-sm font-medium text-primary-600">{{ itemAtual + 1 }} de {{ itensFalhados.length }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
            :style="{ width: progressoPercentual + '%' }"
          ></div>
        </div>
      </div>

      <!-- Card do Item Atual -->
      <div class="card animate-fade-in shadow-xl">
        <div class="card-header">
          <h3 class="text-lg font-bold text-gray-900">
            Item {{ itensFalhados[itemAtual] }}
          </h3>
        </div>

        <div class="card-body">
          <!-- Pergunta Original -->
          <div class="mb-6 p-4 bg-primary-50 border-l-4 border-primary-500 rounded-r-lg">
            <p class="text-lg font-semibold text-gray-900 mb-2">
              {{ exemploAtual.titulo }}
            </p>
            <p class="text-sm text-primary-700 italic">
              {{ exemploAtual.instrucao }}
            </p>
          </div>

          <!-- Exemplos TÍPICOS (PASSOU) -->
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 class="text-md font-bold text-success-800">Exemplos TÍPICOS (PASSOU)</h4>
            </div>
            <ul class="space-y-2 ml-8">
              <li 
                v-for="(exemplo, idx) in exemploAtual.passou" 
                :key="'passou-' + idx"
                class="text-gray-700 flex items-start gap-2"
              >
                <span class="text-success-600 font-bold">•</span>
                <span>{{ exemplo }}</span>
              </li>
            </ul>
          </div>

          <!-- Exemplos ATÍPICOS (FALHOU) -->
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-6 h-6 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 class="text-md font-bold text-danger-800">Exemplos ATÍPICOS (FALHOU)</h4>
            </div>
            <ul class="space-y-2 ml-8">
              <li 
                v-for="(exemplo, idx) in exemploAtual.falhou" 
                :key="'falhou-' + idx"
                class="text-gray-700 flex items-start gap-2"
              >
                <span class="text-danger-600 font-bold">•</span>
                <span>{{ exemplo }}</span>
              </li>
            </ul>
          </div>

          <!-- Resultado da Entrevista -->
          <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
            <p class="text-center text-lg font-bold text-gray-900 mb-4">
              Após a entrevista, qual o resultado para este item?
            </p>
            
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="marcarResultado('passou')"
                class="p-6 rounded-xl border-3 transition-all duration-200 hover:scale-105"
                :class="resultados[itensFalhados[itemAtual]] === 'passou'
                  ? 'border-success-500 bg-success-50 shadow-lg'
                  : 'border-gray-300 bg-white hover:border-success-300'"
              >
                <div class="flex flex-col items-center gap-3">
                  <div 
                    class="w-16 h-16 rounded-full flex items-center justify-center transition-all"
                    :class="resultados[itensFalhados[itemAtual]] === 'passou'
                      ? 'bg-success-600'
                      : 'bg-gray-200'"
                  >
                    <svg class="w-10 h-10" :class="resultados[itensFalhados[itemAtual]] === 'passou' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span 
                    class="text-xl font-bold"
                    :class="resultados[itensFalhados[itemAtual]] === 'passou'
                      ? 'text-success-700'
                      : 'text-gray-600'"
                  >
                    PASSOU
                  </span>
                  <span class="text-sm text-center text-gray-600">
                    Comportamento típico após esclarecimentos
                  </span>
                </div>
              </button>

              <button
                @click="marcarResultado('falhou')"
                class="p-6 rounded-xl border-3 transition-all duration-200 hover:scale-105"
                :class="resultados[itensFalhados[itemAtual]] === 'falhou'
                  ? 'border-danger-500 bg-danger-50 shadow-lg'
                  : 'border-gray-300 bg-white hover:border-danger-300'"
              >
                <div class="flex flex-col items-center gap-3">
                  <div 
                    class="w-16 h-16 rounded-full flex items-center justify-center transition-all"
                    :class="resultados[itensFalhados[itemAtual]] === 'falhou'
                      ? 'bg-danger-600'
                      : 'bg-gray-200'"
                  >
                    <svg class="w-10 h-10" :class="resultados[itensFalhados[itemAtual]] === 'falhou' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span 
                    class="text-xl font-bold"
                    :class="resultados[itensFalhados[itemAtual]] === 'falhou'
                      ? 'text-danger-700'
                      : 'text-gray-600'"
                  >
                    FALHOU
                  </span>
                  <span class="text-sm text-center text-gray-600">
                    Comportamento atípico mantém-se
                  </span>
                </div>
              </button>
            </div>
          </div>

          <!-- Navegação -->
          <div class="flex justify-between gap-4 pt-6 border-t border-gray-200 mt-6">
            <button
              @click="itemAnterior"
              class="btn btn-outline px-8"
              :disabled="itemAtual === 0"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            <button
              v-if="itemAtual < itensFalhados.length - 1"
              @click="proximoItem"
              class="btn btn-primary px-8"
              :disabled="!resultados[itensFalhados[itemAtual]]"
            >
              Próximo Item
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              v-else
              @click="finalizar"
              class="btn btn-primary px-8"
              :disabled="!todosAvaliados"
            >
              <span v-if="isSubmitting" class="flex items-center gap-2">
                <div class="spinner w-5 h-5"></div>
                Finalizando...
              </span>
              <span v-else class="flex items-center gap-2">
                Finalizar e Ver Resultado
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Resumo de Itens -->
      <div class="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <p class="text-sm font-medium text-gray-700 mb-3">Status dos itens avaliados:</p>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="(item, idx) in itensFalhados"
            :key="item"
            @click="itemAtual = idx"
            class="px-4 py-2 rounded-lg border-2 cursor-pointer transition-all hover:scale-105"
            :class="{
              'border-primary-500 bg-primary-50': idx === itemAtual,
              'border-success-500 bg-success-50': resultados[item] === 'passou',
              'border-danger-500 bg-danger-50': resultados[item] === 'falhou',
              'border-gray-300 bg-gray-50': !resultados[item] && idx !== itemAtual
            }"
          >
            <span class="font-bold text-sm">Item {{ item }}</span>
            <span v-if="resultados[item]" class="ml-2 text-xs">
              {{ resultados[item] === 'passou' ? '✓' : '✗' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMCHAT } from '../composables/useMCHAT'

const router = useRouter()
const { exemplosFollowUp, recalcularAposFollowUp } = useMCHAT()

// Estado
const itemAtual = ref(0)
const resultados = ref({})
const isSubmitting = ref(false)
const itensFalhados = ref([])
const pontuacaoInicial = ref(0)

// Computed
const exemploAtual = computed(() => {
  return exemplosFollowUp[itensFalhados.value[itemAtual.value]] || {}
})

const progressoPercentual = computed(() => {
  const avaliados = Object.keys(resultados.value).length
  return Math.round((avaliados / itensFalhados.value.length) * 100)
})

const todosAvaliados = computed(() => {
  return itensFalhados.value.every(item => resultados.value[item])
})

const handleBeforeUnload = (e) => {
  if (Object.keys(resultados.value).length > 0) {
    localStorage.removeItem('resultadoFollowUp')
    e.preventDefault()
    e.returnValue = 'Você tem respostas da entrevista não salvas. Se sair agora, perderá o progresso do Follow-Up. Deseja realmente sair?'
    return e.returnValue
  }
}

// Métodos
const marcarResultado = (resultado) => {
  resultados.value[itensFalhados.value[itemAtual.value]] = resultado
  
  setTimeout(() => {
    if (itemAtual.value < itensFalhados.value.length - 1) {
      proximoItem()
    }
  }, 300)
}

const proximoItem = () => {
  if (itemAtual.value < itensFalhados.value.length - 1) {
    itemAtual.value++
  }
}

const itemAnterior = () => {
  if (itemAtual.value > 0) {
    itemAtual.value--
  }
}

const finalizar = async () => {
  if (!todosAvaliados.value) {
    alert('Por favor, avalie todos os itens antes de finalizar.')
    return
  }

  isSubmitting.value = true

  try {
    const resultadoFinal = recalcularAposFollowUp(resultados.value)
    
    const followUpData = {
      resultados: resultados.value,
      pontuacaoFinal: resultadoFinal.pontos,
      riscoFinal: resultadoFinal.risco
    }
    
    localStorage.setItem('resultadoFollowUp', JSON.stringify(followUpData))
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push({ name: 'Resultado' })
  } catch (error) {
    console.error('Erro ao finalizar:', error)
    alert('Erro ao processar Follow-Up. Tente novamente.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const triagemData = localStorage.getItem('resultadoTriagem')
  
  if (!triagemData) {
    router.push({ name: 'DadosPessoais' })
    return
  }
  
  const triagem = JSON.parse(triagemData)
  itensFalhados.value = triagem.itensFalhados
  pontuacaoInicial.value = triagem.pontos
  
  window.addEventListener('beforeunload', handleBeforeUnload)
  
  const followUpSalvo = localStorage.getItem('resultadoFollowUp')
  if (followUpSalvo) {
    const follow = JSON.parse(followUpSalvo)
    resultados.value = follow.resultados
  }
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style scoped>
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-slide-up { animation: slideUp 0.6s ease-out; }
.animate-fade-in  { animation: fadeIn 0.4s ease-out; }

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>