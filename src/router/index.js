import { createRouter, createWebHistory } from 'vue-router'
import DadosPessoaisForm from '../components/DadosPessoaisForm.vue'

const routes = [
  {
    path: '/',
    redirect: '/dados-pessoais'
  },
  {
    path: '/dados-pessoais',
    name: 'DadosPessoais',
    component: DadosPessoaisForm,
    meta: {
      title: 'Dados Pessoais',
      step: 1,
      totalSteps: 3
    }
  },
  {
    path: '/questionario',
    name: 'Questionario',
    component: () => import('../components/QuestionarioMCHAT.vue'),
    meta: {
      title: 'Questionário M-CHAT-R',
      step: 2,
      totalSteps: 3,
      requiresData: true // Requer dados da etapa 1
    }
  },
  {
    path: '/follow-up',
    name: 'FollowUp',
    component: () => import('../components/FollowUpMCHAT.vue'),
    meta: {
      title: 'Follow-Up M-CHAT-R/F',
      step: 2,
      totalSteps: 3,
      requiresData: true,
      requiresRastreio: true // Requer rastreio completo
    }
  },
  {
    path: '/resultado',
    name: 'Resultado',
    component: () => import('../components/ResultadoAvaliacao.vue'),
    meta: {
      title: 'Resultado da Avaliação',
      step: 3,
      totalSteps: 3,
      requiresData: true,
      requiresRastreio: true // Requer rastreio completo
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegação para proteger rotas
router.beforeEach((to, from, next) => {
  // Verificar se a rota requer dados pessoais
  if (to.meta.requiresData) {
    const dadosPessoais = localStorage.getItem('dadosPessoais')
    if (!dadosPessoais) {
      // Redirecionar para dados pessoais se não existirem
      next({ name: 'DadosPessoais' })
      return
    }
  }

  // Verificar se a rota requer rastreio completo
  if (to.meta.requiresRastreio) {
    const resultadoRastreio = localStorage.getItem('resultadoRastreio')
    if (!resultadoRastreio) {
      // Redirecionar para questionário se não houver rastreio
      next({ name: 'Questionario' })
      return
    }
  }

  // Atualizar título da página
  if (to.meta.title) {
    document.title = `${to.meta.title} | M-CHAT-R/F`
  }

  next()
})

export default router
