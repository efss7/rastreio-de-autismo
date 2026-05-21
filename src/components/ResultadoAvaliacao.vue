<template>
  <div class="w-full py-8 px-4">
    <div class="max-w-6xl mx-auto w-full">
      <!-- Card de Resultado -->
      <div class="card animate-slide-up shadow-xl">
        <!-- Header com Status -->
        <div 
          class="card-header border-b-4"
          :class="{
            'bg-gradient-to-r from-success-50 to-success-100 border-success-500': riscoFinal === 'BAIXO',
            'bg-gradient-to-r from-warning-50 to-warning-100 border-warning-500': riscoFinal === 'MEDIO',
            'bg-gradient-to-r from-danger-50 to-danger-100 border-danger-500': riscoFinal === 'ALTO'
          }"
        >
          <div class="flex items-center gap-4">
            <!-- Ícone do Status -->
            <div 
              class="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              :class="{
                'bg-success-600': riscoFinal === 'BAIXO',
                'bg-warning-600': riscoFinal === 'MEDIO',
                'bg-danger-600': riscoFinal === 'ALTO'
              }"
            >
              <svg v-if="riscoFinal === 'BAIXO'" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else-if="riscoFinal === 'MEDIO'" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <svg v-else class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div class="flex-1">
              <h2 class="text-3xl font-bold mb-2" :class="{
                'text-success-900': riscoFinal === 'BAIXO',
                'text-warning-900': riscoFinal === 'MEDIO',
                'text-danger-900': riscoFinal === 'ALTO'
              }">
                {{ tituloRisco }}
              </h2>
              <p class="text-lg" :class="{
                'text-success-700': riscoFinal === 'BAIXO',
                'text-warning-700': riscoFinal === 'MEDIO',
                'text-danger-700': riscoFinal === 'ALTO'
              }">
                {{ descricaoRisco }}
              </p>
            </div>
          </div>
        </div>

        <div class="card-body">
          <!-- Dados do Paciente -->
          <div class="mb-8 p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Dados do Paciente
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-sm text-gray-600">Nome da Criança:</span>
                <p class="font-semibold text-gray-900">{{ dadosPaciente.nomeCrianca }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Data de Nascimento:</span>
                <p class="font-semibold text-gray-900">{{ formatarData(dadosPaciente.dataNascimento) }} ({{ idadeCrianca }})</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Responsável:</span>
                <p class="font-semibold text-gray-900">{{ dadosPaciente.nomeResponsavel }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Data da Avaliação:</span>
                <p class="font-semibold text-gray-900">{{ formatarData(dadosPaciente.dataAvaliacao) }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Profissional:</span>
                <p class="font-semibold text-gray-900">{{ dadosPaciente.emailProfissional }}</p>
              </div>
            </div>
          </div>

          <!-- Pontuação -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Pontuação Inicial -->
            <div class="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border-2 border-primary-200">
              <div class="text-center">
                <p class="text-sm font-medium text-primary-700 mb-2">Rastreio Inicial</p>
                <p class="text-5xl font-bold text-primary-900 mb-1">{{ pontuacaoInicial }}</p>
                <p class="text-sm text-primary-600">de 20 pontos</p>
              </div>
            </div>

            <!-- Follow-Up (se aplicável) -->
            <div 
              v-if="fezFollowUp"
              class="p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl border-2 border-secondary-200"
            >
              <div class="text-center">
                <p class="text-sm font-medium text-secondary-700 mb-2">Após Follow-Up</p>
                <p class="text-5xl font-bold text-secondary-900 mb-1">{{ pontuacaoFollowUp }}</p>
                <p class="text-sm text-secondary-600">pontos reavaliados</p>
              </div>
            </div>

            <!-- Pontuação Final (quando não fez follow-up) -->
            <div
              v-if="!fezFollowUp"
              class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200"
            >
              <div class="text-center">
                <p class="text-sm font-medium text-gray-600 mb-2">Pontuação Final</p>
                <p class="text-5xl font-bold text-gray-800 mb-1">{{ pontuacaoFinal }}</p>
                <p class="text-sm text-gray-500">itens com indicação de risco</p>
              </div>
            </div>
          </div>

          <!-- Gráfico Visual de Risco -->
          <div class="mb-8 p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Classificação de Risco</h3>

            <!-- Barra da Rastreio Inicial (3 faixas) -->
            <div v-if="!fezFollowUp" class="space-y-4">
              <div class="relative h-16 bg-gradient-to-r from-success-200 via-warning-200 to-danger-200 rounded-full overflow-hidden">
                <div 
                  class="absolute top-0 h-full w-1 bg-gray-900 transition-all duration-500"
                  :style="{ left: posicaoIndicador + '%' }"
                >
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded whitespace-nowrap">
                    {{ pontuacaoFinal }} pontos
                  </div>
                  <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full"></div>
                </div>
              </div>
              <div class="flex justify-between text-sm font-medium pt-6">
                <div class="text-success-700">
                  <span class="block">BAIXO</span>
                  <span class="text-xs text-gray-600">0–2 pontos</span>
                </div>
                <div class="text-warning-700">
                  <span class="block">MÉDIO</span>
                  <span class="text-xs text-gray-600">3–7 pontos</span>
                </div>
                <div class="text-danger-700">
                  <span class="block">ALTO</span>
                  <span class="text-xs text-gray-600">8–20 pontos</span>
                </div>
              </div>
            </div>

            <!-- Barra do Follow-Up (2 polos: negativo / positivo) -->
            <div v-else class="space-y-4">
              <div class="relative h-16 bg-gradient-to-r from-success-200 to-danger-200 rounded-full overflow-hidden">
                <div 
                  class="absolute top-0 h-full w-1 bg-gray-900 transition-all duration-500"
                  :style="{ left: posicaoIndicadorFollowUp + '%' }"
                >
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded whitespace-nowrap">
                    {{ pontuacaoFollowUp }} {{ pontuacaoFollowUp === 1 ? 'item' : 'itens' }} com risco
                  </div>
                  <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full"></div>
                </div>
                <!-- Linha divisória no threshold de 2 -->
                <div class="absolute top-0 h-full w-0.5 bg-gray-600 opacity-40" style="left: 10%"></div>
              </div>
              <div class="flex justify-between text-sm font-medium pt-6">
                <div class="text-success-700">
                  <span class="block">NEGATIVO</span>
                  <span class="text-xs text-gray-600">0–1 item com risco</span>
                </div>
                <div class="text-danger-700 text-right">
                  <span class="block">POSITIVO — encaminhar</span>
                  <span class="text-xs text-gray-600">≥ 2 itens com risco</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recomendações Clínicas -->
          <div 
            class="mb-8 p-6 rounded-xl border-2"
            :class="{
              'bg-success-50 border-success-200': riscoFinal === 'BAIXO',
              'bg-warning-50 border-warning-200': riscoFinal === 'MEDIO',
              'bg-danger-50 border-danger-200': riscoFinal === 'ALTO'
            }"
          >
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2" :class="{
              'text-success-900': riscoFinal === 'BAIXO',
              'text-warning-900': riscoFinal === 'MEDIO',
              'text-danger-900': riscoFinal === 'ALTO'
            }">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Recomendações Clínicas
            </h3>
            
            <div class="space-y-3">
              <div 
                v-for="(recomendacao, idx) in recomendacoes" 
                :key="idx"
                class="flex items-start gap-3 p-3 bg-white rounded-lg"
              >
                <div class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" :class="{
                  'bg-success-600': riscoFinal === 'BAIXO',
                  'bg-warning-600': riscoFinal === 'MEDIO',
                  'bg-danger-600': riscoFinal === 'ALTO'
                }">
                  <span class="text-white text-xs font-bold">{{ idx + 1 }}</span>
                </div>
                <p class="text-gray-800 leading-relaxed">{{ recomendacao }}</p>
              </div>
            </div>
          </div>

          <!-- Itens que Falharam -->
          <div v-if="itensFalhados.length > 0" class="mb-8 p-6 bg-gray-50 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Itens que Indicaram Risco</h3>
            <div class="flex flex-wrap gap-3">
              <div 
                v-for="item in itensFalhados" 
                :key="item"
                class="p-3 rounded-lg text-center border-2 bg-gray-100 border-gray-300"
              >
                <span class="font-bold text-lg text-gray-700">{{ item }}</span>
              </div>
            </div>
          </div>

          <!-- Ações -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              @click="baixarPDF"
              class="btn btn-primary flex-1"
              :disabled="gerandoPDF"
            >
              <span v-if="gerandoPDF" class="flex items-center justify-center gap-2">
                <div class="spinner w-5 h-5"></div>
                Gerando PDF...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Baixar Relatório em PDF
              </span>
            </button>

            <button
              @click="novaAvaliacao"
              class="btn btn-outline sm:w-auto px-8"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Nova Avaliação
            </button>
          </div>
        </div>
      </div>

      <!-- Informações Adicionais -->
      <div class="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-sm text-gray-600">
            <p class="font-medium mb-1">Informação Importante:</p>
            <p>
              O M-CHAT-R/F é um instrumento de rastreio, não um diagnóstico. 
              Um resultado de risco não confirma autismo, mas indica necessidade de avaliação mais aprofundada. 
              Consulte sempre um profissional especializado.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMCHAT } from '../composables/useMCHAT'
import jsPDF from 'jspdf'

const router = useRouter()
const { perguntasMCHAT } = useMCHAT()

// Estado
const dadosPaciente = ref({})
const pontuacaoInicial = ref(0)
const pontuacaoFollowUp = ref(0)
const pontuacaoFinal = ref(0)
const itensFalhados = ref([])
const riscoFinal = ref('BAIXO')
const fezFollowUp = ref(false)
const gerandoPDF = ref(false)

// Computed
const idadeCrianca = computed(() => {
  if (!dadosPaciente.value.dataNascimento) return ''
  
  const nascimento = new Date(dadosPaciente.value.dataNascimento + 'T00:00:00')
  const hoje = new Date()
  
  let anos = hoje.getFullYear() - nascimento.getFullYear()
  let meses = hoje.getMonth() - nascimento.getMonth()
  
  if (meses < 0) {
    anos--
    meses += 12
  }
  
  if (anos > 0) {
    if (meses > 0) {
      return `${anos} ano${anos > 1 ? 's' : ''} e ${meses} ${meses > 1 ? 'meses' : 'mês'}`
    }
    return `${anos} ano${anos > 1 ? 's' : ''}`
  }
  return `${meses} ${meses > 1 ? 'meses' : 'mês'}`
})

const tituloRisco = computed(() => {
  if (riscoFinal.value === 'BAIXO') {
    return fezFollowUp.value
      ? 'Rastreio Negativo após Follow-Up'
      : 'Baixo Risco para TEA'
  }
  if (riscoFinal.value === 'MEDIO') return 'Risco Médio para TEA'
  if (riscoFinal.value === 'ALTO')  return 'Alto Risco para TEA'
  return 'Resultado da Avaliação'
})

const descricaoRisco = computed(() => {
  if (riscoFinal.value === 'BAIXO') {
    return fezFollowUp.value
      ? 'Após a Consulta de Seguimento, menos de 2 itens mantiveram indicação de risco'
      : 'A criança apresentou desenvolvimento típico no rastreio'
  }
  if (riscoFinal.value === 'MEDIO') return 'Recomenda-se monitoramento e reavaliação futura'
  if (riscoFinal.value === 'ALTO') {
    return fezFollowUp.value
      ? '2 ou mais itens mantiveram indicação de risco — encaminhamento imediato recomendado'
      : 'Encaminhamento para avaliação diagnóstica é fortemente recomendado'
  }
  return ''
})

const recomendacoes = computed(() => {
  // BAIXO após Follow-Up: rastreio negativo — conduta diferente do baixo risco direto
  if (riscoFinal.value === 'BAIXO' && fezFollowUp.value) {
    return [
      'A Consulta de Seguimento esclareceu os itens de risco iniciais — rastreio negativo confirmado.',
      'Continuar o monitoramento do desenvolvimento infantil nas consultas de rotina.',
      'Reaplicar o M-CHAT-R em consultas futuras conforme protocolo pediátrico.',
      'Manter atenção a marcos do desenvolvimento e procurar orientação se surgirem novas preocupações.'
    ]
  }

  switch (riscoFinal.value) {
    case 'BAIXO':
      return [
        'Continuar o monitoramento do desenvolvimento infantil nas consultas de rotina.',
        'Reaplicar o M-CHAT-R em consultas futuras conforme protocolo pediátrico.',
        'Estimular o desenvolvimento social, comunicativo e cognitivo através de brincadeiras.',
        'Manter atenção a marcos do desenvolvimento e procurar orientação se surgirem novas preocupações.'
      ]
    case 'MEDIO':
      return [
        'Agendar reavaliação em 3-6 meses para monitoramento do desenvolvimento.',
        'Observar atentamente os comportamentos que indicaram risco no rastreio.',
        'Considerar avaliação por profissionais especializados (psicólogo, fonoaudiólogo) se preocupações persistirem.',
        'Manter registro de comportamentos e marcos do desenvolvimento.',
        'Estimular interação social, comunicação e imitação através de atividades lúdicas.'
      ]
    case 'ALTO':
      return [
        'Encaminhar IMEDIATAMENTE para avaliação diagnóstica multidisciplinar.',
        'Procurar profissionais especializados: neuropediatra, psicólogo e fonoaudiólogo.',
        'Iniciar intervenção precoce o mais rápido possível — quanto antes, melhores os resultados.',
        'Não aguardar para "ver se melhora" — intervenção precoce é crucial no TEA.',
        'Buscar serviços de avaliação e intervenção especializados em autismo.',
        'Considerar terapias baseadas em evidência (ABA, DENVER, TEACCH).',
        'Documentar todos os comportamentos observados para auxiliar na avaliação diagnóstica.'
      ]
    default:
      return []
  }
})

const posicaoIndicador = computed(() => {
  const pontos = pontuacaoFinal.value
  if (pontos <= 2) {
    return (pontos / 2) * 20
  } else if (pontos <= 7) {
    return 20 + ((pontos - 2) / 5) * 40
  } else {
    return 60 + ((pontos - 7) / 13) * 40
  }
})

// Posição na barra binária do Follow-Up (0-1 item = 0-10%, ≥2 itens = 10-100%)
const posicaoIndicadorFollowUp = computed(() => {
  const pontos = pontuacaoFollowUp.value
  if (pontos === 0) return 2
  if (pontos === 1) return 8
  // A partir de 2, distribui no lado direito (10% a 95%)
  return Math.min(10 + ((pontos - 2) / 18) * 85, 95)
})

// Métodos
const formatarData = (data) => {
  if (!data) return ''
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

const baixarPDF = async () => {
  gerandoPDF.value = true
  
  try {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true
    })
    
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 18
    let yPos = margin

    const azulSobrio = { r: 71, g: 85, b: 105 }
    const cinzaEscuro = { r: 31, g: 41, b: 55 }
    const cinzaClaro = { r: 156, g: 163, b: 175 }

    // Cabeçalho
    doc.setFillColor(248, 250, 252)
    doc.rect(0, 0, pageWidth, 35, 'F')
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.5)
    doc.line(0, 35, pageWidth, 35)

    doc.setTextColor(cinzaEscuro.r, cinzaEscuro.g, cinzaEscuro.b)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('Relatório M-CHAT-R/F', pageWidth / 2, 16, { align: 'center' })
    
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(cinzaClaro.r, cinzaClaro.g, cinzaClaro.b)
    doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}`, pageWidth / 2, 26, { align: 'center' })

    yPos = 48

    // Dados do paciente
    doc.setTextColor(cinzaEscuro.r, cinzaEscuro.g, cinzaEscuro.b)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('DADOS DO PACIENTE', margin, yPos)
    
    yPos += 7
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    
    const infoPaciente = [
      ['Nome da Criança:', dadosPaciente.value.nomeCrianca],
      ['Data de Nascimento:', formatarData(dadosPaciente.value.dataNascimento)],
      ['Nome da Mãe/Acompanhante:', dadosPaciente.value.nomeResponsavel],
      ['Data da Avaliação:', formatarData(dadosPaciente.value.dataAvaliacao)],
      ['E-mail do Profissional:', dadosPaciente.value.emailProfissional]
    ]
    
    infoPaciente.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold')
      doc.text(label, margin, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(value || 'N/A', margin + 60, yPos)
      yPos += 5.5
    })

    yPos += 8

    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    // Resultado da rastreio
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(azulSobrio.r, azulSobrio.g, azulSobrio.b)
    doc.text('Resultado da Rastreio Inicial (M-CHAT-R)', margin, yPos)
    yPos += 8

    doc.setTextColor(cinzaEscuro.r, cinzaEscuro.g, cinzaEscuro.b)
    doc.setFontSize(9)
    
    doc.setFont('helvetica', 'bold')
    doc.text('Pontuação Total:', margin, yPos)
    doc.setFont('helvetica', 'normal')
    doc.text(`${pontuacaoInicial.value} de 20`, margin + 38, yPos)
    yPos += 5.5

    doc.setFont('helvetica', 'bold')
    doc.text('Classificação:', margin, yPos)
    doc.setFont('helvetica', 'normal')
    doc.text(tituloRisco.value, margin + 38, yPos)
    yPos += 8

    doc.setFont('helvetica', 'bold')
    doc.text('Recomendação:', margin, yPos)
    yPos += 5.5
    doc.setFont('helvetica', 'normal')
    
    let recomendacaoTexto = ''
    if (riscoFinal.value === 'BAIXO' && !fezFollowUp.value) {
      recomendacaoTexto = 'Rastreio negativo. Não é necessário aplicar a Consulta de Seguimento. Continue o monitoramento do desenvolvimento infantil nas consultas de rotina.'
    } else if (riscoFinal.value === 'MEDIO') {
      recomendacaoTexto = 'Risco moderado identificado. Foi aplicada a Consulta de Seguimento (Follow-Up) — veja resultado abaixo.'
    } else if (riscoFinal.value === 'ALTO' && !fezFollowUp.value) {
      recomendacaoTexto = 'Rastreio positivo (alto risco). A Consulta de Seguimento não é necessária. Recomenda-se encaminhamento imediato para avaliação diagnóstica completa e início de intervenção precoce.'
    }
    
    const recomendacaoLines = doc.splitTextToSize(recomendacaoTexto, pageWidth - 2 * margin)
    doc.text(recomendacaoLines, margin, yPos)
    yPos += recomendacaoLines.length * 5 + 7

    if (itensFalhados.value.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.text('Itens que indicaram risco:', margin, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(itensFalhados.value.join(', '), margin + 50, yPos)
      yPos += 8
    }

    if (fezFollowUp.value) {
      doc.setDrawColor(226, 232, 240)
      doc.line(margin, yPos, pageWidth - margin, yPos)
      yPos += 8
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(azulSobrio.r, azulSobrio.g, azulSobrio.b)
      doc.text('Resultado da Consulta de Seguimento (Follow-Up)', margin, yPos)
      yPos += 8

      doc.setTextColor(cinzaEscuro.r, cinzaEscuro.g, cinzaEscuro.b)
      doc.setFontSize(9)
      
      doc.setFont('helvetica', 'bold')
      doc.text('Itens com risco mantido após Follow-Up:', margin, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(`${pontuacaoFollowUp.value} de ${itensFalhados.value.length}`, margin + 70, yPos)
      yPos += 5.5

      doc.setFont('helvetica', 'bold')
      doc.text('Threshold de encaminhamento:', margin, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text('≥ 2 itens = rastreio positivo (encaminhar)', margin + 60, yPos)
      yPos += 5.5

      doc.setFont('helvetica', 'bold')
      doc.text('Resultado Final:', margin, yPos)
      doc.setFont('helvetica', 'normal')
      const resultadoFinalTexto = riscoFinal.value === 'ALTO'
        ? 'Rastreio POSITIVO — encaminhar para avaliação diagnóstica'
        : 'Rastreio NEGATIVO — monitoramento de rotina'
      doc.text(resultadoFinalTexto, margin + 36, yPos)
      yPos += 10
    }

    doc.setDrawColor(226, 232, 240)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    // Respostas
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(azulSobrio.r, azulSobrio.g, azulSobrio.b)
    doc.text('Respostas da Rastreio Inicial (M-CHAT-R)', margin, yPos)
    yPos += 8

    doc.setTextColor(cinzaEscuro.r, cinzaEscuro.g, cinzaEscuro.b)
    doc.setFontSize(8.5)

    const respostasSalvas = JSON.parse(localStorage.getItem('respostasMCHAT') || '[]')

    perguntasMCHAT.forEach((pergunta, index) => {
      const numPergunta = index + 1
      const resposta = respostasSalvas[index]
      const isFalhado = itensFalhados.value.includes(numPergunta)

      if (yPos > pageHeight - 30) {
        doc.addPage()
        yPos = margin
      }

      if (isFalhado) {
        doc.setFillColor(249, 250, 251)
        const perguntaText = `${numPergunta}. ${pergunta.texto}`
        const perguntaLines = doc.splitTextToSize(perguntaText, pageWidth - 2 * margin - 6)
        const exemploLines = pergunta.exemplo
          ? doc.splitTextToSize(`Exemplo: ${pergunta.exemplo}`, pageWidth - 2 * margin - 6)
          : []
        const totalLines = perguntaLines.length + exemploLines.length
        doc.rect(margin - 2, yPos - 3, pageWidth - 2 * margin + 4, totalLines * 4 + 12, 'F')
      }

      // Texto da pergunta
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      doc.setTextColor(cinzaEscuro.r, cinzaEscuro.g, cinzaEscuro.b)
      const perguntaText = `${numPergunta}. ${pergunta.texto}`
      const perguntaLines = doc.splitTextToSize(perguntaText, pageWidth - 2 * margin - 6)
      doc.text(perguntaLines, margin, yPos)
      yPos += perguntaLines.length * 4 + 2

      // Exemplo (se existir)
      if (pergunta.exemplo) {
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(7.5)
        doc.setTextColor(azulSobrio.r, azulSobrio.g, azulSobrio.b)
        const exemploLines = doc.splitTextToSize(`Exemplo: ${pergunta.exemplo}`, pageWidth - 2 * margin - 6)
        doc.text(exemploLines, margin, yPos)
        doc.setTextColor(cinzaEscuro.r, cinzaEscuro.g, cinzaEscuro.b)
        doc.setFontSize(8.5)
        yPos += exemploLines.length * 3.5 + 2
      }

      // Resposta
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      doc.text('Resposta: ', margin, yPos)
      doc.setFont('helvetica', 'normal')
      let respostaFormatada = 'Não respondida'
      if (resposta) {
        respostaFormatada = resposta === 'sim' ? 'Sim' : (resposta === 'nao' || resposta === 'não') ? 'Não' : resposta
      }
      doc.text(respostaFormatada, margin + 18, yPos)

      yPos += 8
    })

    yPos += 5

    // Nota final
    if (yPos > pageHeight - 30) {
      doc.addPage()
      yPos = margin
    }

    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 18, 1, 1, 'F')
    
    yPos += 5
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(azulSobrio.r, azulSobrio.g, azulSobrio.b)
    doc.text('Informação Importante:', margin + 3, yPos)
    
    yPos += 5
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(cinzaEscuro.r, cinzaEscuro.g, cinzaEscuro.b)
    const nota = 'O M-CHAT-R/F é um instrumento de rastreio, não um diagnóstico. Um resultado de risco não confirma autismo, mas indica necessidade de avaliação mais aprofundada por profissionais especializados.'
    const notaLines = doc.splitTextToSize(nota, pageWidth - 2 * margin - 6)
    doc.text(notaLines, margin + 3, yPos)

    // Rodapé
    const totalPages = doc.internal.pages.length - 1
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setDrawColor(226, 232, 240)
      doc.setLineWidth(0.3)
      doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15)
      doc.setFontSize(7.5)
      doc.setTextColor(cinzaClaro.r, cinzaClaro.g, cinzaClaro.b)
      doc.setFont('helvetica', 'normal')
      doc.text('M-CHAT-R/F - Modified Checklist for Autism in Toddlers, Revised with Follow-Up', pageWidth / 2, pageHeight - 10, { align: 'center' })
      doc.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 6, { align: 'center' })
    }

    const nomeArquivo = `M-CHAT_${dadosPaciente.value.nomeCrianca?.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(nomeArquivo)
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    alert(`Erro ao gerar PDF: ${error.message}`)
  } finally {
    gerandoPDF.value = false
  }
}

const novaAvaliacao = () => {
  if (confirm('Deseja iniciar uma nova avaliação? Os dados atuais serão limpos.')) {
    localStorage.clear()
    router.push({ name: 'DadosPessoais' })
  }
}

onMounted(() => {
  const dadosSalvos = localStorage.getItem('dadosPessoais')
  if (dadosSalvos) {
    dadosPaciente.value = JSON.parse(dadosSalvos)
  }
  
  const rastreioSalvo = localStorage.getItem('resultadoRastreio')
  if (rastreioSalvo) {
    const rastreio = JSON.parse(rastreioSalvo)
    pontuacaoInicial.value = rastreio.pontos
    itensFalhados.value = rastreio.itensFalhados
  }
  
  const followUpSalvo = localStorage.getItem('resultadoFollowUp')
  if (followUpSalvo) {
    const followUp = JSON.parse(followUpSalvo)
    fezFollowUp.value = true
    pontuacaoFollowUp.value = followUp.pontuacaoFinal
    pontuacaoFinal.value = followUp.pontuacaoFinal
    riscoFinal.value = followUp.riscoFinal
  } else if (rastreioSalvo) {
    const rastreio = JSON.parse(rastreioSalvo)
    pontuacaoFinal.value = rastreio.pontos
    riscoFinal.value = rastreio.risco
  }
  
  if (!dadosSalvos || !rastreioSalvo) {
    router.push({ name: 'DadosPessoais' })
  }
})
</script>

<style scoped>
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}
</style>