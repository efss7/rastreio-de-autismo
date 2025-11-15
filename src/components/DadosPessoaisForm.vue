<template>
  <div class="w-full py-8 px-4">
    <div class="max-w-6xl mx-auto w-full">
      <!-- Formulário -->
      <div class="card animate-slide-up shadow-xl">
        <div class="card-header">
          <h2 class="text-2xl font-bold text-gray-900">
            Informações do Paciente
          </h2>
          <p class="text-gray-600 text-sm mt-1">
            Todos os campos são obrigatórios
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="card-body">
          <!-- Grid de 2 colunas -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Nome da Criança -->
            <div class="lg:col-span-2">
              <label for="nomeCrianca" class="label">
                Nome da Criança <span class="text-danger-600">*</span>
              </label>
              <input
                id="nomeCrianca"
                v-model="formData.nomeCrianca"
                type="text"
                class="input"
                :class="{ 'input-error': errors.nomeCrianca }"
                placeholder="Digite o nome completo da criança"
                @blur="validateField('nomeCrianca')"
                @input="clearError('nomeCrianca')"
              />
              <p v-if="errors.nomeCrianca" class="text-danger-600 text-sm mt-1">
                {{ errors.nomeCrianca }}
              </p>
            </div>

            <!-- Data de Nascimento -->
            <div>
              <label for="dataNascimento" class="label">
                Data de Nascimento <span class="text-danger-600">*</span>
              </label>
              <input
                id="dataNascimento"
                v-model="formData.dataNascimento"
                type="date"
                class="input"
                :class="{ 'input-error': errors.dataNascimento }"
                :max="hoje"
                @blur="validateField('dataNascimento')"
                @change="validateField('dataNascimento')"
              />
              <p v-if="idade" class="text-primary-600 text-sm mt-1 font-medium">
                Idade: {{ idade }}
              </p>
              <p v-if="errors.dataNascimento" class="text-danger-600 text-sm mt-1">
                {{ errors.dataNascimento }}
              </p>
            </div>

            <!-- Nome da Mãe ou Acompanhante -->
            <div>
              <label for="nomeResponsavel" class="label">
                Nome da Mãe ou Acompanhante <span class="text-danger-600">*</span>
              </label>
              <input
                id="nomeResponsavel"
                v-model="formData.nomeResponsavel"
                type="text"
                class="input"
                :class="{ 'input-error': errors.nomeResponsavel }"
                placeholder="Digite o nome do responsável"
                @blur="validateField('nomeResponsavel')"
                @input="clearError('nomeResponsavel')"
              />
              <p v-if="errors.nomeResponsavel" class="text-danger-600 text-sm mt-1">
                {{ errors.nomeResponsavel }}
              </p>
            </div>

            <!-- Data da Avaliação -->
            <div>
              <label for="dataAvaliacao" class="label">
                Data da Avaliação <span class="text-danger-600">*</span>
              </label>
              <input
                id="dataAvaliacao"
                v-model="formData.dataAvaliacao"
                type="date"
                class="input"
                :class="{ 'input-error': errors.dataAvaliacao }"
                :max="hoje"
                @blur="validateField('dataAvaliacao')"
                @change="validateField('dataAvaliacao')"
              />
              <p v-if="errors.dataAvaliacao" class="text-danger-600 text-sm mt-1">
                {{ errors.dataAvaliacao }}
              </p>
            </div>

            <!-- E-mail do Profissional -->
            <div>
              <label for="emailProfissional" class="label">
                E-mail do Profissional <span class="text-danger-600">*</span>
              </label>
              <input
                id="emailProfissional"
                v-model="formData.emailProfissional"
                type="email"
                class="input"
                :class="{ 'input-error': errors.emailProfissional }"
                placeholder="exemplo@email.com"
                @blur="validateField('emailProfissional')"
                @input="clearError('emailProfissional')"
              />
              <p class="text-gray-500 text-xs mt-1">
                Este e-mail será registrado no PDF
              </p>
              <p v-if="errors.emailProfissional" class="text-danger-600 text-sm mt-1">
                {{ errors.emailProfissional }}
              </p>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="limparFormulario"
              class="btn btn-outline sm:w-auto px-8"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpar Formulário
            </button>
            <button
              type="submit"
              class="btn btn-primary flex-1 sm:flex-initial sm:px-12"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <div class="spinner w-5 h-5"></div>
                Processando...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                Continuar para Avaliação
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- Informações Adicionais -->
      <div class="mt-6 text-center">
        <div class="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-6 py-3 rounded-full shadow-sm">
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Seus dados estão seguros e serão usados apenas para fins de avaliação</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dados do formulário
const formData = ref({
  nomeCrianca: '',
  dataNascimento: '',
  nomeResponsavel: '',
  dataAvaliacao: '',
  emailProfissional: ''
})

// Erros de validação
const errors = ref({
  nomeCrianca: '',
  dataNascimento: '',
  nomeResponsavel: '',
  dataAvaliacao: '',
  emailProfissional: ''
})

// Estado de submissão
const isSubmitting = ref(false)

// Data de hoje (formato YYYY-MM-DD)
const hoje = computed(() => {
  const data = new Date()
  return data.toISOString().split('T')[0]
})

// Calcular idade da criança
const idade = computed(() => {
  if (!formData.value.dataNascimento) return null
  
  const nascimento = new Date(formData.value.dataNascimento + 'T00:00:00')
  const hoje = new Date()
  
  let anos = hoje.getFullYear() - nascimento.getFullYear()
  let meses = hoje.getMonth() - nascimento.getMonth()
  let dias = hoje.getDate() - nascimento.getDate()
  
  if (dias < 0) {
    meses--
  }
  
  if (meses < 0) {
    anos--
    meses += 12
  }
  
  if (anos > 0) {
    if (meses > 0) {
      return `${anos} ano${anos > 1 ? 's' : ''} e ${meses} ${meses > 1 ? 'meses' : 'mês'}`
    }
    return `${anos} ano${anos > 1 ? 's' : ''}`
  } else if (meses > 0) {
    return `${meses} ${meses > 1 ? 'meses' : 'mês'}`
  }
  
  return 'Menos de 1 mês'
})

// Validar campo individual
const validateField = (field) => {
  errors.value[field] = ''
  
  switch (field) {
    case 'nomeCrianca':
      if (!formData.value.nomeCrianca.trim()) {
        errors.value.nomeCrianca = 'O nome da criança é obrigatório'
      } else if (formData.value.nomeCrianca.trim().length < 3) {
        errors.value.nomeCrianca = 'O nome deve ter pelo menos 3 caracteres'
      }
      break
      
    case 'dataNascimento':
      if (!formData.value.dataNascimento) {
        errors.value.dataNascimento = 'A data de nascimento é obrigatória'
      } else {
        const nascimento = new Date(formData.value.dataNascimento)
        const hoje = new Date()
        if (nascimento > hoje) {
          errors.value.dataNascimento = 'A data de nascimento não pode ser futura'
        }
      }
      break
      
    case 'nomeResponsavel':
      if (!formData.value.nomeResponsavel.trim()) {
        errors.value.nomeResponsavel = 'O nome do responsável é obrigatório'
      } else if (formData.value.nomeResponsavel.trim().length < 3) {
        errors.value.nomeResponsavel = 'O nome deve ter pelo menos 3 caracteres'
      }
      break
      
    case 'dataAvaliacao':
      if (!formData.value.dataAvaliacao) {
        errors.value.dataAvaliacao = 'A data da avaliação é obrigatória'
      } else {
        const avaliacao = new Date(formData.value.dataAvaliacao)
        const hoje = new Date()
        if (avaliacao > hoje) {
          errors.value.dataAvaliacao = 'A data da avaliação não pode ser futura'
        }
      }
      break
      
    case 'emailProfissional':
      if (!formData.value.emailProfissional.trim()) {
        errors.value.emailProfissional = 'O e-mail do profissional é obrigatório'
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.value.emailProfissional)) {
          errors.value.emailProfissional = 'Digite um e-mail válido'
        }
      }
      break
  }
}

// Limpar erro de um campo
const clearError = (field) => {
  if (errors.value[field]) {
    errors.value[field] = ''
  }
}

// Validar todos os campos
const validateForm = () => {
  validateField('nomeCrianca')
  validateField('dataNascimento')
  validateField('nomeResponsavel')
  validateField('dataAvaliacao')
  validateField('emailProfissional')
  
  return Object.values(errors.value).every(error => error === '')
}

// Limpar formulário
const limparFormulario = () => {
  formData.value = {
    nomeCrianca: '',
    dataNascimento: '',
    nomeResponsavel: '',
    dataAvaliacao: '',
    emailProfissional: ''
  }
  
  errors.value = {
    nomeCrianca: '',
    dataNascimento: '',
    nomeResponsavel: '',
    dataAvaliacao: '',
    emailProfissional: ''
  }
}

// Submeter formulário
const handleSubmit = async () => {
  if (!validateForm()) {
    // Scroll para o primeiro erro
    const firstError = Object.keys(errors.value).find(key => errors.value[key])
    if (firstError) {
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Salvar dados no localStorage
    localStorage.setItem('dadosPessoais', JSON.stringify(formData.value))
    
    // Simulação de processamento
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Navegar para o questionário
    router.push({ name: 'Questionario' })
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    alert('Erro ao salvar dados. Tente novamente.')
  } finally {
    isSubmitting.value = false
  }
}

// Definir data da avaliação como hoje ao montar o componente
onMounted(() => {
  formData.value.dataAvaliacao = hoje.value
})
</script>

<style scoped>
/* Animações */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

/* Garantir que os inputs de data funcionem corretamente */
input[type="date"] {
  min-height: 42px;
  padding-right: 0.5rem;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  padding: 0.25rem;
}

input[type="date"]::-webkit-datetime-edit {
  padding: 0.25rem;
}

/* Animações suaves */
input:focus {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* Melhorar aparência dos inputs */
.input {
  font-size: 1rem;
  line-height: 1.5;
}

/* Responsividade para textos */
@media (max-width: 640px) {
  .btn {
    width: 100%;
  }
}
</style>