// Regras de pontuação do M-CHAT-R
export function useMCHAT() {
  
  // Lista de perguntas do M-CHAT-R
  const perguntasMCHAT = [
    { id: 1, texto: 'Se você apontar para algum objeto no quarto, o seu filho olha para este objeto?', exemplo: 'Se você apontar para um brinquedo, animal ou avião, seu filho olha para o objeto apontado?' },
    { id: 2, texto: 'Alguma vez você se perguntou se o seu filho pode ser surdo?', exemplo: 'Seu filho parece não ouvir quando é chamado, ou não reage a sons que outras crianças costumam perceber?' },
    { id: 3, texto: 'O seu filho brinca de faz de contas?', exemplo: 'Faz de conta que bebe em um copo vazio, fala ao telefone, dá comida para bonecas ou bichinhos?' },
    { id: 4, texto: 'O seu filho gosta de subir nas coisas?', exemplo: 'Subir em móveis, sofá, brinquedos do parquinho ou escadas?' },
    { id: 5, texto: 'O seu filho faz movimentos estranhos com os dedos perto dos olhos?', exemplo: 'Mexe os dedos em frente aos olhos, olha fixamente para as mãos ou para movimentos repetitivos?' },
    { id: 6, texto: 'O seu filho aponta com o dedo para pedir algo ou conseguir ajuda?', exemplo: 'Aponta para um brinquedo, água ou comida fora do alcance?' },
    { id: 7, texto: 'O seu filho aponta com o dedo para mostrar algo interessante para você?', exemplo: 'Aponta para um avião, cachorro, caminhão ou algo que chamou sua atenção?' },
    { id: 8, texto: 'O seu filho se interessa por outras crianças?', exemplo: 'Olha para outras crianças, sorri, tenta brincar ou se aproxima delas?' },
    { id: 9, texto: 'O seu filho traz coisas para mostrar para você ou segura objetos para que você veja, apenas para compartilhar?', exemplo: 'Mostrar uma flor, brinquedo, desenho ou bichinho de pelúcia?' },
    { id: 10, texto: 'O seu filho responde quando você o chama pelo nome?', exemplo: 'Olha para você, responde com sons, fala ou interrompe o que está fazendo?' },
    { id: 11, texto: 'Quando você sorri para o seu filho, ele sorri de volta?', exemplo: 'Responde ao sorriso com outro sorriso ou demonstra alegria ao interagir?' },
    { id: 12, texto: 'O seu filho fica muito incomodado com barulhos do dia a dia?', exemplo: 'Chora, tapa os ouvidos ou se irrita com liquidificador, secador, música alta ou aspirador?' },
    { id: 13, texto: 'O seu filho anda?', exemplo: 'Anda sozinho pela casa, mesmo que ainda apresente certa instabilidade?' },
    { id: 14, texto: 'O seu filho olha nos seus olhos quando você fala, brinca ou veste a roupa dele?', exemplo: 'Faz contato visual durante brincadeiras, conversa ou cuidados diários?' },
    { id: 15, texto: 'O seu filho tenta imitar o que você faz?', exemplo: 'Bater palmas, dar tchau, mandar beijo ou copiar gestos simples?' },
    { id: 16, texto: 'Quando você vira a cabeça para olhar para alguma coisa, o seu filho olha ao redor para ver o que você está olhando?', exemplo: 'Acompanha seu olhar para um objeto, pessoa ou barulho?' },
    { id: 17, texto: 'O seu filho tenta fazer você olhar para ele?', exemplo: 'Chama "olha!", mostra algo que fez ou procura aprovação/elogio?' },
    { id: 18, texto: 'A sua filha compreende quando você pede para ela fazer alguma coisa?', exemplo: '"Pegue o brinquedo", "coloque o copo na mesa" ou "feche a porta", mesmo sem apontar?' },
    { id: 19, texto: 'Quando acontece algo novo, a sua filha olha para o seu rosto para ver como você reage?', exemplo: 'Diante de um barulho estranho, brinquedo novo ou situação inesperada, ela observa sua expressão?' },
    { id: 20, texto: 'A sua filha gosta de atividades de movimento?', exemplo: 'Brincar de balançar, girar, pular no colo ou brincar em parquinho?' }
  ]
  
  // Perguntas que têm pontuação INVERTIDA (SIM = risco)
  const perguntasInvertidas = [2, 5, 12]
  
  // Exemplos para o Follow-Up de cada item
  const exemplosFollowUp = {
    1: {
      titulo: 'Se você apontar para algum objeto no quarto, o seu filho olha para este objeto?',
      instrucao: 'Pergunte se a criança segue o apontar do responsável para ver objetos no ambiente.',
      passou: [
        'Olha imediatamente quando apontam para algo',
        'Segue a direção do dedo e olha para o objeto',
        'Alterna o olhar entre o adulto e o objeto'
      ],
      falhou: [
        'Não olha quando apontam',
        'Olha para o dedo mas não para o objeto',
        'Não demonstra interesse no que está sendo apontado'
      ]
    },
    2: {
      titulo: 'Alguma vez você se perguntou se o seu filho pode ser surdo?',
      instrucao: 'Explore se há preocupações sobre a audição da criança.',
      passou: [
        'Responde consistentemente a sons',
        'Vira-se quando chamado pelo nome',
        'Nunca houve preocupações sobre audição'
      ],
      falhou: [
        'Frequentemente não responde quando chamado',
        'Parece não ouvir em algumas situações',
        'Há dúvidas recorrentes sobre a audição'
      ]
    },
    3: {
      titulo: 'O seu filho brinca de faz de contas?',
      instrucao: 'Poderia me dar um exemplo de como ele brinca de faz de conta?',
      passou: [
        'Finge alimentar uma boneca ou bicho de pelúcia',
        'Faz sons de "vrum vrum" enquanto empurra um carrinho',
        'Usa um objeto como se fosse um telefone para "falar"',
        'Imita ações do cotidiano (cozinhar, limpar, etc.)'
      ],
      falhou: [
        'Apenas manipula os brinquedos sem uso simbólico (empilhar, alinhar, girar rodas)',
        'Explora os brinquedos principalmente com a boca ou batendo',
        'Não demonstra interesse em brincadeiras de imitar ações do cotidiano',
        'Usa brinquedos de forma repetitiva e não funcional'
      ]
    },
    4: {
      titulo: 'O seu filho gosta de subir nas coisas?',
      instrucao: 'Pergunte sobre o comportamento motor e interesse em escalar.',
      passou: [
        'Sobe em móveis e estruturas apropriadas',
        'Mostra interesse em explorar altura',
        'Comportamento motor típico para a idade'
      ],
      falhou: [
        'Não demonstra interesse em subir',
        'Evita atividades de escalada',
        'Atraso significativo nas habilidades motoras grossas'
      ]
    },
    5: {
      titulo: 'O seu filho faz movimentos estranhos com os dedos perto dos olhos?',
      instrucao: 'Investigue se há comportamentos repetitivos ou estereotipados visuais.',
      passou: [
        'Não apresenta movimentos repetitivos com as mãos',
        'Não agita os dedos próximo aos olhos',
        'Usa as mãos de forma funcional'
      ],
      falhou: [
        'Frequentemente agita as mãos ou dedos perto dos olhos',
        'Observa os dedos se movendo repetidamente',
        'Apresenta "flapping" ou outros movimentos estereotipados',
        'Parece fascinado por movimento de dedos ou mãos'
      ]
    },
    6: {
      titulo: 'O seu filho aponta com o dedo para pedir algo ou para conseguir ajuda?',
      instrucao: 'Verifique se a criança usa o gesto de apontar para fazer pedidos (apontar protoimperativo).',
      passou: [
        'Aponta para objetos que deseja',
        'Aponta para pedir ajuda (abrir algo, alcançar objeto)',
        'Combina apontar com olhar para o adulto'
      ],
      falhou: [
        'Não aponta para pedir coisas',
        'Pega a mão do adulto e leva até o objeto (uso do adulto como ferramenta)',
        'Grita ou chora sem usar gestos comunicativos'
      ]
    },
    7: {
      titulo: 'O seu filho aponta com o dedo para mostrar algo interessante para você?',
      instrucao: 'Investigue se a criança compartilha interesse apontando (apontar protodeclarativo).',
      passou: [
        'Aponta para mostrar aviões, carros, animais',
        'Olha para o adulto para verificar se está vendo também',
        'Aponta para compartilhar interesse, não para pedir',
        'Chama atenção para coisas que acha legal'
      ],
      falhou: [
        'Só aponta quando quer algo (não para compartilhar)',
        'Nunca aponta para mostrar coisas interessantes',
        'Não busca compartilhar experiências ou interesses',
        'Não verifica se o adulto está prestando atenção'
      ]
    },
    8: {
      titulo: 'O seu filho se interessa por outras crianças?',
      instrucao: 'Explore o interesse social da criança por pares.',
      passou: [
        'Observa e se aproxima de outras crianças',
        'Demonstra alegria na presença de pares',
        'Tenta interagir ou brincar junto',
        'Imita outras crianças'
      ],
      falhou: [
        'Ignora outras crianças',
        'Prefere sempre brincar sozinho',
        'Não demonstra interesse quando outras crianças se aproximam',
        'Trata crianças como se fossem objetos ou obstáculos'
      ]
    },
    9: {
      titulo: 'O seu filho traz coisas para mostrar para você?',
      instrucao: 'Verifique se a criança compartilha objetos ou conquistas.',
      passou: [
        'Traz brinquedos ou objetos para mostrar',
        'Compartilha descobertas interessantes',
        'Busca aprovação ou atenção mostrando coisas',
        'Fica feliz quando o adulto demonstra interesse'
      ],
      falhou: [
        'Não traz objetos para compartilhar',
        'Não busca atenção ou aprovação do adulto',
        'Brinca com objetos sem envolver outros',
        'Não demonstra prazer em compartilhar experiências'
      ]
    },
    10: {
      titulo: 'O seu filho responde quando você o chama pelo nome?',
      instrucao: 'Avalie a resposta ao nome (marco importante de desenvolvimento).',
      passou: [
        'Olha imediatamente quando chamado pelo nome',
        'Responde consistentemente (8-10 de 10 vezes)',
        'Reconhece seu nome em ambientes variados'
      ],
      falhou: [
        'Raramente olha quando chamado',
        'Precisa de chamadas múltiplas ou muito altas',
        'Parece não reconhecer o próprio nome',
        'Responde menos de 50% das vezes'
      ]
    },
    11: {
      titulo: 'Quando você sorri para o seu filho, ele sorri de volta para você?',
      instrucao: 'Investigue a reciprocidade social e sorriso social.',
      passou: [
        'Sorri de volta quando o adulto sorri',
        'Demonstra prazer na interação social',
        'Responde a expressões faciais',
        'Sorriso aparece naturalmente em trocas sociais'
      ],
      falhou: [
        'Não retribui sorrisos sociais',
        'Expressão facial pouco responsiva',
        'Não demonstra prazer em trocas sociais face-a-face',
        'Sorriso raro ou apenas em situações físicas (cócegas)'
      ]
    },
    12: {
      titulo: 'O seu filho fica muito incomodado com barulhos do dia a dia?',
      instrucao: 'Explore sensibilidade sensorial auditiva.',
      passou: [
        'Tolera sons cotidianos normalmente',
        'Não demonstra desconforto excessivo com barulhos',
        'Reage apropriadamente a sons altos (pode se assustar mas se recupera)'
      ],
      falhou: [
        'Cobre os ouvidos com frequência',
        'Chora ou tem colapsos com sons do dia a dia (liquidificador, aspirador)',
        'Evita ambientes barulhentos',
        'Demonstra estresse significativo com sons que não incomodam outros'
      ]
    },
    13: {
      titulo: 'O seu filho anda?',
      instrucao: 'Verifique o desenvolvimento motor (criança deve ter pelo menos 16 meses).',
      passou: [
        'Anda de forma independente',
        'Desenvolvimento motor dentro do esperado',
        'Começou a andar entre 9-18 meses'
      ],
      falhou: [
        'Não anda de forma independente após 18 meses',
        'Atraso motor significativo',
        'Necessita de suporte para locomoção'
      ]
    },
    14: {
      titulo: 'O seu filho olha nos seus olhos quando você está falando ou brincando com ele?',
      instrucao: 'Avalie contato visual durante interações sociais.',
      passou: [
        'Mantém contato visual apropriado',
        'Olha nos olhos durante conversas e brincadeiras',
        'Usa olhar para se comunicar',
        'Contato visual natural e recíproco'
      ],
      falhou: [
        'Evita contato visual',
        'Olhar fugidio ou muito breve',
        'Não usa olhar para comunicação',
        'Contato visual raro mesmo quando chamado'
      ]
    },
    15: {
      titulo: 'O seu filho tenta imitar o que você faz?',
      instrucao: 'Investigue imitação motora e social.',
      passou: [
        'Imita ações simples (bater palmas, acenar)',
        'Tenta copiar atividades do adulto',
        'Imita sons e palavras',
        'Aprende por imitação'
      ],
      falhou: [
        'Não imita gestos ou ações',
        'Não tenta copiar comportamentos do adulto',
        'Ausência de imitação espontânea',
        'Dificuldade em aprender através da imitação'
      ]
    },
    16: {
      titulo: 'Quando você vira a cabeça para olhar para alguma coisa, o seu filho olha também?',
      instrucao: 'Avalie atenção compartilhada (seguir o olhar).',
      passou: [
        'Segue o olhar do adulto',
        'Olha para onde o adulto está olhando',
        'Demonstra curiosidade sobre o foco de atenção do outro',
        'Comportamento de atenção compartilhada presente'
      ],
      falhou: [
        'Não segue o olhar do adulto',
        'Não demonstra curiosidade sobre o que o outro está vendo',
        'Não participa de atenção compartilhada',
        'Permanece focado em seus próprios interesses'
      ]
    },
    17: {
      titulo: 'O seu filho tenta fazer você olhar para ele?',
      instrucao: 'Verifique se a criança busca atenção social.',
      passou: [
        'Busca atenção fazendo gracinhas ou sons',
        'Verifica se o adulto está olhando',
        'Tenta impressionar ou divertir o adulto',
        'Chama atenção para si de forma apropriada'
      ],
      falhou: [
        'Não busca atenção social',
        'Não verifica se está sendo observado',
        'Não tenta impressionar ou engajar o adulto',
        'Parece indiferente à atenção dos outros'
      ]
    },
    18: {
      titulo: 'O seu filho compreende quando você pede para ele fazer alguma coisa?',
      instrucao: 'Avalie compreensão de linguagem e comandos simples.',
      passou: [
        'Entende e segue comandos simples',
        'Responde apropriadamente a pedidos',
        'Compreensão de linguagem adequada para a idade',
        'Segue instruções de um passo'
      ],
      falhou: [
        'Não responde a comandos simples',
        'Parece não entender linguagem',
        'Não segue instruções básicas',
        'Compreensão muito limitada'
      ]
    },
    19: {
      titulo: 'Quando acontece algo novo, o seu filho olha para o seu rosto para ver como você se sente?',
      instrucao: 'Investigue referenciação social.',
      passou: [
        'Olha para o adulto em situações novas',
        'Busca pistas emocionais no rosto do adulto',
        'Usa expressões do adulto para guiar comportamento',
        'Demonstra referenciação social'
      ],
      falhou: [
        'Não olha para o adulto em situações novas',
        'Não busca orientação emocional',
        'Não usa pistas sociais para guiar comportamento',
        'Ausência de referenciação social'
      ]
    },
    20: {
      titulo: 'O seu filho gosta de atividades de movimento?',
      instrucao: 'Pergunte sobre interesse em atividades motoras e sensoriais.',
      passou: [
        'Gosta de balanços, pulos, corridas',
        'Busca e aprecia movimento',
        'Participa de brincadeiras ativas',
        'Interesse típico em movimento'
      ],
      falhou: [
        'Evita atividades de movimento',
        'Desconforto ou medo excessivo de movimento',
        'Não busca ou não gosta de balanços, escorregadores',
        'Preferência extrema por atividades estáticas'
      ]
    }
  }
  
  // Calcular pontuação do M-CHAT-R
  const calcularPontuacao = (respostas) => {
    let pontos = 0
    const itensFalhados = []
    
    respostas.forEach((resposta, index) => {
      const numeroPergunta = index + 1
      let falhou = false
      
      // Verifica se é pergunta invertida (SIM = risco)
      if (perguntasInvertidas.includes(numeroPergunta)) {
        if (resposta === 'sim') {
          falhou = true
        }
      } else {
        // Perguntas normais (NÃO = risco)
        if (resposta === 'nao') {
          falhou = true
        }
      }
      
      if (falhou) {
        pontos++
        itensFalhados.push(numeroPergunta)
      }
    })
    
    return {
      pontos,
      itensFalhados
    }
  }
  
  // Classificar risco — todas as perguntas têm peso igual
  const classificarRisco = (pontos) => {
    if (pontos <= 2) {
      return 'BAIXO'
    } else if (pontos <= 7) {
      return 'MEDIO'
    } else {
      return 'ALTO'
    }
  }
  
  // Classificar risco após Follow-Up — regra oficial M-CHAT-R/F:
  // ≥ 2 itens ainda com risco = rastreio positivo → encaminhar (ALTO)
  // 0 ou 1 item com risco    = rastreio negativo → baixo risco  (BAIXO)
  const classificarRiscoFollowUp = (pontos) => {
    return pontos >= 2 ? 'ALTO' : 'BAIXO'
  }

  // Recalcular após Follow-Up
  const recalcularAposFollowUp = (resultadosFollowUp) => {
    let pontos = 0
    
    Object.values(resultadosFollowUp).forEach((resultado) => {
      if (resultado === 'falhou') {
        pontos++
      }
    })
    
    return {
      pontos,
      risco: classificarRiscoFollowUp(pontos)
    }
  }
  
  return {
    perguntasMCHAT,
    perguntasInvertidas,
    exemplosFollowUp,
    calcularPontuacao,
    classificarRisco,
    classificarRiscoFollowUp,
    recalcularAposFollowUp
  }
}