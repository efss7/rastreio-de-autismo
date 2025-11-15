<template>
  <div class="w-full py-8 px-4">
    <div class="max-w-4xl mx-auto w-full">
      <!-- Card do Questionário -->
      <div class="card animate-slide-up shadow-xl">
        <div class="card-header">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">
                Questionário M-CHAT-R
              </h2>
              <p class="text-gray-600 text-sm mt-1">
                Responda todas as 20 perguntas sobre o comportamento da criança
              </p>
            </div>
            <div class="text-right">
              <span class="text-sm font-medium text-primary-600">
                Pergunta {{ perguntaAtual + 1 }} de {{ totalPerguntas }}
              </span>
            </div>
          </div>
        </div>

        <div class="card-body">
          <!-- Barra de Progresso -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">Progresso</span>
              <span class="text-sm font-medium text-primary-600">{{ progresso }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
                :style="{ width: progresso + '%' }"
              ></div>
            </div>
          </div>

          <!-- Pergunta Atual -->
          <div class="mb-8">
            <div class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 mb-6 border-2 border-primary-200">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {{ perguntaAtual + 1 }}
                </div>
                <div class="flex-1">
                  <p class="text-lg font-medium text-gray-900 leading-relaxed">
                    {{ perguntas[perguntaAtual].texto }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Opções de Resposta -->
            <div class="space-y-3">
              <button
                @click="responder('sim')"
                class="w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-4 hover:scale-[1.02]"
                :class="respostas[perguntaAtual] === 'sim' 
                  ? 'border-success-500 bg-success-50 shadow-md' 
                  : 'border-gray-200 hover:border-success-300 hover:bg-success-50'"
              >
                <div 
                  class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                  :class="respostas[perguntaAtual] === 'sim' 
                    ? 'border-success-600 bg-success-600' 
                    : 'border-gray-300'"
                >
                  <svg v-if="respostas[perguntaAtual] === 'sim'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-lg font-medium" :class="respostas[perguntaAtual] === 'sim' ? 'text-success-700' : 'text-gray-700'">
                  Sim
                </span>
              </button>

              <button
                @click="responder('nao')"
                class="w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-4 hover:scale-[1.02]"
                :class="respostas[perguntaAtual] === 'nao' 
                  ? 'border-danger-500 bg-danger-50 shadow-md' 
                  : 'border-gray-200 hover:border-danger-300 hover:bg-danger-50'"
              >
                <div 
                  class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                  :class="respostas[perguntaAtual] === 'nao' 
                    ? 'border-danger-600 bg-danger-600' 
                    : 'border-gray-300'"
                >
                  <svg v-if="respostas[perguntaAtual] === 'nao'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-lg font-medium" :class="respostas[perguntaAtual] === 'nao' ? 'text-danger-700' : 'text-gray-700'">
                  Não
                </span>
              </button>
            </div>
          </div>

          <!-- Indicador de Respostas -->
          <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-3 font-medium">Perguntas respondidas:</p>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(_, index) in perguntas" 
                :key="index"
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                :class="respostas[index] 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-500'"
              >
                {{ index + 1 }}
              </div>
            </div>
          </div>

          <!-- Navegação -->
          <div class="flex justify-between gap-4 pt-6 border-t border-gray-200">
            <button
              v-if="perguntaAtual === 0"
              @click="voltarParaDados"
              class="btn btn-outline px-8"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Voltar aos Dados
            </button>

            <button
              v-else
              @click="perguntaAnterior"
              class="btn btn-outline px-8"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            <button
              v-if="perguntaAtual < totalPerguntas - 1"
              @click="proximaPergunta"
              class="btn btn-primary px-8"
              :disabled="!respostas[perguntaAtual]"
            >
              Próxima
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              v-else
              @click="finalizar"
              class="btn btn-primary px-8"
              :disabled="!todasRespondidas"
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

      <!-- Informação de Ajuda -->
      <div class="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-sm text-gray-600">
            <p class="font-medium mb-1">Dica:</p>
            <p>Responda baseado no comportamento usual da criança. Se o comportamento é raro (você viu uma ou duas vezes), responda como se a criança NÃO faça isso.</p>
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
const { calcularPontuacao, classificarRisco } = useMCHAT()

// Estado
const perguntaAtual = ref(0)
const respostas = ref(Array(20).fill(null))
const isSubmitting = ref(false)

const totalPerguntas = 20

// Avisar antes de sair da página e limpar ao recarregar
const handleBeforeUnload = (e) => {
  const temRespostas = respostas.value.some(r => r !== null)
  
  if (temRespostas) {
    // Limpar respostas do questionário ao recarregar
    localStorage.removeItem('respostasMCHAT')
    
    e.preventDefault()
    e.returnValue = 'Você tem respostas não salvas. Se sair agora, perderá todas as respostas do questionário. Deseja realmente sair?'
    return e.returnValue
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  carregarProgresso()
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

// Perguntas do M-CHAT-R
const perguntas = [
  { id: 1, texto: 'Se você apontar para algum objeto no quarto, o seu filho olha para este objeto?' },
  { id: 2, texto: 'Alguma vez você se perguntou se o seu filho pode ser surdo?' },
  { id: 3, texto: 'O seu filho brinca de faz de contas?' },
  { id: 4, texto: 'O seu filho gosta de subir nas coisas?' },
  { id: 5, texto: 'O seu filho faz movimentos estranhos com os dedos perto dos olhos?' },
  { id: 6, texto: 'O seu filho aponta com o dedo para pedir algo ou para conseguir ajuda?' },
  { id: 7, texto: 'O seu filho aponta com o dedo para mostrar algo interessante para você?' },
  { id: 8, texto: 'O seu filho se interessa por outras crianças?' },
  { id: 9, texto: 'O seu filho traz coisas para mostrar para você?' },
  { id: 10, texto: 'O seu filho responde quando você o chama pelo nome?' },
  { id: 11, texto: 'Quando você sorri para o seu filho, ele sorri de volta para você?' },
  { id: 12, texto: 'O seu filho fica muito incomodado com barulhos do dia a dia?' },
  { id: 13, texto: 'O seu filho anda?' },
  { id: 14, texto: 'O seu filho olha nos seus olhos quando você está falando ou brincando com ele?' },
  { id: 15, texto: 'O seu filho tenta imitar o que você faz?' },
  { id: 16, texto: 'Quando você vira a cabeça para olhar para alguma coisa, o seu filho olha também?' },
  { id: 17, texto: 'O seu filho tenta fazer você olhar para ele?' },
  { id: 18, texto: 'O seu filho compreende quando você pede para ele fazer alguma coisa?' },
  { id: 19, texto: 'Quando acontece algo novo, o seu filho olha para o seu rosto para ver como você se sente?' },
  { id: 20, texto: 'O seu filho gosta de atividades de movimento?' }
]

// Computed
const progresso = computed(() => {
  const respondidas = respostas.value.filter(r => r !== null).length
  return Math.round((respondidas / totalPerguntas) * 100)
})

const todasRespondidas = computed(() => {
  return respostas.value.every(r => r !== null)
})

// Métodos
const responder = (resposta) => {
  respostas.value[perguntaAtual.value] = resposta
  
  // Avançar automaticamente para a próxima pergunta após responder
  setTimeout(() => {
    if (perguntaAtual.value < totalPerguntas - 1) {
      proximaPergunta()
    }
  }, 300)
}

const proximaPergunta = () => {
  if (!respostas.value[perguntaAtual.value]) {
    alert('Por favor, responda a pergunta atual antes de avançar.')
    return
  }
  if (perguntaAtual.value < totalPerguntas - 1) {
    perguntaAtual.value++
  }
}

const perguntaAnterior = () => {
  if (perguntaAtual.value > 0) {
    perguntaAtual.value--
  }
}

const voltarParaDados = () => {
  if (confirm('Tem certeza que deseja voltar? Você precisará responder o questionário novamente.')) {
    // Limpar respostas ao voltar
    respostas.value = Array(20).fill(null)
    perguntaAtual.value = 0
    localStorage.removeItem('respostasMCHAT')
    router.push({ name: 'DadosPessoais' })
  }
}

const salvarProgresso = () => {
  localStorage.setItem('respostasMCHAT', JSON.stringify(respostas.value))
}

const finalizar = async () => {
  if (!todasRespondidas.value) {
    alert('Por favor, responda todas as perguntas antes de finalizar.')
    return
  }

  isSubmitting.value = true

  try {
    // Salvar respostas
    salvarProgresso()
    
    // Calcular pontuação
    const resultado = calcularPontuacao(respostas.value)
    const risco = classificarRisco(resultado.pontos, resultado.itensCriticosFalhados.length)
    
    // Salvar resultado da triagem inicial
    const resultadoTriagem = {
      respostas: respostas.value,
      pontos: resultado.pontos,
      itensFalhados: resultado.itensFalhados,
      itensCriticosFalhados: resultado.itensCriticosFalhados,
      risco: risco
    }
    
    localStorage.setItem('resultadoTriagem', JSON.stringify(resultadoTriagem))
    
    // Simulação de processamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Decidir fluxo baseado no risco
    if (risco === 'MEDIO') {
      // Risco médio: vai para Follow-Up
      router.push({ name: 'FollowUp' })
    } else {
      // Baixo ou Alto risco: vai direto para resultado
      router.push({ name: 'Resultado' })
    }
  } catch (error) {
    console.error('Erro ao finalizar:', error)
    alert('Erro ao processar respostas. Tente novamente.')
  } finally {
    isSubmitting.value = false
  }
}

// Carregar respostas salvas (se existirem)
const carregarProgresso = () => {
  const salvo = localStorage.getItem('respostasMCHAT')
  if (salvo) {
    try {
      const respostasSalvas = JSON.parse(salvo)
      respostas.value = respostasSalvas
    } catch (error) {
      console.error('Erro ao carregar progresso:', error)
    }
  }
}

// Carregar ao montar
carregarProgresso()
</script>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

/* Animação suave ao mudar pergunta */
button:active {
  transform: scale(0.98);
}
</style>
