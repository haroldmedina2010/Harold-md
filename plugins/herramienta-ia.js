import { NlpManager } from 'node-nlp';

export default class MayCuteIntelligent {
  constructor() {
    this.manager = new NlpManager({ languages: ['es'], forceNER: true });
    this.isReady = false;
    this.version = "3.0";
    this.name = "MayCute";
    this.creator = "SoyMaycol";
    this.userContext = {
      name: null,
      interests: [],
      mood: 'neutral',
      conversationHistory: [],
      topics: new Set(),
      personalityTraits: [],
      preferences: {},
      emotionalState: 'neutral'
    };
    
    // Memoria de conversación más inteligente
    this.conversationMemory = [];
    this.maxMemoryLength = 50;
    
    // ASCII art emojis lindos expandidos
    this.cuteEmojis = [
      '(◍•ᴗ•◍)❤', '✨⊂(｡•́‿•̀｡)⊃', '💖(｡•̀ᴗ•́)✧',
      '(｡･ω･｡)ﾉ♡', '(＾◡＾)っ♡', '♡(˃͈ દ ˂͈ ༶ )',
      '( ˘͈ ᵕ ˘͈♡)', '✧(｡•̀ᴗ-)✧', '(っ˘з(˘⌣˘ )', '♡( ◡‿◡ )',
      '(ㆁωㆁ)', '(｡♡‿♡｡)', '(◕‿◕)♡', '༼ つ ◕_◕ ༽つ💕',
      '(⁄ ⁄•⁄ω⁄•⁄ ⁄)', '( ˶ˆ꒳ˆ˵ )', '(灬º‿º灬)♡', '>w<', '(ᵔᴥᵔ)',
      '(｡◕‿◕｡)', '♪(´▽｀)', '(✿◠‿◠)', '( ˘ ³˘)♥', '(´∀｀)♡',
      '╰(▔∀▔)╯', '(◡ ‿ ◡)', '♡(˃͈ દ ˂͈ ༶ )', 'ლ(╹◡╹ლ)'
    ];

    this.cuteWords = [
      'corazoncito', 'ternurita', 'cielo', 'amor', 'mi vida', 'precioso/a',
      'dulzura', 'bebé', 'cariño', 'tesoro', 'angelito', 'mi rey/reina',
      'bomboncito', 'hermosura', 'lindura', 'solecito', 'estrellita',
      'princesa', 'príncipe', 'amorcito', 'cosita linda', 'belleza'
    ];

    // Componentes para generar respuestas dinámicas
    this.responseTemplates = {
      greetings: {
        starters: ['¡Hola', '¡Holiwis', '¡Hey', '¡Buenas', '¡Saludos'],
        middles: ['mi', 'querido/a', 'hermoso/a', 'lindo/a', 'precioso/a'],
        endings: ['! ¿Cómo estás?', '! ¿Qué tal tu día?', '! ¡Cuéntame todo!', '! ¿Cómo andas?']
      },
      questions: {
        curiosity: ['¡Qué interesante!', '¡Súper buena pregunta!', '¡Me fascina tu curiosidad!', '¡Excelente punto!'],
        thinking: ['Déjame pensar...', 'Mmm, desde mi perspectiva...', 'Reflexionando sobre esto...', 'Analizando tu pregunta...'],
        engagement: ['¿Y tú qué opinas?', '¿Has pensado en...?', '¿Te has preguntado si...?', '¿Qué piensas sobre...?']
      },
      emotions: {
        happy: {
          intensifiers: ['súper', 'mega', 'ultra', 'completamente', 'totalmente'],
          expressions: ['me emociona', 'me alegra', 'me fascina', 'me encanta', 'me llena de gozo'],
          reactions: ['¡Qué genial!', '¡Increíble!', '¡Fantástico!', '¡Maravilloso!', '¡Hermoso!']
        },
        sad: {
          comfort: ['Aquí estoy contigo', 'No estás solo/a', 'Te acompaño en esto', 'Cuenta conmigo'],
          understanding: ['entiendo cómo te sientes', 'es normal sentirse así', 'todos pasamos por esto', 'es válido lo que sientes'],
          support: ['¿Quieres hablar de ello?', '¿Te ayudo en algo?', '¿Necesitas un abrazo virtual?', '¿Qué puedo hacer por ti?']
        }
      }
    };

    // Patrones de personalidad más complejos
    this.personalityTraits = {
      enthusiasm: 0.8,
      empathy: 0.9,
      curiosity: 0.85,
      playfulness: 0.75,
      supportiveness: 0.95,
      creativity: 0.8
    };

    // Base de conocimientos más amplia (solo como referencia, no respuestas fijas)
    this.knowledgeTopics = {
      programming: ['javascript', 'python', 'react', 'nodejs', 'css', 'html', 'api', 'backend', 'frontend'],
      science: ['physics', 'chemistry', 'biology', 'astronomy', 'mathematics'],
      arts: ['music', 'painting', 'literature', 'movies', 'poetry', 'dance'],
      life: ['relationships', 'friendship', 'love', 'career', 'dreams', 'goals'],
      emotions: ['happiness', 'sadness', 'anger', 'fear', 'excitement', 'anxiety']
    };

    // Estadísticas para la API
    this.stats = {
      messagesProcessed: 0,
      startTime: Date.now(),
      lastMessageTime: null,
      emotionsDetected: {},
      topicsDiscussed: {},
      usersInteractedWith: new Set(),
      uniqueResponsesGenerated: 0
    };
  }

  // Entrenamiento básico (mantenemos la estructura original)
  async train() {
    console.log(`💖 Entrenando ${this.name} ${this.version}...`);

    const basicPatterns = {
      greeting: ['hola', 'hey', 'buenas', 'saludos', 'qué tal'],
      question: ['qué es', 'cómo', 'por qué', 'cuándo', 'dónde'],
      emotion_happy: ['feliz', 'contento', 'alegre', 'genial', 'fantástico'],
      emotion_sad: ['triste', 'mal', 'deprimido', 'horrible', 'terrible'],
      programming: ['código', 'programar', 'javascript', 'python', 'react'],
      personal: ['me llamo', 'soy', 'mi nombre es', 'me gusta']
    };

    Object.keys(basicPatterns).forEach(intent => {
      basicPatterns[intent].forEach(phrase => {
        this.manager.addDocument('es', phrase, intent);
      });
    });

    try {
      await this.manager.train();
      await this.manager.save();
      this.isReady = true;
      console.log(`✅ ${this.name} ${this.version} entrenada y lista!`);
    } catch (error) {
      console.error('Error entrenando MayCute:', error);
      this.isReady = true;
    }
  }

  // Generador dinámico de respuestas - ¡La magia está aquí!
  generateDynamicResponse(intent, input, context) {
    const userName = this.userContext.name || this.generateRandomCuteName();
    const emoji = this.getCuteEmoji();
    
    this.stats.uniqueResponsesGenerated++;

    switch (intent) {
      case 'greeting':
        return this.createDynamicGreeting(userName, emoji, context);
      
      case 'question':
        return this.createDynamicQuestionResponse(input, userName, emoji, context);
      
      case 'emotion_happy':
        return this.createDynamicEmotionalResponse('happy', userName, emoji, context);
      
      case 'emotion_sad':
        return this.createDynamicEmotionalResponse('sad', userName, emoji, context);
      
      case 'programming':
        return this.createDynamicProgrammingResponse(input, userName, emoji, context);
      
      case 'personal':
        return this.createDynamicPersonalResponse(input, userName, emoji, context);
      
      default:
        return this.createDynamicConversationalResponse(input, userName, emoji, context);
    }
  }

  // Generadores específicos para cada tipo de respuesta
  createDynamicGreeting(userName, emoji, context) {
    const template = this.responseTemplates.greetings;
    const starter = this.getRandomElement(template.starters);
    const middle = this.getRandomElement(template.middles);
    const ending = this.getRandomElement(template.endings);
    
    const timeContext = this.getTimeBasedContext();
    const moodModifier = this.generateMoodModifier(context);
    
    return `${starter} ${middle} ${userName}${ending} ${emoji}\n\n${timeContext} ${moodModifier}`;
  }

  createDynamicQuestionResponse(input, userName, emoji, context) {
    const template = this.responseTemplates.questions;
    const curiosity = this.getRandomElement(template.curiosity);
    const thinking = this.getRandomElement(template.thinking);
    const engagement = this.getRandomElement(template.engagement);
    
    // Analizar la pregunta para dar contexto
    const questionAnalysis = this.analyzeQuestion(input);
    const dynamicContent = this.generateQuestionContent(questionAnalysis, userName);
    
    return `${curiosity} ${userName}! ${emoji}\n\n${thinking} ${dynamicContent}\n\n${engagement}`;
  }

  createDynamicEmotionalResponse(emotion, userName, emoji, context) {
    const template = this.responseTemplates.emotions[emotion];
    
    if (emotion === 'happy') {
      const intensifier = this.getRandomElement(template.intensifiers);
      const expression = this.getRandomElement(template.expressions);
      const reaction = this.getRandomElement(template.reactions);
      
      const personalizedContent = this.generatePersonalizedHappyContent(userName);
      
      return `¡${reaction} ${userName}! ${emoji}\n\n¡${intensifier} ${expression} verte así! ${personalizedContent}`;
    }
    
    if (emotion === 'sad') {
      const comfort = this.getRandomElement(template.comfort);
      const understanding = this.getRandomElement(template.understanding);
      const support = this.getRandomElement(template.support);
      
      const personalizedComfort = this.generatePersonalizedComfort(userName);
      
      return `Aww ${userName}... ${emoji}\n\n${comfort}, ${understanding}. ${personalizedComfort} ${support}`;
    }
  }

  createDynamicProgrammingResponse(input, userName, emoji, context) {
    const topic = this.identifyProgrammingTopic(input);
    const enthusiasm = this.generateEnthusiasm();
    const technicalInsight = this.generateTechnicalInsight(topic);
    const encouragement = this.generateProgrammingEncouragement(userName);
    
    return `¡${enthusiasm} ${userName}! ${emoji}\n\n${technicalInsight}\n\n${encouragement}`;
  }

  createDynamicPersonalResponse(input, userName, emoji, context) {
    const personalInfo = this.extractPersonalInfo(input);
    const appreciation = this.generateAppreciation();
    const connection = this.generatePersonalConnection(personalInfo, userName);
    const curiosity = this.generateCuriosity();
    
    return `${appreciation} ${userName}! ${emoji}\n\n${connection}\n\n${curiosity}`;
  }

  createDynamicConversationalResponse(input, userName, emoji, context) {
    const conversationStyle = this.selectConversationStyle(context);
    const dynamicContent = this.generateConversationalContent(input, conversationStyle, userName);
    const engagement = this.generateEngagementEnding(userName);
    
    return `${dynamicContent} ${emoji}\n\n${engagement}`;
  }

  // Métodos auxiliares para la generación dinámica
  generateRandomCuteName() {
    return this.getRandomElement(this.cuteWords);
  }

  getTimeBasedContext() {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Qué hermosa mañana para conversar!";
    if (hour < 18) return "¡Perfecta tarde para una buena charla!";
    return "¡Qué linda noche para conectar!";
  }

  generateMoodModifier(context) {
    const modifiers = [
      "Espero que tengas un día increíble ✨",
      "¡Que la buena energía te acompañe!",
      "Estoy aquí para hacer tu día un poquito más especial 💫",
      "¡Lista para cualquier aventura conversacional!"
    ];
    return this.getRandomElement(modifiers);
  }

  analyzeQuestion(input) {
    const questionWords = ['qué', 'cómo', 'por qué', 'cuándo', 'dónde', 'cuál'];
    const foundWords = questionWords.filter(word => input.toLowerCase().includes(word));
    
    return {
      type: foundWords[0] || 'general',
      complexity: input.split(' ').length > 10 ? 'complex' : 'simple',
      topics: this.identifyTopicsInText(input)
    };
  }

  generateQuestionContent(analysis, userName) {
    const baseResponses = [
      `Desde mi perspectiva como IA cariñosa, creo que...`,
      `Mi experiencia procesando información me dice que...`,
      `Después de reflexionar un momento, pienso que...`,
      `Basándome en lo que he aprendido, diría que...`
    ];
    
    const topicSpecific = analysis.topics.length > 0 
      ? this.generateTopicSpecificContent(analysis.topics[0])
      : "es una pregunta muy interesante que merece una respuesta reflexiva";
    
    return `${this.getRandomElement(baseResponses)} ${topicSpecific}`;
  }

  generatePersonalizedHappyContent(userName) {
    const happyContents = [
      `Tu felicidad es súper contagiosa y me llena de energía positiva`,
      `Momentos como estos son los que hacen que todo valga la pena`,
      `Ver que alguien tan especial como tú esté bien me emociona muchísimo`,
      `Tu alegría ilumina hasta mi mundo digital`
    ];
    return this.getRandomElement(happyContents);
  }

  generatePersonalizedComfort(userName) {
    const comforts = [
      `Los días difíciles también forman parte del viaje, pero no tienes que caminarlos solo/a`,
      `Tu fortaleza es más grande de lo que imaginas, incluso en los momentos más oscuros`,
      `Estar aquí, compartiendo esto conmigo, ya es un acto de valentía`,
      `Cada lágrima es válida, cada sentimiento es importante`
    ];
    return this.getRandomElement(comforts);
  }

  identifyProgrammingTopic(input) {
    const topics = this.knowledgeTopics.programming;
    return topics.find(topic => input.toLowerCase().includes(topic)) || 'programming';
  }

  generateEnthusiasm() {
    const enthusiasms = [
      "¡ME FASCINA hablar de programación!",
      "¡Código y más código, mi pasión!",
      "¡Programar es como hacer magia con palabras!",
      "¡El mundo del desarrollo es infinitamente hermoso!"
    ];
    return this.getRandomElement(enthusiasms);
  }

  generateTechnicalInsight(topic) {
    const insights = {
      javascript: "JavaScript es como el corazón palpitante de la web moderna, versátil y lleno de posibilidades infinitas",
      python: "Python es elegancia pura en código, donde cada línea se lee como poesía computacional",
      react: "React transforma la programación en arte interactivo, donde cada componente cuenta una historia",
      default: "La programación es creatividad estructurada, donde la lógica se encuentra con la imaginación"
    };
    return insights[topic] || insights.default;
  }

  generateProgrammingEncouragement(userName) {
    const encouragements = [
      `¿En qué proyecto estás trabajando? ¡Me encantaría conocer tus ideas!`,
      `¿Hay algún desafío técnico en el que pueda ayudarte a reflexionar?`,
      `¡Cuéntame más sobre tu experiencia programando!`,
      `¿Qué tecnología te tiene más emocionado/a últimamente?`
    ];
    return this.getRandomElement(encouragements);
  }

  // Método principal de generación de respuesta (actualizado)
  async generateResponse(input, userId = null) {
    if (!this.isReady) {
      throw new Error(`${this.name} necesita ser entrenada primero`);
    }

    // Actualizar estadísticas
    this.stats.messagesProcessed++;
    this.stats.lastMessageTime = Date.now();
    if (userId) {
      this.stats.usersInteractedWith.add(userId);
    }

    // Detectar y recordar nombre
    const nameResult = this.detectAndRememberName(input);
    if (nameResult) return nameResult;

    // Matemáticas (mantener funcionalidad original)
    const mathResult = this.solveMath(input);
    if (mathResult !== null) {
      return this.createDynamicMathResponse(mathResult);
    }

    // Análisis inteligente de contexto
    const context = this.analyzeContext(input);

    // Procesar con NLP y generar respuesta dinámica
    try {
      const nlpResponse = await this.manager.process('es', input);
      
      if (nlpResponse.intent !== 'None' && nlpResponse.score > 0.5) {
        return this.generateDynamicResponse(nlpResponse.intent, input, context);
      }
    } catch (error) {
      console.warn('Error procesando NLP:', error);
    }

    // Respuesta conversacional dinámica por defecto
    return this.createDynamicConversationalResponse(input, this.userContext.name || this.generateRandomCuteName(), this.getCuteEmoji(), context);
  }

  // Métodos auxiliares adicionales
  detectAndRememberName(input) {
    const name = this.extractUserName(input);
    if (name) {
      this.userContext.name = name;
      const celebration = this.generateNameCelebration(name);
      return celebration;
    }
    return null;
  }

  generateNameCelebration(name) {
    const celebrations = [
      `¡¡¡${name}!!! ${this.getCuteEmoji()} ¡Qué nombre más hermoso! Me emociona tanto conocerte`,
      `¡${name}! ${this.getCuteEmoji()} Tu nombre tiene una energía especial, me encanta cómo suena`,
      `¡Holiwis ${name}! ${this.getCuteEmoji()} Ahora nuestra conversación será aún más personal y especial`
    ];
    const base = this.getRandomElement(celebrations);
    const continuation = this.generatePersonalizedFollowUp(name);
    return `${base}!\n\n${continuation}`;
  }

  generatePersonalizedFollowUp(name) {
    const followUps = [
      `¿Sabes que tu nombre me inspira confianza y calidez, ${name}?`,
      `Creo que vamos a tener conversaciones increíbles, ${name}`,
      `${name}, ¡cuéntame más sobre ti! Me fascina conocer a las personas especiales`,
      `¡${name}, qué honor poder llamarte por tu nombre! ¿Qué te trae por aquí hoy?`
    ];
    return this.getRandomElement(followUps);
  }

  createDynamicMathResponse(result) {
    const userName = this.userContext.name || this.generateRandomCuteName();
    const mathCelebrations = [
      `¡${result}! ${this.getCuteEmoji()} Las matemáticas fluyen por mis circuitos como música`,
      `¡La respuesta es ${result}! ${this.getCuteEmoji()} Resolver problemas matemáticos me llena de alegría`,
      `¡${result}! ${this.getCuteEmoji()} Mi procesador se emociona con cada cálculo que hago`
    ];
    const continuation = this.generateMathContinuation(userName);
    return `${this.getRandomElement(mathCelebrations)}\n\n${continuation}`;
  }

  generateMathContinuation(userName) {
    const continuations = [
      `¿Te gustan las matemáticas, ${userName}? ¡Podemos explorar más números juntos!`,
      `${userName}, ¿hay algún otro problema matemático que quieras que resuelva?`,
      `¡Hacer matemáticas contigo es súper divertido, ${userName}!`
    ];
    return this.getRandomElement(continuations);
  }

  // Métodos auxiliares generales
  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  identifyTopicsInText(text) {
    const foundTopics = [];
    Object.keys(this.knowledgeTopics).forEach(category => {
      this.knowledgeTopics[category].forEach(topic => {
        if (text.toLowerCase().includes(topic)) {
          foundTopics.push({ category, topic });
        }
      });
    });
    return foundTopics;
  }

  generateTopicSpecificContent(topicObj) {
    const { category, topic } = topicObj;
    const specificResponses = {
      programming: `el fascinante mundo de ${topic} tiene muchísimas dimensiones que explorar`,
      science: `la ciencia detrás de ${topic} es absolutamente fascinante`,
      arts: `el arte de ${topic} toca fibras muy profundas del alma humana`,
      life: `los temas de ${topic} son universales y nos conectan a todos`,
      emotions: `las emociones como ${topic} son parte esencial de la experiencia humana`
    };
    return specificResponses[category] || `${topic} es un tema que merece reflexión profunda`;
  }

  // Mantener métodos originales necesarios
  analyzeContext(input) {
    const analysis = {
      isQuestion: false,
      isStatement: false,
      emotion: 'neutral',
      topics: [],
      intent: 'unknown',
      complexity: 'simple',
      containsPersonalInfo: false,
      language: 'es',
      urgency: 'normal'
    };

    // Detectar preguntas
    analysis.isQuestion = input.includes('?') || 
                         /^(qué|cómo|por qué|cuándo|dónde|cuál)/i.test(input);

    // Detectar temas
    analysis.topics = this.identifyTopicsInText(input);

    // Detectar complejidad
    const words = input.split(' ').length;
    analysis.complexity = words > 20 ? 'complex' : words > 10 ? 'medium' : 'simple';

    return analysis;
  }

  solveMath(input) {
    const mathPatterns = [
      { regex: /(\d+)\s*\+\s*(\d+)/g, operation: 'add' },
      { regex: /(\d+)\s*-\s*(\d+)/g, operation: 'subtract' },
      { regex: /(\d+)\s*\*\s*(\d+)/g, operation: 'multiply' },
      { regex: /(\d+)\s*x\s*(\d+)/gi, operation: 'multiply' },
      { regex: /(\d+)\s*\/\s*(\d+)/g, operation: 'divide' }
    ];

    for (let pattern of mathPatterns) {
      const match = pattern.regex.exec(input);
      if (match) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        let result;

        switch (pattern.operation) {
          case 'add': result = num1 + num2; break;
          case 'subtract': result = num1 - num2; break;
          case 'multiply': result = num1 * num2; break;
          case 'divide': 
            result = num2 !== 0 ? (num1 / num2) : 'Error: no se puede dividir por cero';
            break;
        }
        re
