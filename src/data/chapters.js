const createBuildExercise = (id, instruction, selector, slots, pieces, answer, preview, successMessage) => ({
  id,
  type: 'drag-drop-build',
  instruction,
  selector,
  slots,
  pieces,
  answer,
  preview,
  successMessage,
});

const createPredictExercise = (id, instruction, code, options, correctOptionId, successMessage) => ({
  id,
  type: 'predict',
  instruction,
  code,
  options,
  correctOptionId,
  successMessage,
});

const createMatchExercise = (id, instruction, pairs, successMessage) => ({
  id,
  type: 'match',
  instruction,
  pairs,
  successMessage,
});

const createFillExercise = (id, instruction, codeLines, pieces, answers, successMessage) => ({
  id,
  type: 'fill-blank',
  instruction,
  codeLines,
  pieces,
  answers,
  successMessage,
});

const createIdentifyExercise = (id, instruction, prompt, diagram, correctAreaId, successMessage) => ({
  id,
  type: 'identify',
  instruction,
  prompt,
  diagram,
  correctAreaId,
  successMessage,
});

const createMatchPreviewExercise = (id, instruction, targetCss, livePanel, expectedValues, successMessage) => ({
  id,
  type: 'match-preview',
  instruction,
  targetCss,
  livePanel,
  expectedValues,
  successMessage,
});

const chapters = [
  {
    id: 1,
    slug: 'o-que-e-css',
    title: 'O que e CSS',
    emoji: '🎨',
    color: '#7C3AED',
    forInterpreter:
      'CSS e a linguagem que cuida da aparencia da pagina. Se o HTML monta as pecas, o CSS decide cor, tamanho, espaco e posicao. Vale reforcar a comparacao com uma casa: HTML e a estrutura; CSS e pintura, decoracao e arrumacao. Neste primeiro contato, o importante nao e decorar nomes, mas perceber que pequenas regras mudam o visual imediatamente.',
    forElisa: {
      headline: 'CSS deixa a pagina bonita!',
      description: 'HTML cria as pecas. CSS pinta e organiza tudo.',
      metaphor: 'Uma pagina simples vira uma pagina colorida e organizada.',
    },
    concepts: [
      {
        id: 'c1-concept-1',
        title: 'HTML e CSS trabalham juntos',
        forInterpreter:
          'Mostre o antes e depois. Primeiro a pagina aparece crua, com pouco estilo. Depois o CSS entra em acao e muda cor, tamanho e espaco. O objetivo e Elisa perceber visualmente que o CSS nao cria o conteudo, mas muda como ele aparece.',
        codeExample:
          'h1 {\n  color: #7c3aed;\n}\n\np {\n  font-size: 20px;\n  color: #475569;\n}',
        livePanel: {
          baseHtml:
            '<div class="card"><h1>Meu titulo</h1><p>Meu paragrafo de exemplo.</p><img src="https://placehold.co/220x120/e9d5ff/4c1d95?text=Imagem" alt="Imagem de exemplo" /></div>',
          initialCss:
            '.card { padding: 16px; }\nh1 { margin: 0 0 8px; }\np { margin: 0 0 12px; }\nimg { border-radius: 16px; }',
          editableProperties: ['free-css'],
          controls: [{ type: 'editor', label: 'Escreva CSS e veja mudar' }],
        },
      },
      {
        id: 'c1-concept-2',
        title: 'Como escrever uma regra CSS',
        forInterpreter:
          'Explique a anatomia de uma declaracao: seletor diz quem vai mudar; propriedade diz o que vai mudar; valor diz como vai ficar. Use a cor das partes para apoiar a traducao em Libras. Vale apontar tambem que inline, internal e external sao tres lugares diferentes para colocar CSS.',
        codeExample:
          'h1 {\n  color: #db2777;\n  font-size: 32px;\n}\n\n/* Inline: style="" */\n/* Internal: <style> */\n/* External: style.css */',
        livePanel: {
          baseHtml: '<h1>Titulo vivo</h1><p>Veja a regra em acao.</p>',
          initialCss: 'h1 { color: #111827; font-size: 32px; }\np { color: #475569; }',
          editableProperties: ['h1.color', 'h1.font-size'],
          controls: [
            {
              type: 'color',
              selector: 'h1',
              property: 'color',
              label: 'Cor do titulo',
              defaultValue: '#111827',
            },
            {
              type: 'slider',
              selector: 'h1',
              property: 'font-size',
              label: 'Tamanho do titulo',
              min: 18,
              max: 64,
              step: 1,
              unit: 'px',
              defaultValue: 32,
            },
          ],
        },
      },
    ],
    exercises: [
      createPredictExercise(
        'css-ex-1-1',
        'Qual preview mostra um titulo roxo e maior?',
        'h1 {\n  color: #7C3AED;\n  font-size: 36px;\n}',
        [
          { id: 'a', label: 'Preview A', html: '<h1 style="color:#0f172a;font-size:24px;">Meu titulo</h1>' },
          { id: 'b', label: 'Preview B', html: '<h1 style="color:#7C3AED;font-size:36px;">Meu titulo</h1>' },
          { id: 'c', label: 'Preview C', html: '<h1 style="color:#db2777;font-size:20px;">Meu titulo</h1>' },
        ],
        'b',
        'Muito bem! Voce ligou o codigo ao visual certo.',
      ),
      createFillExercise(
        'css-ex-1-2',
        'Complete a regra CSS.',
        [
          'h1 {',
          '  [blank-1]: #7C3AED;',
          '  [blank-2]: 32px;',
          '}',
        ],
        ['color', 'font-size', 'margin', 'padding'],
        { 'blank-1': 'color', 'blank-2': 'font-size' },
        'Boa! Agora a regra ficou completa.',
      ),
    ],
  },
  {
    id: 2,
    slug: 'seletores',
    title: 'O que sao Seletores',
    emoji: '👆',
    color: '#8B5CF6',
    forInterpreter:
      'Seletor e a maneira de dizer ao CSS qual elemento vai receber o estilo. Comece com a ideia de apontar com o dedo: aqui, esse paragrafo. Depois mostre que tambem e possivel apontar para todos os elementos de um tipo, para tudo ao mesmo tempo ou para varios elementos juntos. Na pequena introducao de cascata, destaque visualmente que a regra mais especifica vence.',
    forElisa: {
      headline: 'Seletores escolhem quem muda',
      description: 'O CSS aponta para um elemento e faz a mudanca.',
      metaphor: 'Uma seta aponta para o elemento escolhido e ele acende.',
    },
    concepts: [
      {
        id: 'c2-concept-1',
        title: 'Selecionar por tag',
        forInterpreter:
          'Mostre que p escolhe todos os paragrafos, h1 escolhe todos os titulos h1, e assim por diante. A grande sacada visual e ver varios elementos iguais mudando ao mesmo tempo.',
        codeExample: 'p {\n  color: #2563eb;\n}',
        livePanel: {
          baseHtml: '<h1>Titulo</h1><h2>Subtitulo</h2><p>Paragrafo 1</p><p>Paragrafo 2</p>',
          initialCss:
            'h1 { color: #1f2937; }\nh2 { color: #475569; }\np { color: #334155; padding: 6px 10px; border-radius: 12px; }',
          editableProperties: ['p.color', 'h1.color'],
          controls: [
            { type: 'color', selector: 'p', property: 'color', label: 'Cor dos paragrafos', defaultValue: '#334155' },
            { type: 'color', selector: 'h1', property: 'color', label: 'Cor do titulo', defaultValue: '#1f2937' },
          ],
        },
      },
      {
        id: 'c2-concept-2',
        title: 'Universal, multiplos e cascata',
        forInterpreter:
          'Mostre que o seletor universal escolhe tudo. Depois junte h1, h2 e p na mesma regra para reforcar que a virgula significa “e tambem”. Por fim, sobreponha duas regras no mesmo elemento para mostrar que a mais especifica vence.',
        codeExample:
          '* {\n  font-family: Arial, sans-serif;\n}\n\nh1, h2, p {\n  color: #7c3aed;\n}\n\np {\n  color: #db2777;\n}',
        livePanel: {
          baseHtml: '<h1>Titulo</h1><h2>Subtitulo</h2><p>Paragrafo especial</p>',
          initialCss:
            '* { font-family: Arial, sans-serif; }\nh1, h2, p { color: #7C3AED; }\np { color: #DB2777; }',
          editableProperties: ['group.color', 'p.color'],
          controls: [
            { type: 'color', selector: 'h1, h2, p', property: 'color', label: 'Cor do grupo', defaultValue: '#7C3AED' },
            { type: 'color', selector: 'p', property: 'color', label: 'Cor mais especifica do p', defaultValue: '#DB2777' },
          ],
        },
      },
    ],
    exercises: [
      createMatchExercise(
        'css-ex-2-1',
        'Ligue o seletor ao efeito certo.',
        [
          { id: 'tag', label: 'p', preview: 'Muda todos os paragrafos' },
          { id: 'all', label: '*', preview: 'Muda tudo na pagina' },
          { id: 'many', label: 'h1, h2, p', preview: 'Muda varios elementos juntos' },
        ],
        'Perfeito! Cada seletor encontrou seu efeito.',
      ),
      createPredictExercise(
        'css-ex-2-2',
        'Qual preview mostra a cascata certa?',
        'h1, p {\n  color: #7C3AED;\n}\np {\n  color: #DB2777;\n}',
        [
          { id: 'a', label: 'Preview A', html: '<h1 style="color:#7c3aed;">Titulo</h1><p style="color:#db2777;">Paragrafo</p>' },
          { id: 'b', label: 'Preview B', html: '<h1 style="color:#db2777;">Titulo</h1><p style="color:#7c3aed;">Paragrafo</p>' },
          { id: 'c', label: 'Preview C', html: '<h1 style="color:#111827;">Titulo</h1><p style="color:#111827;">Paragrafo</p>' },
        ],
        'a',
        'Boa! O paragrafo ficou com a regra mais especifica.',
      ),
    ],
  },
  {
    id: 3,
    slug: 'id-e-class',
    title: 'ID e Class',
    emoji: '🏷️',
    color: '#6D28D9',
    forInterpreter:
      'ID funciona como documento unico: um elemento so. Class funciona como grupo: varios elementos podem compartilhar. A melhor forma de explicar e mostrar um elemento unico com cracha proprio e varios elementos vestindo a mesma camiseta de time. Tambem vale apresentar classes acumuladas para mostrar combinacao de estilos.',
    forElisa: {
      headline: 'ID e unico. Class junta grupos!',
      description: 'Um ID muda um so. Uma class muda varios.',
      metaphor: 'Cracha unico para ID e camisetas iguais para class.',
    },
    concepts: [
      {
        id: 'c3-concept-1',
        title: 'ID mexe em um elemento so',
        forInterpreter:
          'Apresente o simbolo # no CSS e mostre um titulo com id unico. Ao mudar a cor pelo id, so ele deve responder. Isso ajuda a consolidar a ideia de singularidade.',
        codeExample: '#titulo-principal {\n  color: #DB2777;\n}',
        livePanel: {
          baseHtml: '<h1 id="titulo-principal">Titulo unico</h1><p>Paragrafo comum</p><p>Outro texto</p>',
          initialCss: '#titulo-principal { color: #111827; }\np { color: #475569; }',
          editableProperties: ['#titulo-principal.color'],
          controls: [
            {
              type: 'color',
              selector: '#titulo-principal',
              property: 'color',
              label: 'Cor do ID',
              defaultValue: '#111827',
            },
          ],
        },
      },
      {
        id: 'c3-concept-2',
        title: 'Class muda varios ao mesmo tempo',
        forInterpreter:
          'Mostre varios cards com a mesma class destaque. Ao trocar a cor de fundo, todos mudam juntos. Em seguida, acrescente uma segunda class em um dos elementos para reforcar que as classes podem se somar.',
        codeExample:
          '.destaque {\n  background-color: #fef3c7;\n}\n\n.grande {\n  font-size: 22px;\n}',
        livePanel: {
          baseHtml:
            '<div class="destaque">Card 1</div><div class="destaque grande">Card 2</div><div class="destaque">Card 3</div>',
          initialCss:
            '.destaque { background-color: #F5D0FE; padding: 14px; border-radius: 16px; margin-bottom: 10px; }\n.grande { font-size: 22px; font-weight: 700; }',
          editableProperties: ['.destaque.background-color', '.grande.font-size'],
          controls: [
            {
              type: 'color',
              selector: '.destaque',
              property: 'background-color',
              label: 'Cor da class destaque',
              defaultValue: '#F5D0FE',
            },
            {
              type: 'slider',
              selector: '.grande',
              property: 'font-size',
              label: 'Tamanho da class grande',
              min: 16,
              max: 36,
              step: 1,
              unit: 'px',
              defaultValue: 22,
            },
          ],
        },
      },
    ],
    exercises: [
      createMatchExercise(
        'css-ex-3-1',
        'Ligue o simbolo ao uso certo.',
        [
          { id: 'id', label: '#', preview: 'Escolhe um ID unico' },
          { id: 'class', label: '.', preview: 'Escolhe uma class de grupo' },
          { id: 'many', label: 'class="destaque grande"', preview: 'Acumula mais de uma class' },
        ],
        'Muito bem! Voce distinguiu ID e class.',
      ),
      createMatchPreviewExercise(
        'css-ex-3-2',
        'Ajuste ate o grupo ficar igual ao alvo.',
        '.destaque {\n  background-color: #EDE9FE;\n}\n#titulo-principal {\n  color: #DB2777;\n}',
        {
          baseHtml:
            '<h2 id="titulo-principal">Titulo unico</h2><p class="destaque">Grupo A</p><p class="destaque">Grupo B</p>',
          initialCss:
            '#titulo-principal { color: #111827; }\n.destaque { background-color: #ffffff; padding: 10px; border-radius: 14px; }',
          editableProperties: ['#titulo-principal.color', '.destaque.background-color'],
          controls: [
            { type: 'color', selector: '#titulo-principal', property: 'color', label: 'Cor do ID', defaultValue: '#111827' },
            { type: 'color', selector: '.destaque', property: 'background-color', label: 'Cor da class', defaultValue: '#ffffff' },
          ],
        },
        {
          '#titulo-principal.color': '#DB2777',
          '.destaque.background-color': '#EDE9FE',
        },
        'Boa! O ID e a class ficaram iguais ao alvo.',
      ),
    ],
  },
  {
    id: 4,
    slug: 'cores',
    title: 'Cores',
    emoji: '🌈',
    color: '#DB2777',
    forInterpreter:
      'Aqui o foco principal e experimentacao visual. Mostre que color mexe no texto e background-color no fundo. Depois apresente nomes, hexadecimal, rgb, rgba e opacity como maneiras diferentes de escrever cor e transparencia. Nao e preciso decorar tudo; a grande ideia e perceber que um mesmo efeito pode ser descrito de varias formas.',
    forElisa: {
      headline: 'Escolha qualquer cor!',
      description: 'Texto, fundo e transparencia mudam na hora.',
      metaphor: 'Uma paleta de tinta muda a pagina inteira.',
    },
    concepts: [
      {
        id: 'c4-concept-1',
        title: 'Cor do texto e cor do fundo',
        forInterpreter:
          'Faça Elisa testar o contraste. Ao mudar o texto e o fundo, ela enxerga imediatamente legibilidade, destaque e clima visual. Isso ajuda depois na acessibilidade.',
        codeExample:
          '.caixa {\n  color: #111827;\n  background-color: #FDF2F8;\n}',
        livePanel: {
          baseHtml: '<div class="caixa"><h1>Titulo</h1><p>Texto de exemplo aqui.</p></div>',
          initialCss:
            '.caixa { color: #111827; background-color: #FDF2F8; padding: 18px; border-radius: 20px; }',
          editableProperties: ['.caixa.color', '.caixa.background-color', '.caixa.opacity'],
          controls: [
            { type: 'color', selector: '.caixa', property: 'color', label: 'Cor do texto', defaultValue: '#111827' },
            {
              type: 'color',
              selector: '.caixa',
              property: 'background-color',
              label: 'Cor do fundo',
              defaultValue: '#FDF2F8',
            },
            {
              type: 'slider',
              selector: '.caixa',
              property: 'opacity',
              label: 'Transparencia',
              min: 0.2,
              max: 1,
              step: 0.1,
              unit: '',
              defaultValue: 1,
            },
          ],
        },
      },
      {
        id: 'c4-concept-2',
        title: 'Muitas formas de escrever uma cor',
        forInterpreter:
          'Apresente red, #ff0000, rgb(255, 0, 0) e rgba(255, 0, 0, 0.5) como jeitos diferentes de chegar a resultados parecidos. Quando mudar a transparencia, chame atencao para a ideia de “quase transparente”.',
        codeExample:
          'h1 { color: red; }\n\np { color: #FF0000; }\n\nbutton { background-color: rgb(255, 0, 0); }\n\n.card { background-color: rgba(255, 0, 0, 0.4); }',
        livePanel: {
          baseHtml:
            '<div class="card"><h1>Vermelho</h1><p>Mesmo tom por outros caminhos.</p><button>Botao</button></div>',
          initialCss:
            '.card { background-color: rgba(255, 0, 0, 0.15); padding: 20px; border-radius: 20px; }\nh1 { color: red; }\np { color: #FF0000; }\nbutton { background-color: rgb(255, 0, 0); color: white; border: none; padding: 10px 14px; border-radius: 999px; }',
          editableProperties: ['.card.background-color', '.card.opacity'],
          controls: [
            {
              type: 'color',
              selector: '.card',
              property: 'background-color',
              label: 'Cor da caixa',
              defaultValue: '#FECACA',
            },
            {
              type: 'slider',
              selector: '.card',
              property: 'opacity',
              label: 'Opacidade da caixa',
              min: 0.4,
              max: 1,
              step: 0.1,
              unit: '',
              defaultValue: 1,
            },
          ],
        },
      },
    ],
    exercises: [
      createBuildExercise(
        'css-ex-4-1',
        'Monte a declaracao que deixa o fundo rosa.',
        '.caixa',
        ['property', 'colon', 'value', 'semicolon'],
        ['background-color', 'color', ':', ';', '#FBCFE8'],
        ['background-color', ':', '#FBCFE8', ';'],
        '<div style="padding:16px;border-radius:16px;background:#FBCFE8;">Caixa rosa</div>',
        'Isso! O fundo rosa nasceu do CSS certo.',
      ),
      createMatchPreviewExercise(
        'css-ex-4-2',
        'Ajuste ate combinar com o alvo.',
        '.caixa {\n  color: #1D4ED8;\n  background-color: #E0F2FE;\n  opacity: 0.8;\n}',
        {
          baseHtml: '<div class="caixa"><h1>Titulo</h1><p>Texto colorido</p></div>',
          initialCss: '.caixa { color: #111827; background-color: #ffffff; opacity: 1; padding: 18px; border-radius: 18px; }',
          editableProperties: ['.caixa.color', '.caixa.background-color', '.caixa.opacity'],
          controls: [
            { type: 'color', selector: '.caixa', property: 'color', label: 'Cor do texto', defaultValue: '#111827' },
            { type: 'color', selector: '.caixa', property: 'background-color', label: 'Cor do fundo', defaultValue: '#ffffff' },
            { type: 'slider', selector: '.caixa', property: 'opacity', label: 'Opacidade', min: 0.2, max: 1, step: 0.1, unit: '', defaultValue: 1 },
          ],
        },
        {
          '.caixa.color': '#1D4ED8',
          '.caixa.background-color': '#E0F2FE',
          '.caixa.opacity': 0.8,
        },
        'Perfeito! As cores e a transparencia bateram com o alvo.',
      ),
    ],
  },
  {
    id: 5,
    slug: 'font-family',
    title: 'Tipo de Fontes',
    emoji: '✍️',
    color: '#0EA5E9',
    forInterpreter:
      'Compare as fontes com estilos de escrita do mundo real. Algumas parecem mais modernas, outras mais classicas, outras lembram maquina de escrever. Mostre tambem a ideia de fallback: se a primeira fonte nao existir, o navegador usa a proxima da lista.',
    forElisa: {
      headline: 'Escolha o estilo da letra!',
      description: 'Cada fonte tem uma cara diferente.',
      metaphor: 'A palavra ELISA muda de roupa em cada fonte.',
    },
    concepts: [
      {
        id: 'c5-concept-1',
        title: 'Fontes mudam a personalidade',
        forInterpreter:
          'Faça Elisa experimentar Arial, Georgia, Courier New, Verdana e Times New Roman. A experiencia aqui precisa ser visual e imediata, quase como trocar o figurino de uma palavra.',
        codeExample:
          'h1 {\n  font-family: Arial, sans-serif;\n}\n\np {\n  font-family: Georgia, serif;\n}',
        livePanel: {
          baseHtml: '<h1>Elisa aprende CSS</h1><p>Esta frase muda de cara com cada fonte.</p>',
          initialCss: 'h1 { font-family: Nunito, Arial, sans-serif; }\np { font-family: Nunito, Arial, sans-serif; }',
          editableProperties: ['h1.font-family', 'p.font-family'],
          controls: [
            {
              type: 'font',
              selector: 'h1',
              property: 'font-family',
              label: 'Fonte do titulo',
              defaultValue: 'Nunito, Arial, sans-serif',
              options: [
                'Nunito, Arial, sans-serif',
                'Arial, sans-serif',
                'Georgia, serif',
                '"Courier New", monospace',
                '"Times New Roman", serif',
                'Verdana, sans-serif',
              ],
            },
            {
              type: 'font',
              selector: 'p',
              property: 'font-family',
              label: 'Fonte do texto',
              defaultValue: 'Nunito, Arial, sans-serif',
              options: [
                'Nunito, Arial, sans-serif',
                'Arial, sans-serif',
                'Georgia, serif',
                '"Courier New", monospace',
                '"Times New Roman", serif',
                'Verdana, sans-serif',
              ],
            },
          ],
        },
      },
      {
        id: 'c5-concept-2',
        title: 'Fallback e familias genericas',
        forInterpreter:
          'Explique que a virgula cria um plano B. Se a primeira fonte falhar, entra a segunda. Se nenhuma fonte especial existir, a familia generica serif ou sans-serif salva a leitura.',
        codeExample: 'font-family: "Nunito", "Arial", sans-serif;',
        livePanel: {
          baseHtml: '<p>Nunito, Arial e sans-serif podem trabalhar em fila.</p>',
          initialCss: 'p { font-family: "Nunito", "Arial", sans-serif; font-size: 22px; }',
          editableProperties: ['p.font-family'],
          controls: [
            {
              type: 'font',
              selector: 'p',
              property: 'font-family',
              label: 'Teste a fila de fontes',
              defaultValue: '"Nunito", "Arial", sans-serif',
              options: [
                '"Nunito", "Arial", sans-serif',
                'Georgia, serif',
                'Verdana, sans-serif',
                '"Courier New", monospace',
                'cursive',
              ],
            },
          ],
        },
      },
    ],
    exercises: [
      createPredictExercise(
        'css-ex-5-1',
        'Qual preview parece fonte de maquina de escrever?',
        'p {\n  font-family: "Courier New", monospace;\n}',
        [
          { id: 'a', label: 'Preview A', html: '<p style="font-family:Arial,sans-serif;">Texto exemplo</p>' },
          { id: 'b', label: 'Preview B', html: '<p style=\'font-family:"Courier New",monospace;\'>Texto exemplo</p>' },
          { id: 'c', label: 'Preview C', html: '<p style="font-family:Georgia,serif;">Texto exemplo</p>' },
        ],
        'b',
        'Boa! Essa e a cara monoespacada da Courier New.',
      ),
      createMatchExercise(
        'css-ex-5-2',
        'Ligue a fonte ao apelido visual.',
        [
          { id: 'arial', label: 'Arial', preview: 'Moderna e limpa' },
          { id: 'georgia', label: 'Georgia', preview: 'Elegante com serifa' },
          { id: 'courier', label: 'Courier New', preview: 'Parece codigo' },
        ],
        'Muito bem! Voce percebeu a personalidade das fontes.',
      ),
    ],
  },
  {
    id: 6,
    slug: 'font-size',
    title: 'Tamanho de Fontes',
    emoji: '🔡',
    color: '#38BDF8',
    forInterpreter:
      'Aqui entram tamanho e estilo do texto. O mais importante no inicio e px, pois e concreto. Depois abra o repertorio para rem, %, alinhamento, peso da fonte, italico, sublinhado e espaco entre letras e linhas. A experiencia precisa parecer um painel de controle de texto.',
    forElisa: {
      headline: 'Controle o tamanho das letras!',
      description: 'A letra cresce, muda peso e muda alinhamento.',
      metaphor: 'Parece zoom em uma frase.',
    },
    concepts: [
      {
        id: 'c6-concept-1',
        title: 'Tamanho, peso e alinhamento',
        forInterpreter:
          'Comece com font-size em px. Depois conecte font-weight ao “peso” visual da letra e text-align ao lugar onde o texto para na linha.',
        codeExample:
          'h1 {\n  font-size: 40px;\n  font-weight: 700;\n  text-align: center;\n}',
        livePanel: {
          baseHtml:
            '<h1>Titulo</h1><p>Este e um paragrafo de exemplo para brincar com tamanho e estilo.</p>',
          initialCss:
            'h1 { font-size: 32px; font-weight: 700; text-align: left; }\np { font-size: 18px; line-height: 1.6; }',
          editableProperties: ['h1.font-size', 'h1.font-weight', 'h1.text-align', 'p.font-style', 'p.text-decoration'],
          controls: [
            { type: 'slider', selector: 'h1', property: 'font-size', label: 'Tamanho do titulo', min: 12, max: 72, step: 1, unit: 'px', defaultValue: 32 },
            { type: 'slider', selector: 'h1', property: 'font-weight', label: 'Peso do titulo', min: 100, max: 900, step: 100, unit: '', defaultValue: 700 },
            { type: 'select', selector: 'h1', property: 'text-align', label: 'Alinhamento', defaultValue: 'left', options: ['left', 'center', 'right', 'justify'] },
            { type: 'toggle', selector: 'p', property: 'font-style', label: 'Italico no paragrafo', defaultValue: 'normal', activeValue: 'italic', inactiveValue: 'normal' },
            { type: 'toggle', selector: 'p', property: 'text-decoration', label: 'Sublinhar paragrafo', defaultValue: 'none', activeValue: 'underline', inactiveValue: 'none' },
          ],
        },
      },
      {
        id: 'c6-concept-2',
        title: 'Espaco entre linhas e letras',
        forInterpreter:
          'Line-height e o ar entre as linhas; letter-spacing e o espacinho entre letras. Essas duas propriedades alteram muito a leitura. Vale mostrar excesso e equilibrio.',
        codeExample:
          'p {\n  line-height: 1.8;\n  letter-spacing: 1px;\n}',
        livePanel: {
          baseHtml: '<p>Texto de exemplo para ajustar o espacamento e notar a leitura mais aberta.</p>',
          initialCss: 'p { font-size: 20px; line-height: 1.5; letter-spacing: 0px; }',
          editableProperties: ['p.line-height', 'p.letter-spacing', 'p.text-transform'],
          controls: [
            { type: 'slider', selector: 'p', property: 'line-height', label: 'Espaco entre linhas', min: 1, max: 3, step: 0.1, unit: '', defaultValue: 1.5 },
            { type: 'slider', selector: 'p', property: 'letter-spacing', label: 'Espaco entre letras', min: 0, max: 8, step: 0.5, unit: 'px', defaultValue: 0 },
            { type: 'select', selector: 'p', property: 'text-transform', label: 'Transformar texto', defaultValue: 'none', options: ['none', 'uppercase', 'lowercase', 'capitalize'] },
          ],
        },
      },
    ],
    exercises: [
      createFillExercise(
        'css-ex-6-1',
        'Complete o CSS do titulo.',
        [
          'h1 {',
          '  [blank-1]: 36px;',
          '  [blank-2]: center;',
          '  [blank-3]: 700;',
          '}',
        ],
        ['font-size', 'text-align', 'font-weight', 'margin'],
        { 'blank-1': 'font-size', 'blank-2': 'text-align', 'blank-3': 'font-weight' },
        'Boa! O titulo ganhou tamanho, alinhamento e peso.',
      ),
      createMatchPreviewExercise(
        'css-ex-6-2',
        'Ajuste os controles ate o preview ficar igual ao alvo.',
        'h1 {\n  font-size: 48px;\n  text-align: center;\n  font-weight: 800;\n}',
        {
          baseHtml: '<h1>Titulo alvo</h1>',
          initialCss: 'h1 { font-size: 24px; text-align: left; font-weight: 400; }',
          editableProperties: ['h1.font-size', 'h1.text-align', 'h1.font-weight'],
          controls: [
            { type: 'slider', selector: 'h1', property: 'font-size', label: 'Tamanho', min: 16, max: 64, step: 1, unit: 'px', defaultValue: 24 },
            { type: 'select', selector: 'h1', property: 'text-align', label: 'Alinhamento', defaultValue: 'left', options: ['left', 'center', 'right'] },
            { type: 'slider', selector: 'h1', property: 'font-weight', label: 'Peso', min: 100, max: 900, step: 100, unit: '', defaultValue: 400 },
          ],
        },
        {
          'h1.font-size': 48,
          'h1.text-align': 'center',
          'h1.font-weight': 800,
        },
        'Muito bem! O texto ficou igual ao alvo.',
      ),
    ],
  },
  {
    id: 7,
    slug: 'box-model',
    title: 'Introducao ao Box Model',
    emoji: '📦',
    color: '#F59E0B',
    forInterpreter:
      'Todo elemento e uma caixa. Essa e a ideia central. Conteudo fica no meio; padding cria acolchoado interno; border desenha o limite; margin empurra a caixa para longe das vizinhas. Vale reforcar que box-sizing: border-box costuma ser mais intuitivo porque o tamanho total passa a incluir padding e borda.',
    forElisa: {
      headline: 'Todo elemento e uma caixa!',
      description: 'Dentro fica o conteudo. Fora ficam espacos e bordas.',
      metaphor: 'Uma caixa de presente com camadas coloridas.',
    },
    concepts: [
      {
        id: 'c7-concept-1',
        title: 'As quatro camadas da caixa',
        forInterpreter:
          'Mostre cada camada por cor. Quando padding cresce, o conteudo ganha ar por dentro. Quando border cresce, a linha engrossa. Quando margin cresce, a distancia para fora aumenta.',
        codeExample:
          '.caixa {\n  padding: 16px;\n  border: 4px solid #f59e0b;\n  margin: 20px;\n}',
        livePanel: {
          baseHtml: '<div class="caixa">Conteudo aqui</div>',
          initialCss:
            '.caixa { width: 220px; padding: 12px; border: 4px solid #F59E0B; margin: 18px; border-radius: 18px; background: #FEF3C7; box-sizing: border-box; }',
          editableProperties: ['.caixa.padding', '.caixa.margin', '.caixa.border-width'],
          controls: [
            { type: 'slider', selector: '.caixa', property: 'padding', label: 'Padding', min: 0, max: 50, step: 1, unit: 'px', defaultValue: 12 },
            { type: 'slider', selector: '.caixa', property: 'margin', label: 'Margin', min: 0, max: 50, step: 1, unit: 'px', defaultValue: 18 },
            { type: 'slider', selector: '.caixa', property: 'border-width', label: 'Borda', min: 0, max: 20, step: 1, unit: 'px', defaultValue: 4 },
          ],
          diagram: true,
        },
      },
      {
        id: 'c7-concept-2',
        title: 'content-box e border-box',
        forInterpreter:
          'Mostre duas caixas com a mesma width, uma usando content-box e outra usando border-box. A primeira cresce para fora quando recebe padding e border; a segunda continua no mesmo tamanho total. Essa comparacao costuma ser decisiva para o entendimento.',
        codeExample:
          '.a { box-sizing: content-box; }\n.b { box-sizing: border-box; }',
        livePanel: {
          baseHtml: '<div class="a">content-box</div><div class="b">border-box</div>',
          initialCss:
            '.a, .b { width: 220px; padding: 16px; border: 6px solid #7C3AED; margin-bottom: 12px; background: #EDE9FE; }\n.a { box-sizing: content-box; }\n.b { box-sizing: border-box; }',
          editableProperties: ['.a.padding', '.b.padding'],
          controls: [
            { type: 'slider', selector: '.a, .b', property: 'padding', label: 'Padding nas duas caixas', min: 0, max: 40, step: 1, unit: 'px', defaultValue: 16 },
          ],
        },
      },
    ],
    exercises: [
      createIdentifyExercise(
        'css-ex-7-1',
        'Toque na camada pedida.',
        'Onde esta o padding?',
        {
          title: 'Caixa em camadas',
          areas: [
            { id: 'margin', label: 'Margin', x: 4, y: 6, w: 92, h: 84 },
            { id: 'border', label: 'Border', x: 16, y: 18, w: 68, h: 60 },
            { id: 'padding', label: 'Padding', x: 26, y: 28, w: 48, h: 40 },
            { id: 'content', label: 'Content', x: 38, y: 38, w: 24, h: 20 },
          ],
        },
        'padding',
        'Isso! Padding e o espaco interno da caixa.',
      ),
      createMatchExercise(
        'css-ex-7-2',
        'Ligue a camada ao significado.',
        [
          { id: 'content', label: 'Content', preview: 'Parte onde o texto mora' },
          { id: 'padding', label: 'Padding', preview: 'Acolchoado interno' },
          { id: 'border', label: 'Border', preview: 'Linha que envolve a caixa' },
          { id: 'margin', label: 'Margin', preview: 'Espaco externo para os vizinhos' },
        ],
        'Muito bem! As camadas do box model ficaram claras.',
      ),
    ],
  },
  {
    id: 8,
    slug: 'width-height',
    title: 'Altura e Largura',
    emoji: '📐',
    color: '#10B981',
    forInterpreter:
      'Width e height mudam o tamanho do conteudo. Use sliders para mostrar isso rapidamente. Depois acrescente min e max como limites. Aproveite para explicar que elementos de bloco aceitam melhor essas medidas, enquanto inline nao responde do mesmo jeito.',
    forElisa: {
      headline: 'Defina o tamanho dos elementos!',
      description: 'A caixa estica e encolhe em tempo real.',
      metaphor: 'Parece uma caixa de papel que abre e fecha.',
    },
    concepts: [
      {
        id: 'c8-concept-1',
        title: 'Width e height em acao',
        forInterpreter:
          'Ao mover os sliders, a caixa deve claramente ficar mais larga ou mais alta. Essa ligacao direta ajuda Elisa a associar o nome da propriedade com o efeito espacial.',
        codeExample:
          '.caixa {\n  width: 320px;\n  height: 160px;\n}',
        livePanel: {
          baseHtml: '<div class="caixa">Este e o conteudo da caixa. Arraste os sliders para mudar o tamanho.</div>',
          initialCss:
            '.caixa { width: 320px; height: 180px; background: #DCFCE7; border-radius: 20px; padding: 16px; overflow: auto; }',
          editableProperties: ['.caixa.width', '.caixa.height'],
          controls: [
            { type: 'slider', selector: '.caixa', property: 'width', label: 'Largura', min: 80, max: 800, step: 10, unit: 'px', defaultValue: 320 },
            { type: 'slider', selector: '.caixa', property: 'height', label: 'Altura', min: 80, max: 400, step: 10, unit: 'px', defaultValue: 180 },
          ],
        },
      },
      {
        id: 'c8-concept-2',
        title: 'Minimos, maximos e display',
        forInterpreter:
          'Use uma caixa com max-width para mostrar limite e um span inline para mostrar que width e height nao mandam nele do mesmo jeito. Em seguida, troque para inline-block e mostre a resposta visual.',
        codeExample:
          '.container {\n  max-width: 420px;\n  margin: 0 auto;\n}\n\nspan {\n  display: inline-block;\n  width: 180px;\n}',
        livePanel: {
          baseHtml:
            '<div class="container"><div class="card">Container com limite</div><span class="tag">Inline ou inline-block?</span></div>',
          initialCss:
            '.container { max-width: 420px; margin: 0 auto; background: #ECFDF5; padding: 14px; border-radius: 18px; }\n.card { background: #A7F3D0; padding: 12px; border-radius: 14px; }\n.tag { display: inline-block; width: 180px; background: #D1FAE5; margin-top: 12px; padding: 8px; }',
          editableProperties: ['.container.max-width', '.tag.display'],
          controls: [
            { type: 'slider', selector: '.container', property: 'max-width', label: 'Max width', min: 180, max: 700, step: 10, unit: 'px', defaultValue: 420 },
            { type: 'select', selector: '.tag', property: 'display', label: 'Display do span', defaultValue: 'inline-block', options: ['inline', 'inline-block', 'block'] },
          ],
        },
      },
    ],
    exercises: [
      createBuildExercise(
        'css-ex-8-1',
        'Monte a declaracao da largura.',
        '.caixa',
        ['property', 'colon', 'value', 'semicolon'],
        ['width', 'height', ':', ';', '400px'],
        ['width', ':', '400px', ';'],
        '<div style="width:400px;background:#D1FAE5;padding:12px;border-radius:14px;">Largura maior</div>',
        'Boa! A largura correta apareceu no preview.',
      ),
      createMatchPreviewExercise(
        'css-ex-8-2',
        'Ajuste a caixa ate ela ficar igual ao alvo.',
        '.caixa {\n  width: 500px;\n  height: 120px;\n}',
        {
          baseHtml: '<div class="caixa">Caixa alvo</div>',
          initialCss: '.caixa { width: 220px; height: 220px; background: #DCFCE7; border-radius: 18px; padding: 12px; }',
          editableProperties: ['.caixa.width', '.caixa.height'],
          controls: [
            { type: 'slider', selector: '.caixa', property: 'width', label: 'Largura', min: 80, max: 700, step: 10, unit: 'px', defaultValue: 220 },
            { type: 'slider', selector: '.caixa', property: 'height', label: 'Altura', min: 80, max: 320, step: 10, unit: 'px', defaultValue: 220 },
          ],
        },
        {
          '.caixa.width': 500,
          '.caixa.height': 120,
        },
        'Perfeito! A caixa chegou ao tamanho pedido.',
      ),
    ],
  },
  {
    id: 9,
    slug: 'padding-margin-border',
    title: 'Padding, Margin e Border',
    emoji: '🎁',
    color: '#F59E0B',
    forInterpreter:
      'Este capitulo detalha cada camada externa da caixa. Mostre o padding afastando o texto da borda, a margin separando duas caixas e a border desenhando o contorno. Inclua border-radius para arredondar e destaque margin: 0 auto como truque de centralizacao horizontal.',
    forElisa: {
      headline: 'Padding, margin e border moldam!',
      description: 'Cada slider muda uma camada da caixa.',
      metaphor: 'Como arrumar um presente com fita e espaco.',
    },
    concepts: [
      {
        id: 'c9-concept-1',
        title: 'Padding e margin por lado',
        forInterpreter:
          'Mostre o sentido horario: cima, direita, baixo, esquerda. Isso e importante para as formas curtas da propriedade e fica mais facil com sliders separados.',
        codeExample:
          '.caixa {\n  padding: 10px 20px 15px 5px;\n  margin: 12px 0 20px 0;\n}',
        livePanel: {
          baseHtml: '<div class="caixa">Caixa 1</div><div class="caixa">Caixa 2</div>',
          initialCss:
            '.caixa { background: #FEF3C7; border-radius: 18px; padding: 12px 18px 12px 18px; margin: 10px 0 10px 0; border: 3px solid #F59E0B; }',
          editableProperties: [
            '.caixa.padding-top',
            '.caixa.padding-right',
            '.caixa.padding-bottom',
            '.caixa.padding-left',
            '.caixa.margin-top',
            '.caixa.margin-bottom',
          ],
          controls: [
            { type: 'slider', selector: '.caixa', property: 'padding-top', label: 'Padding top', min: 0, max: 40, step: 1, unit: 'px', defaultValue: 12 },
            { type: 'slider', selector: '.caixa', property: 'padding-right', label: 'Padding right', min: 0, max: 40, step: 1, unit: 'px', defaultValue: 18 },
            { type: 'slider', selector: '.caixa', property: 'padding-bottom', label: 'Padding bottom', min: 0, max: 40, step: 1, unit: 'px', defaultValue: 12 },
            { type: 'slider', selector: '.caixa', property: 'padding-left', label: 'Padding left', min: 0, max: 40, step: 1, unit: 'px', defaultValue: 18 },
            { type: 'slider', selector: '.caixa', property: 'margin-top', label: 'Margin top', min: 0, max: 40, step: 1, unit: 'px', defaultValue: 10 },
            { type: 'slider', selector: '.caixa', property: 'margin-bottom', label: 'Margin bottom', min: 0, max: 40, step: 1, unit: 'px', defaultValue: 10 },
          ],
          diagram: true,
        },
      },
      {
        id: 'c9-concept-2',
        title: 'Border, estilo e radius',
        forInterpreter:
          'Aqui a borda precisa ser bem visual. Mostre solid, dashed, dotted e double. Em seguida, use border-radius para transformar a caixa de quadrada para arredondada e quase circular.',
        codeExample:
          '.caixa {\n  border: 4px dashed #db2777;\n  border-radius: 18px;\n}',
        livePanel: {
          baseHtml: '<div class="caixa">Borda viva</div>',
          initialCss:
            '.caixa { border: 4px solid #DB2777; border-radius: 18px; padding: 18px; width: 260px; background: #FDF2F8; }',
          editableProperties: ['.caixa.border-width', '.caixa.border-style', '.caixa.border-color', '.caixa.border-radius'],
          controls: [
            { type: 'slider', selector: '.caixa', property: 'border-width', label: 'Espessura', min: 0, max: 16, step: 1, unit: 'px', defaultValue: 4 },
            { type: 'select', selector: '.caixa', property: 'border-style', label: 'Estilo da borda', defaultValue: 'solid', options: ['solid', 'dashed', 'dotted', 'double', 'none'] },
            { type: 'color', selector: '.caixa', property: 'border-color', label: 'Cor da borda', defaultValue: '#DB2777' },
            { type: 'slider', selector: '.caixa', property: 'border-radius', label: 'Cantos arredondados', min: 0, max: 80, step: 1, unit: 'px', defaultValue: 18 },
          ],
        },
      },
    ],
    exercises: [
      createMatchExercise(
        'css-ex-9-1',
        'Ligue a propriedade ao efeito visual.',
        [
          { id: 'padding', label: 'padding', preview: 'Aumenta o espaco interno' },
          { id: 'margin', label: 'margin', preview: 'Aumenta a distancia entre caixas' },
          { id: 'border-radius', label: 'border-radius', preview: 'Arredonda os cantos' },
          { id: 'border-style', label: 'border-style', preview: 'Muda o jeito da borda' },
        ],
        'Muito bem! Voce percebeu o papel de cada propriedade.',
      ),
      createIdentifyExercise(
        'css-ex-9-2',
        'Toque na parte externa entre duas caixas.',
        'Onde esta a margin?',
        {
          title: 'Duas caixas empilhadas',
          areas: [
            { id: 'caixa-cima', label: 'Caixa de cima', x: 18, y: 12, w: 64, h: 24 },
            { id: 'margin', label: 'Espaco entre caixas', x: 18, y: 40, w: 64, h: 10 },
            { id: 'caixa-baixo', label: 'Caixa de baixo', x: 18, y: 54, w: 64, h: 24 },
          ],
        },
        'margin',
        'Boa! Margin e o espaco fora da caixa.',
      ),
    ],
  },
  {
    id: 10,
    slug: 'position',
    title: 'Posicionamento',
    emoji: '📍',
    color: '#EF4444',
    forInterpreter:
      'Position e um conceito abstrato, entao use analogias concretas com objetos sobre uma mesa. Static e o normal. Relative mexe no objeto a partir de onde ele estaria. Absolute sai do fluxo e cola em um lugar do pai posicionado. Fixed cola na tela. Sticky fica normal ate atingir o topo e depois gruda. Feche com top, left e z-index como controles de deslocamento e empilhamento.',
    forElisa: {
      headline: 'Mova elementos pela pagina!',
      description: 'Cada tipo de position mexe de um jeito.',
      metaphor: 'Objetos mudam de lugar sobre uma mesa.',
    },
    concepts: [
      {
        id: 'c10-concept-1',
        title: 'Static, relative e absolute',
        forInterpreter:
          'Agrupe os tres primeiros comportamentos para comparar. Static fica no fluxo normal. Relative sai um pouco do lugar mas guarda o espaco. Absolute ignora o espaco e se prende a um ponto exato do pai.',
        codeExample:
          '.item { position: relative; top: 20px; left: 16px; }\n\n.badge { position: absolute; top: 8px; right: 8px; }',
        livePanel: {
          baseHtml:
            '<div class="mesa"><div class="item">Caixa principal</div><div class="badge">Selo</div><p>Texto embaixo para mostrar o fluxo.</p></div>',
          initialCss:
            '.mesa { position: relative; min-height: 260px; padding: 20px; background: #FEE2E2; border-radius: 22px; }\n.item { position: static; width: 220px; padding: 16px; background: #FCA5A5; border-radius: 16px; transition: all 220ms ease; }\n.badge { position: absolute; top: 12px; right: 12px; background: white; padding: 8px 12px; border-radius: 999px; }\np { margin-top: 16px; }',
          editableProperties: ['.item.position', '.item.top', '.item.left', '.badge.z-index'],
          controls: [
            { type: 'select', selector: '.item', property: 'position', label: 'Tipo da caixa principal', defaultValue: 'static', options: ['static', 'relative', 'absolute'] },
            { type: 'slider', selector: '.item', property: 'top', label: 'Top', min: -40, max: 80, step: 2, unit: 'px', defaultValue: 0 },
            { type: 'slider', selector: '.item', property: 'left', label: 'Left', min: -40, max: 120, step: 2, unit: 'px', defaultValue: 0 },
            { type: 'slider', selector: '.badge', property: 'z-index', label: 'Z-index do selo', min: 0, max: 10, step: 1, unit: '', defaultValue: 1 },
          ],
        },
      },
      {
        id: 'c10-concept-2',
        title: 'Fixed e sticky',
        forInterpreter:
          'Aqui o preview precisa ter rolagem. Mostre um topo que pode virar sticky e um botao que pode virar fixed. A comparacao so faz sentido se Elisa conseguir rolar o preview.',
        codeExample:
          '.topo { position: sticky; top: 0; }\n\n.botao { position: fixed; bottom: 16px; right: 16px; }',
        livePanel: {
          baseHtml:
            '<div class="topo">Topo da lista</div><div class="conteudo"><p>Linha 1</p><p>Linha 2</p><p>Linha 3</p><p>Linha 4</p><p>Linha 5</p><p>Linha 6</p><p>Linha 7</p><p>Linha 8</p></div><button class="botao">Ajuda</button>',
          initialCss:
            'body { min-height: 520px; }\n.topo { position: sticky; top: 0; background: #FECACA; padding: 14px; border-radius: 16px; }\n.conteudo p { margin: 18px 0; }\n.botao { position: fixed; bottom: 14px; right: 14px; background: #EF4444; color: white; border: none; border-radius: 999px; padding: 10px 14px; transition: all 220ms ease; }',
          editableProperties: ['.topo.position', '.botao.position', '.botao.bottom', '.botao.right'],
          controls: [
            { type: 'select', selector: '.topo', property: 'position', label: 'Position do topo', defaultValue: 'sticky', options: ['static', 'relative', 'sticky'] },
            { type: 'select', selector: '.botao', property: 'position', label: 'Position do botao', defaultValue: 'fixed', options: ['static', 'absolute', 'fixed'] },
            { type: 'slider', selector: '.botao', property: 'bottom', label: 'Bottom', min: 0, max: 80, step: 2, unit: 'px', defaultValue: 14 },
            { type: 'slider', selector: '.botao', property: 'right', label: 'Right', min: 0, max: 80, step: 2, unit: 'px', defaultValue: 14 },
          ],
        },
      },
    ],
    exercises: [
      createMatchExercise(
        'css-ex-10-1',
        'Ligue o tipo de position ao comportamento.',
        [
          { id: 'static', label: 'static', preview: 'Fica no fluxo normal' },
          { id: 'relative', label: 'relative', preview: 'Move a partir do lugar original' },
          { id: 'absolute', label: 'absolute', preview: 'Sai do fluxo e cola em um ponto' },
          { id: 'fixed', label: 'fixed', preview: 'Gruda na tela' },
          { id: 'sticky', label: 'sticky', preview: 'Rola e depois gruda' },
        ],
        'Excelente! Os tipos de position fizeram sentido.',
      ),
      createMatchPreviewExercise(
        'css-ex-10-2',
        'Ajuste o elemento ate ele virar um selo absolute no canto.',
        '.selo {\n  position: absolute;\n  top: 12px;\n  left: 180px;\n}',
        {
          baseHtml:
            '<div class="quadro"><div class="cartao">Cartao</div><div class="selo">Selo</div></div>',
          initialCss:
            '.quadro { position: relative; min-height: 220px; background: #FEE2E2; border-radius: 20px; padding: 18px; }\n.cartao { width: 220px; height: 120px; background: #FCA5A5; border-radius: 18px; }\n.selo { position: static; background: white; border-radius: 999px; padding: 8px 12px; }',
          editableProperties: ['.selo.position', '.selo.top', '.selo.left'],
          controls: [
            { type: 'select', selector: '.selo', property: 'position', label: 'Tipo do selo', defaultValue: 'static', options: ['static', 'relative', 'absolute', 'fixed'] },
            { type: 'slider', selector: '.selo', property: 'top', label: 'Top', min: 0, max: 80, step: 2, unit: 'px', defaultValue: 0 },
            { type: 'slider', selector: '.selo', property: 'left', label: 'Left', min: 0, max: 220, step: 2, unit: 'px', defaultValue: 0 },
          ],
        },
        {
          '.selo.position': 'absolute',
          '.selo.top': 12,
          '.selo.left': 180,
        },
        'Muito bem! O selo ficou preso no canto com absolute.',
      ),
    ],
  },
];

export default chapters;
