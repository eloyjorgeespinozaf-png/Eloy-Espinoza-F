import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  X, 
  ArrowRight,
  Shield,
  Layers,
  FileText,
  Scale,
  Terminal,
  Brain,
  Cpu,
  Award,
  ChevronDown,
  ChevronUp,
  Radio,
  Send,
  Sparkles,
  Bot,
  User,
  Check,
  RotateCcw
} from 'lucide-react';
import { DoctrinaMilitarDetalle } from './DoctrinaMilitarDetalle';
import { CicloInteligenciaDetalle } from './CicloInteligenciaDetalle';

interface FaseTeoricaDetalleProps {
  onClose?: () => void;
  onEnterModule?: () => void;
}

interface TopicData {
  id: number;
  name: string;
  badge: string;
  icon: string;
  xp: number;
  shortDesc: string;
  content: string;
  initialAiPrompt: string;
}

interface ExamQuestion {
  topic: string;
  q: string;
  options: { t: string; c: boolean }[];
  justification: string;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export function FaseTeoricaDetalle({ onClose, onEnterModule }: FaseTeoricaDetalleProps) {
  // Navigation Mode: 'topics' (Núcleos Temáticos + Copiloto IA), 'lab' (Lab ACH y Doctrina), 'exam' (Examen 10 preguntas)
  const [currentView, setCurrentView] = useState<'topics' | 'lab' | 'exam'>('topics');
  
  // Tab inside Lab
  const [labTab, setLabTab] = useState<number>(0);

  // Accordion state
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    ipb: false,
    heuer: false
  });

  // Topics & XP State
  const initialTopics: Record<number, TopicData> = {
    1: {
      id: 1,
      name: "Doctrina Militar de Inteligencia",
      badge: "NÚCLEO 1 // DOCTRINA",
      icon: "⚔️",
      xp: 40,
      shortDesc: "Principios fundamentales de apoyo al mando, doctrina IPB/IPOE, niveles de inteligencia y orden de batalla.",
      content: `
        <h3 class="text-base font-bold text-[#86efac] mb-2 uppercase font-heading">Fundamentos Doctrinales de Inteligencia de Defensa</h3>
        <p class="mb-3 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">La inteligencia militar proporciona la ventaja cognitiva requerida por el mando para anticipar las intenciones, capacidades y vulnerabilidades del adversario en operaciones multidominio.</p>
        <h4 class="text-xs font-bold text-[#facc15] uppercase font-mono mb-2">Preparación de Inteligencia para el Campo de Batalla (IPB / IPOE):</h4>
        <ol class="space-y-2 text-xs text-[#cbd5e1] pl-4 list-decimal marker:text-[#34d399] marker:font-mono">
          <li><strong class="text-white">Definir el Entorno Operativo:</strong> Determinar límites del área de operaciones, espacio de interés y dominios concurrentes.</li>
          <li><strong class="text-white">Describir los Efectos del Entorno:</strong> Evaluar las características del terreno (análisis OCOKA: Obstáculos, Avenidas de aproximación, Terreno clave, Observación y campos de tiro, Encubrimiento) y clima.</li>
          <li><strong class="text-white">Evaluar la Amenaza:</strong> Modelar el orden de batalla, doctrina, capacidades y centros de gravedad (CoG) del adversario.</li>
          <li><strong class="text-white">Determinar Cursos de Acción (COA):</strong> Estimar el Curso de Acción Más Probable (MLCOA) y el Más Peligroso (MDCOA).</li>
        </ol>
      `,
      initialAiPrompt: "Oficial analista, he cargado el núcleo de Doctrina. Para comprobar su asimilación: en el paso 4 del IPB, ¿por qué es mandatorio para el Estado Mayor formular no solo el Curso de Acción Más Probable (MLCOA) sino también el Más Peligroso (MDCOA)?"
    },
    2: {
      id: 2,
      name: "Metodología de Análisis Estructurado",
      badge: "NÚCLEO 2 // METODOLOGÍA",
      icon: "🧠",
      xp: 50,
      shortDesc: "Técnicas SAT (Richards Heuer), análisis de hipótesis competidoras (ACH), matrices de consistencia y mitigación activa de sesgos.",
      content: `
        <h3 class="text-base font-bold text-[#86efac] mb-2 uppercase font-heading">Técnicas Estructuradas de Análisis (SAT)</h3>
        <p class="mb-3 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">Las técnicas SAT formalizan el razonamiento analítico para mitigar fallos de juicio y superar las limitaciones cognitivas inherentes a la mente humana bajo estrés operacional.</p>
        <h4 class="text-xs font-bold text-[#facc15] uppercase font-mono mb-2">Análisis de Hipótesis Competidoras (ACH de Richards Heuer):</h4>
        <ul class="space-y-2 text-xs text-[#cbd5e1] pl-4 list-disc marker:text-[#34d399]">
          <li><strong class="text-white">Principio de Falsación:</strong> No se busca demostrar la hipótesis preferida, sino identificar qué hipótesis acumula la menor cantidad de evidencias contradictorias o inconsistentes.</li>
          <li><strong class="text-white">Matriz Diagnóstica:</strong> Las evidencias consistentes con todas las opciones no poseen valor discriminativo.</li>
          <li><strong class="text-white">Mitigación Activa de Sesgos (Marco Sirius/LEILA):</strong> Neutralización sistemática del Sesgo de Confirmación, Anclaje temprano, Error de Atribución Fundamental y Sesgo de Proyección.</li>
        </ul>
      `,
      initialAiPrompt: "Analista, consideremos la metodología ACH de Richards Heuer: si recolecta una prueba que es totalmente compatible tanto con la hipótesis de ataque inminente como con la de un simple ejercicio militar, ¿qué valor diagnóstico tiene dicha evidencia?"
    },
    3: {
      id: 3,
      name: "Ciclo de Inteligencia Estratégica",
      badge: "NÚCLEO 3 // CICLO ESTRATÉGICO",
      icon: "🔄",
      xp: 40,
      shortDesc: "Simulador Interactivo CVIE (ECEME Bolivia): Carta Circular Wheel HUD, Triage RPI/ORI, Matriz Gibson y Estimación Sherman Kent.",
      content: `
        <h3 class="text-base font-bold text-[#86efac] mb-2 uppercase font-heading">El Ciclo Cibernético de Inteligencia en 7 Fases</h3>
        <p class="mb-3 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">El ciclo contemporáneo sustituye la secuencialidad estática lineal por un modelo dinámico con bucles de retroalimentación continua para acelerar la toma de decisiones:</p>
        <ul class="space-y-1.5 text-xs text-[#cbd5e1] pl-4 list-disc marker:text-[#34d399]">
          <li><strong class="text-white">1. Dirección y Asignación:</strong> Definición de Requerimientos Prioritarios de Inteligencia (PIR).</li>
          <li><strong class="text-white">2. Búsqueda y Colección:</strong> Explotación sinérgica de sensores OSINT, SIGINT, IMINT/GEOINT y HUMINT.</li>
          <li><strong class="text-white">3. Evaluación:</strong> Calificación de confiabilidad de la fuente y verosimilitud de la información.</li>
          <li><strong class="text-white">4. Colación:</strong> Agrupamiento sistemático y descarte de duplicidades.</li>
          <li><strong class="text-white">5. Análisis:</strong> Integración lógica de indicios fragmentarios.</li>
          <li><strong class="text-white">6. Inferencia:</strong> Formulación de juicios predictivos sustentados probabilísticamente.</li>
          <li><strong class="text-white">7. Difusión y Retroalimentación:</strong> Entrega oportuna al escalón decisor correspondiente.</li>
        </ul>
      `,
      initialAiPrompt: "Atención analista: En la fase de Evaluación del ciclo de inteligencia, si una fuente HUMINT confiable remite un dato que contradice frontalmente a una captura IMINT por radar satelital, ¿cómo debe ponderarse la verosimilitud técnica frente a la fuente humana?"
    },
    4: {
      id: 4,
      name: "Marco Legal y Reglas de Enfrentamiento (ROE)",
      badge: "NÚCLEO 4 // MARCO LEGAL",
      icon: "⚖️",
      xp: 35,
      shortDesc: "Derecho Internacional Humanitario (DIH), marco de gobernanza VAULTIS, directivas de defensa y empleo ético militar de IA.",
      content: `
        <h3 class="text-base font-bold text-[#86efac] mb-2 uppercase font-heading">Marcos Normativos, Reglas de Enfrentamiento y Ética</h3>
        <p class="mb-3 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">Toda actividad de inteligencia militar estratégica debe ejecutarse bajo el respeto irrestricto de las normas jurídicas nacionales e internacionales.</p>
        <h4 class="text-xs font-bold text-[#facc15] uppercase font-mono mb-2">Principios Clave:</h4>
        <ul class="space-y-1.5 text-xs text-[#cbd5e1] pl-4 list-disc marker:text-[#34d399]">
          <li><strong class="text-white">Derecho Internacional Humanitario (DIH):</strong> Principios de distinción, proporcionalidad, necesidad militar y limitación de daños incidentales.</li>
          <li><strong class="text-white">Reglas de Enfrentamiento (ROE):</strong> Directrices que definen las circunstancias y límites bajo los cuales las fuerzas armadas pueden aplicar la fuerza letal o cibernética.</li>
          <li><strong class="text-white">Marco VAULTIS de Datos Militares:</strong> Estándar de defensa que exige datos Visibles, Accesibles, Comprensibles, Enlazados, Confiables, Interoperables y Seguros.</li>
          <li><strong class="text-white">Resoluciones sobre IA Militar Responsable:</strong> Garantía de trazabilidad algorítmica y preservación del juicio humano decisivo (human-in-the-loop).</li>
        </ul>
      `,
      initialAiPrompt: "En el marco de la inteligencia militar y el empleo de algoritmos de targeting asistidos por IA, ¿qué implicancia tiene el principio doctrinario de 'Human-in-the-loop' según los marcos éticos de defensa?"
    }
  };

  const [topics, setTopics] = useState<Record<number, TopicData>>(initialTopics);

  // Modal / Detailed View State for Specific Topic
  const [activeTopicModalId, setActiveTopicModalId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: number]: ChatMessage[] }>({});
  const [aiInputText, setAiInputText] = useState<string>('');

  // ACH Matrix State
  const [achValues, setAchValues] = useState<{ [key: string]: string }>({
    'e1-h1': 'C',
    'e1-h2': 'C',
    'e1-h3': 'C',
    'e2-h1': 'I',
    'e2-h2': 'C',
    'e2-h3': 'I',
    'e3-h1': 'N',
    'e3-h2': 'I',
    'e3-h3': 'C'
  });
  const [achCalculated, setAchCalculated] = useState<boolean>(false);
  const [achInconsistencies, setAchInconsistencies] = useState<number[]>([1, 1, 1]);

  // 10 Exam Questions Banco Oficial
  const examQuestions: ExamQuestion[] = [
    {
      topic: "DOCTRINA",
      q: "1. En el marco del IPB (Preparación de Inteligencia para el Campo de Batalla), ¿cuál es el propósito primordial del Paso 2 (Describir los efectos del entorno)?",
      options: [
        { t: "Establecer la composición y orden de batalla detallado del enemigo.", c: false },
        { t: "Analizar cómo el terreno militar (análisis OCOKA) y las condiciones meteorológicas afectan las operaciones de ambas fuerzas.", c: true },
        { t: "Redactar exclusivamente los requerimientos prioritarios de información del comandante.", c: false }
      ],
      justification: "El Paso 2 del IPB evalúa el terreno militar y el clima para determinar corredores de movilidad y limitaciones operacionales."
    },
    {
      topic: "DOCTRINA",
      q: "2. ¿Qué diferencia sustancial existe entre el Curso de Acción Más Probable (MLCOA) y el Curso de Acción Más Peligroso (MDCOA)?",
      options: [
        { t: "El MLCOA es la opción que mejor responde a la doctrina regular del adversario; el MDCOA es la acción enemiga que causaría el mayor daño a la misión propia.", c: true },
        { t: "El MLCOA concierne a fuerzas terrestres y el MDCOA a ataques cibernéticos y de guerra de información.", c: false },
        { t: "El MLCOA se formula para la defensa y el MDCOA únicamente para operaciones de asalto anfibio.", c: false }
      ],
      justification: "El MLCOA anticipa la respuesta lógica probable del enemigo; el MDCOA contempla su capacidad más letal o catastrófica para nuestras fuerzas."
    },
    {
      topic: "METODOLOGÍA",
      q: "3. De acuerdo con el principio fundamental de Richards Heuer en el Análisis de Hipótesis Competidoras (ACH):",
      options: [
        { t: "El analista debe seleccionar la hipótesis que cuente con más evidencias afirmativas a su favor.", c: false },
        { t: "La hipótesis más viable suele ser aquella que acumula la menor cantidad de indicios que la contradigan (falsación).", c: true },
        { t: "Las hipótesis deben descartarse si no cuentan con el respaldo unánime del personal de analistas del centro de operaciones.", c: false }
      ],
      justification: "Heuer señala que el rigor metodológico radica en rechazar alternativas mediante evidencia disconfirmatoria."
    },
    {
      topic: "METODOLOGÍA",
      q: "4. ¿Cuál de los siguientes fenómenos describe el 'Sesgo de Confirmación' en la producción de inteligencia?",
      options: [
        { t: "Ignorar la influencia de las presiones de contexto en las decisiones del líder enemigo.", c: false },
        { t: "La tendencia a buscar, priorizar y recordar únicamente los reportes que validan la hipótesis previa del analista.", c: true },
        { t: "La sobrestimación de la verosimilitud de una fuente en función de su grado de clasificación de seguridad.", c: false }
      ],
      justification: "El sesgo de confirmación ciega al analista ante indicios discrepantes que refutan su conclusión inicial."
    },
    {
      topic: "METODOLOGÍA",
      q: "5. Si una evidencia recolectada es perfectamente coherente con tres hipótesis distintas, ¿cuál es su valor diagnóstico relativo?",
      options: [
        { t: "Posee un valor diagnóstico crítico porque comprueba que las tres opciones son ciertas.", c: false },
        { t: "Carece de valor diagnóstico discriminativo, ya que no permite refutar ni distinguir ninguna alternativa frente a las demás.", c: true },
        { t: "Debe duplicarse en la matriz para otorgar puntaje equilibrado a todas las hipótesis.", c: false }
      ],
      justification: "Una prueba consistente con todas las alternativas no discrimina cuál es la verdadera."
    },
    {
      topic: "CICLO ESTRATÉGICO",
      q: "6. ¿Cuál es el producto principal que se genera durante la fase de Dirección del ciclo de inteligencia?",
      options: [
        { t: "Los Requerimientos Prioritarios de Inteligencia (PIR) y el Plan de Colección de Búsqueda.", c: true },
        { t: "Los informes de inteligencia ya finalizados (INTSUM) para el mando político.", c: false },
        { t: "La traducción de frecuencias interceptadas por sensores de guerra electrónica (EW).", c: false }
      ],
      justification: "La fase de Dirección fija los PIR del comandante y orienta el despliegue de los sensores de búsqueda."
    },
    {
      topic: "CICLO ESTRATÉGICO",
      q: "7. ¿Por qué el modelo moderno del ciclo de inteligencia incorpora bucles cibernéticos de retroalimentación en todas sus etapas?",
      options: [
        { t: "Para eliminar la necesidad de contar con analistas humanos en las estaciones de trabajo.", c: false },
        { t: "Para permitir la actualización inmediata de requerimientos y acortar el tiempo de respuesta ante situaciones volátiles.", c: true },
        { t: "Para evitar que la inteligencia de fuentes abiertas (OSINT) sea considerada en el análisis militar.", c: false }
      ],
      justification: "Los bucles cibernéticos permiten reenfocar la colección de inmediato sin aguardar a completar un ciclo rígido."
    },
    {
      topic: "MARCO LEGAL",
      q: "8. En el Derecho Internacional Humanitario (DIH), ¿qué exige el Principio de Distinción durante las operaciones militares?",
      options: [
        { t: "Diferenciar en todo momento entre la población civil/bienes protegidos y los combatientes/objetivos militares.", c: true },
        { t: "Asegurar que todas las órdenes de operaciones se redacten bajo formatos criptográficos seguros.", c: false },
        { t: "Separar a las tropas de infantería de los sistemas autónomos armados en el frente de batalla.", c: false }
      ],
      justification: "El principio de distinción prohíbe los ataques indiscriminados y obliga a discriminar blancos legítimos de civiles."
    },
    {
      topic: "MARCO LEGAL",
      q: "9. ¿Qué establece el estándar de gestión de datos militares de defensa VAULTIS?",
      options: [
        { t: "Que los datos deben permanecer en silos herméticos no conectados a redes exteriores.", c: false },
        { t: "Que los datos de la fuerza deben ser Visibles, Accesibles, Comprensibles, Enlazados, Confiables, Interoperables y Seguros.", c: true },
        { t: "Que la información clasificada debe destruirse físicamente cada 24 horas.", c: false }
      ],
      justification: "VAULTIS es el acrónimo doctrinario del DoD para gobernar datos de defensa interoperables y seguros."
    },
    {
      topic: "MARCO LEGAL",
      q: "10. En relación con el empleo de sistemas basados en Inteligencia Artificial en el sector de defensa, ¿qué garantiza el principio de 'Human-in-the-loop'?",
      options: [
        { t: "Que la máquina reemplaza al comandante en la toma de decisiones para maximizar la velocidad computacional.", c: false },
        { t: "Que la supervisión, juicio ético y decisión final sobre el empleo de la fuerza corresponden ineludiblemente a un ser humano.", c: true },
        { t: "Que el personal militar debe programar manualmente el código fuente de los algoritmos en el campo de batalla.", c: false }
      ],
      justification: "Las directivas éticas militares exigen que la responsabilidad legal y ética de la decisión letal recaiga en operadores humanos."
    }
  ];

  // Exam Answers State
  const [examAnswers, setExamAnswers] = useState<{ [key: number]: number }>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number>(0);

  // Calculation of Global Readiness Index (XP)
  const topicList = Object.values(topics) as TopicData[];
  const totalXp = topicList.reduce((acc, curr) => acc + curr.xp, 0);
  const totalXpPct = Math.round((totalXp / 400) * 100);

  const toggleAccordion = (key: string) => {
    setAccordionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenTopic = (id: number) => {
    setActiveTopicModalId(id);
    const t = topics[id];
    
    // Incrementar XP si no está al 100%
    if (t.xp < 100) {
      setTopics(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          xp: Math.min(100, prev[id].xp + 25)
        }
      }));
    }

    // Inicializar chat si está vacío
    if (!chatMessages[id] || chatMessages[id].length === 0) {
      setChatMessages(prev => ({
        ...prev,
        [id]: [
          { sender: 'ai', text: t.initialAiPrompt }
        ]
      }));
    }
  };

  const handleSendAiMessage = () => {
    if (!aiInputText.trim() || activeTopicModalId === null) return;
    const userMsg = aiInputText.trim();
    const topicId = activeTopicModalId;
    setAiInputText('');

    setChatMessages(prev => ({
      ...prev,
      [topicId]: [...(prev[topicId] || []), { sender: 'user', text: userMsg }]
    }));

    // Simular respuesta socrática inteligente
    setTimeout(() => {
      let aiResponseText = "";
      if (topicId === 1) {
        aiResponseText = "Excelente razonamiento. El MDCOA garantiza que la fuerza propia no sea sorprendida por la capacidad de máximo impacto del adversario, incluso si su probabilidad matemática inicial parece secundaria frente a la doctrina estándar (MLCOA). Ha sumado +15 XP adicionales en Doctrina.";
      } else if (topicId === 2) {
        aiResponseText = "Exactamente. Al ser consistente con múltiples hipótesis, su valor diagnóstico discriminativo es nulo. Un error analítico frecuente es coleccionar datos redundantes que confirman todo sin discriminar nada. Ha sumado +15 XP en Rigor Metodológico.";
      } else if (topicId === 3) {
        aiResponseText = "Correcto. En la doctrina de fusión multidominio, los sensores técnicos (como SAR o SIGINT) aportan parámetros físicos verificables, pero deben cruzarse con la intencionalidad que solo HUMINT o el análisis de redes pueden elucidar. Ha ganado +15 XP en Ciclo Cibernético.";
      } else {
        aiResponseText = "Muy preciso. 'Human-in-the-loop' asegura que la máquina procese la niebla de datos, pero la decisión de letalidad y la evaluación del principio de proporcionalidad del DIH recaen siempre sobre la conciencia y responsabilidad legal del comandante militar. Ha ganado +15 XP.";
      }

      setChatMessages(prev => ({
        ...prev,
        [topicId]: [...(prev[topicId] || []), { sender: 'ai', text: aiResponseText }]
      }));

      // Aumentar XP
      setTopics(prev => ({
        ...prev,
        [topicId]: {
          ...prev[topicId],
          xp: Math.min(100, prev[topicId].xp + 15)
        }
      }));
    }, 600);
  };

  const handleAchChange = (id: string, value: string) => {
    setAchValues(prev => ({ ...prev, [id]: value }));
  };

  const calculateACH = () => {
    const rows = [
      ['e1-h1', 'e1-h2', 'e1-h3'],
      ['e2-h1', 'e2-h2', 'e2-h3'],
      ['e3-h1', 'e3-h2', 'e3-h3']
    ];

    const counts = [0, 0, 0];
    rows.forEach(row => {
      row.forEach((id, hIdx) => {
        if (achValues[id] === 'I') {
          counts[hIdx]++;
        }
      });
    });

    setAchInconsistencies(counts);
    setAchCalculated(true);
  };

  const handleExamOptionSelect = (qIdx: number, oIdx: number) => {
    setExamAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleEvaluateExam = () => {
    let score = 0;
    examQuestions.forEach((q, idx) => {
      const selected = examAnswers[idx];
      if (selected !== undefined && q.options[selected].c) {
        score++;
      }
    });

    setExamScore(score);
    setExamSubmitted(true);
  };

  const handleResetExam = () => {
    setExamAnswers({});
    setExamSubmitted(false);
    setExamScore(0);
  };

  const activeModalTopic = activeTopicModalId !== null ? topics[activeTopicModalId] : null;

  return (
    <div 
      id="fase-teorica-modal-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[#010906]/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      {/* Contenedor Principal con Glassmorphism Táctico y Alto Contraste */}
      <div 
        id="fase-teorica-container"
        className="relative w-full max-w-6xl bg-[#04140e]/98 border border-[#10b981] rounded-xs shadow-[0_0_50px_rgba(16,185,129,0.22),0_30px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden my-auto flex flex-col max-h-[94vh]"
      >
        {/* Fondo táctico sutil */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.09] filter contrast-125 brightness-90 saturate-75 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/d/1I-XgzjvWN9FfXODs2Iy-rmXWk2G7ZidZ'), url('https://drive.google.com/thumbnail?id=1I-XgzjvWN9FfXODs2Iy-rmXWk2G7ZidZ&sz=w1600')`
          }}
        />

        {/* Retícula militar en las 4 esquinas */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#34d399] z-30" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#34d399] z-30" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#34d399] z-30" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#34d399] z-30" />

        {/* 1. Header Bar Táctico */}
        <header className="relative z-20 bg-[#020e09] border-b border-[#143e2b] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 pr-6 sm:pr-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-[#0b291d] text-[#34d399] border border-[#1e6141] font-mono text-[10px] font-bold rounded-2xs tracking-widest uppercase">
                CVIE • INTELLIGENCE SUITE
              </span>
              <span className="text-[11px] font-mono text-[#52826e]">| FASE I: SOPORTE TEÓRICO</span>
            </div>
            <h1 className="font-heading text-lg sm:text-2xl font-bold uppercase tracking-wider text-white leading-tight">
              NIVELACIÓN DOCTRINARIA Y METODOLÓGICA AVANZADA
            </h1>
            <p className="font-sans text-xs text-[#9ebcb0] hidden sm:block">
              Fundamentos de Inteligencia Estratégica, Metodologías SAT y Marcos de Decisión Militar
            </p>
          </div>

          {/* Indicador de Conocimiento / Readiness Index (XP) */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="min-w-[210px] sm:min-w-[240px] bg-[#051a12] p-2.5 rounded-xs border border-[#164b33]">
              <div className="flex justify-between text-[10px] font-mono mb-1 text-[#6e9b86]">
                <span>ÍNDICE DE MADUREZ COGNITIVA (XP)</span>
                <span className="font-bold text-[#86efac]">{totalXp} / 400 XP ({totalXpPct}%)</span>
              </div>
              <div className="w-full bg-[#020a06] h-2.5 rounded-full overflow-hidden border border-[#143c29]">
                <div 
                  className="h-full bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] rounded-full transition-all duration-400 shadow-[0_0_10px_rgba(52,211,153,0.55)]"
                  style={{ width: `${totalXpPct}%` }}
                />
              </div>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana de instrucción"
                className="p-2 text-[#729e8b] hover:text-[#86efac] hover:bg-[#072418] border border-[#133c2a] hover:border-[#34d399] rounded-xs transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* 2. Pestañas de Vista General */}
        <nav className="relative z-20 flex bg-[#03110b] border-b border-[#143e2b] overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setCurrentView('topics')}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
              currentView === 'topics'
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'bg-transparent border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#34d399]" />
            <span>Núcleos Temáticos (Tarjetas de Ingreso + IA)</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('lab')}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
              currentView === 'lab'
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'bg-transparent border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <Cpu className="w-4 h-4 text-[#34d399]" />
            <span>Taller Práctico (Lab ACH & Falsación)</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('exam')}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
              currentView === 'exam'
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'bg-transparent border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <Award className="w-4 h-4 text-[#34d399]" />
            <span>Examen Formal de Nivelación (10 Reactivos)</span>
          </button>
        </nav>

        {/* 3. Área de Contenido Principal */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 text-[#d1ded9]">
          
          {/* ========================================================================= */}
          {/* VISTA 1: NÚCLEOS TEMÁTICOS (CUADRÍCULA DE TARJETAS + COPILOTO IA)        */}
          {/* ========================================================================= */}
          {currentView === 'topics' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 border-l-4 border-[#34d399] pl-3 mb-1.5">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                    NÚCLEOS DE INSTRUCCIÓN ESTRATÉGICA
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#9ebcb0] leading-relaxed">
                  Haga clic en cualquiera de las tarjetas para ingresar al contenido doctrinal, acumular horas de instrucción (XP) y someterse a las preguntas del tutor socrático con Inteligencia Artificial.
                </p>
              </div>

              {/* Cuadrícula de 4 Tarjetas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                {topicList.map((topic) => {
                  const isCompleted = topic.xp >= 100;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => handleOpenTopic(topic.id)}
                      className={`p-5 rounded-xs border transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm ${
                        isCompleted
                          ? 'bg-[#062016] border-[#34d399] shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                          : 'bg-[#061e14]/90 border-[#143e2b] hover:border-[#34d399] hover:bg-[#092c1d] hover:shadow-[0_0_15px_rgba(52,211,153,0.18)]'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="text-2xl filter drop-shadow">{topic.icon}</span>
                          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-2xs border uppercase ${
                            isCompleted 
                              ? 'bg-[#0f3d2a] border-[#34d399] text-[#86efac]'
                              : 'bg-[#082218] border-[#184e36] text-[#7aa492]'
                          }`}>
                            {topic.xp}% DOMINIO
                          </span>
                        </div>

                        <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-[#86efac] transition-colors uppercase tracking-wide mb-1.5">
                          {topic.name}
                        </h3>

                        <p className="text-xs text-[#9ebcb0] leading-relaxed mb-4">
                          {topic.shortDesc}
                        </p>
                      </div>

                      <div>
                        <div className="w-full bg-[#020a06] h-1.5 rounded-full overflow-hidden border border-[#143c29] mb-2">
                          <div 
                            className="h-full bg-[#34d399] rounded-full transition-all duration-300"
                            style={{ width: `${topic.xp}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#6e9b86]">Progreso: <strong className="text-white">{topic.xp}</strong>/100 XP</span>
                          <span className="text-[#34d399] group-hover:translate-x-1 transition-transform font-bold inline-flex items-center gap-1">
                            INGRESAR →
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Banner Informativo */}
              <div className="p-4 bg-[#072418] border border-[#1b5d3d] rounded-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#facc15] shrink-0" />
                  <p className="text-xs text-[#cbd5e1]">
                    Alcanzar los <strong>400 XP</strong> en los núcleos temáticos desbloquea la acreditación de excelencia en el expediente del oficial.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentView('exam')}
                  className="px-4 py-2 bg-[#0e3b26] hover:bg-[#155437] border border-[#207a4a] text-[#86efac] hover:text-white font-heading text-xs uppercase tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer"
                >
                  IR AL EXAMEN (10 REACTIVOS) →
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VISTA 2: TALLER PRÁCTICO (LAB ACH & FALSACIÓN POCTERIAL HEUER)           */}
          {/* ========================================================================= */}
          {currentView === 'lab' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 border-l-4 border-[#34d399] pl-3 mb-1.5">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                    TALLER PRÁCTICO: MATRIZ DE ANÁLISIS DE HIPÓTESIS COMPETIDORAS (ACH)
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#9ebcb0] leading-relaxed">
                  <strong>Ejercicio de Aplicación:</strong> Asigne la consistencia de cada indicio observado respecto a las 3 hipótesis operacionales. Observe cómo el motor calcula el índice de refutación (inconsistencias).
                </p>
              </div>

              {/* Escenario Táctico */}
              <div className="p-4 bg-[#082218] border-l-4 border-[#facc15] border-y border-r border-[#1a553b] rounded-xs space-y-1.5">
                <p className="text-xs sm:text-sm font-bold text-white">
                  Escenario Táctico: Se detecta un incremento inusual de tráfico de radio cifrado y movimiento logístico nocturno de vehículos de transporte en el Sector Fronterizo Norte.
                </p>
                <p className="text-xs font-mono text-[#cbd5e1]">
                  <strong className="text-[#facc15]">H1:</strong> Ejercicio de adiestramiento no programado | 
                  <strong className="text-[#38bdf8] ml-2">H2:</strong> Preparación para una incursión militar de zona gris | 
                  <strong className="text-[#f87171] ml-2">H3:</strong> Maniobra de engaño militar táctico (finta)
                </p>
              </div>

              {/* Tabla ACH Interactiva */}
              <div className="overflow-x-auto border border-[#164a33] rounded-xs shadow-md">
                <table className="w-full border-collapse text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-[#072418] text-[#34d399] border-b border-[#164a33]">
                      <th className="p-3 w-[40%] font-heading text-sm uppercase">Indicio / Evidencia Recolectada</th>
                      <th className="p-3 w-[15%] text-center uppercase">Diagnóstico</th>
                      <th className="p-3 w-[15%] text-center text-[#facc15] uppercase">H1: Ejercicio</th>
                      <th className="p-3 w-[15%] text-center text-[#38bdf8] uppercase">H2: Incursión</th>
                      <th className="p-3 w-[15%] text-center text-[#f87171] uppercase">H3: Engaño</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#133c29] bg-[#04160e]">
                    {/* Fila 1 */}
                    <tr className="hover:bg-[#072115] transition-colors">
                      <td className="p-3 text-[#d1ded9] font-sans">
                        <strong className="text-[#34d399] font-mono">E1:</strong> Silencio de radio en puestos de mando de artillería pesada.
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 bg-[#261d06] text-[#facc15] border border-[#78590c] text-[10px] rounded-2xs font-bold uppercase">
                          MEDIO
                        </span>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e1-h1']}
                          onChange={(e) => handleAchChange('e1-h1', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e1-h2']}
                          onChange={(e) => handleAchChange('e1-h2', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e1-h3']}
                          onChange={(e) => handleAchChange('e1-h3', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                    </tr>

                    {/* Fila 2 */}
                    <tr className="hover:bg-[#072115] transition-colors">
                      <td className="p-3 text-[#d1ded9] font-sans">
                        <strong className="text-[#34d399] font-mono">E2:</strong> Despliegue de hospitales de campaña y reservas de sangre en vanguardia.
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 bg-[#2e0c0c] text-[#f87171] border border-[#7f1d1d] text-[10px] rounded-2xs font-bold uppercase">
                          ALTO
                        </span>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e2-h1']}
                          onChange={(e) => handleAchChange('e2-h1', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e2-h2']}
                          onChange={(e) => handleAchChange('e2-h2', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e2-h3']}
                          onChange={(e) => handleAchChange('e2-h3', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                    </tr>

                    {/* Fila 3 */}
                    <tr className="hover:bg-[#072115] transition-colors">
                      <td className="p-3 text-[#d1ded9] font-sans">
                        <strong className="text-[#34d399] font-mono">E3:</strong> Publicaciones en redes sociales sobre trenes de munición visibles de día.
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 bg-[#061d15] text-[#34d399] border border-[#1e6141] text-[10px] rounded-2xs font-bold uppercase">
                          BAJO
                        </span>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e3-h1']}
                          onChange={(e) => handleAchChange('e3-h1', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e3-h2']}
                          onChange={(e) => handleAchChange('e3-h2', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          value={achValues['e3-h3']}
                          onChange={(e) => handleAchChange('e3-h3', e.target.value)}
                          className="w-full bg-[#020b07] border border-[#1a553b] text-[#d1ded9] rounded-2xs px-2 py-1 text-xs outline-none focus:border-[#34d399]"
                        >
                          <option value="C">Consistente (C)</option>
                          <option value="I">Inconsistente (I)</option>
                          <option value="N">Neutro (N)</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Botón de Cálculo ACH y Resultados */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#072418] border border-[#185338] rounded-xs">
                <button
                  type="button"
                  onClick={calculateACH}
                  className="py-3 px-5 bg-[#14422e] hover:bg-[#1d5c41] border border-[#2b7e56] text-[#86efac] hover:text-white font-heading text-sm font-bold uppercase tracking-wider rounded-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#000]"
                >
                  <Cpu className="w-4 h-4 text-[#34d399]" />
                  <span>EJECUTAR ALGORITMO DE REFUTACIÓN HEUER</span>
                </button>

                {achCalculated && (
                  <div className="font-mono text-xs text-[#cbd5e1] bg-[#030e09] p-3 rounded-xs border border-[#194c34] flex-1">
                    <div className="flex items-center justify-between pb-1 border-b border-[#143c2a] mb-1.5">
                      <span>Inconsistencias Totales:</span>
                      <div className="flex gap-3">
                        <span className="text-[#facc15] font-bold">H1: {achInconsistencies[0]}</span>
                        <span className="text-[#38bdf8] font-bold">H2: {achInconsistencies[1]}</span>
                        <span className="text-[#f87171] font-bold">H3: {achInconsistencies[2]}</span>
                      </div>
                    </div>
                    <div>
                      <strong className="text-[#34d399]">Diagnóstico Heuer: </strong>
                      La hipótesis con menor refutación es{' '}
                      <span className="text-white font-bold underline">
                        {`H${achInconsistencies.indexOf(Math.min(...achInconsistencies)) + 1}`}
                      </span>{' '}
                      (Mayor viabilidad lógica relativa y menor inconsistencia empírica).
                    </div>
                  </div>
                )}
              </div>

              {/* Acordeón: Principio de Heuer */}
              <div className="border border-[#184e36] rounded-xs overflow-hidden bg-[#051c13]">
                <button
                  type="button"
                  onClick={() => toggleAccordion('heuer')}
                  className="w-full p-4 flex items-center justify-between bg-[#072418] hover:bg-[#0b3323] transition-colors text-left cursor-pointer"
                >
                  <span className="font-heading text-sm sm:text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#34d399]" />
                    El Principio Fundamental de Richards Heuer: Refutación vs. Confirmación
                  </span>
                  {accordionOpen['heuer'] ? (
                    <ChevronUp className="w-5 h-5 text-[#34d399]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#34d399]" />
                  )}
                </button>

                {accordionOpen['heuer'] && (
                  <div className="p-4 sm:p-5 border-t border-[#164a33] text-xs text-[#cbd5e1] space-y-3 bg-[#04170f] leading-relaxed animate-fadeIn">
                    <p>
                      En su obra <em>Psychology of Intelligence Analysis</em>, Richards Heuer demostró que el error más común del analista es buscar evidencia para <strong>demostrar</strong> una hipótesis preferida.
                    </p>
                    <p className="p-3 bg-[#092a1c] border border-[#207a4a] rounded-xs text-[#86efac] font-mono text-[11px]">
                      &quot;La metodología rigurosa exige lo opuesto: la hipótesis más probable suele ser aquella que tiene menor cantidad de indicios que la contradigan (falsación popperiana). Las evidencias consistentes con todas las hipótesis carecen de valor diagnóstico discriminativo.&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VISTA 3: EXAMEN FORMAL DE NIVELACIÓN DOCTRINARIA (10 REACTIVOS)          */}
          {/* ========================================================================= */}
          {currentView === 'exam' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 border-l-4 border-[#34d399] pl-3 mb-1.5">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                    EVALUACIÓN RIGUROSA DE CERTIFICACIÓN DOCTRINARIA (10 REACTIVOS)
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#9ebcb0] leading-relaxed">
                  Para acreditar la Fase I e ingresar a los simuladores de toma de decisiones tácticas de la Fase II se requiere un mínimo de <strong className="text-[#86efac]">8/10 (80%)</strong>.
                </p>
              </div>

              {/* 10 Preguntas */}
              <div className="space-y-4">
                {examQuestions.map((qObj, qIdx) => {
                  const selectedOpt = examAnswers[qIdx];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = isAnswered && qObj.options[selectedOpt].c;

                  return (
                    <div key={qIdx} className="p-4 sm:p-5 bg-[#061e14] border border-[#164b33] rounded-xs space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-sans text-xs sm:text-sm font-bold text-white leading-relaxed">
                          {qObj.q}
                        </p>
                        <span className="px-2 py-0.5 bg-[#0a2f20] text-[#34d399] border border-[#1f6844] text-[10px] font-mono rounded-2xs font-bold shrink-0">
                          {qObj.topic}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        {qObj.options.map((opt, oIdx) => (
                          <label 
                            key={oIdx}
                            className={`flex items-start gap-3 p-3 rounded-xs border transition-colors cursor-pointer ${
                              selectedOpt === oIdx 
                                ? 'bg-[#092e1e] border-[#34d399] text-white' 
                                : 'bg-[#030e09] border-[#133d2a] text-[#cbd5e1] hover:border-[#226343]'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question_${qIdx}`}
                              value={oIdx}
                              checked={selectedOpt === oIdx}
                              onChange={() => handleExamOptionSelect(qIdx, oIdx)}
                              className="mt-0.5 accent-[#34d399]"
                            />
                            <span>{opt.t}</span>
                          </label>
                        ))}
                      </div>

                      {examSubmitted && (
                        <div className={`p-3 rounded-xs text-xs font-mono border animate-fadeIn ${
                          isCorrect
                            ? 'bg-[#0b3323] border-[#227a4d] text-[#86efac]'
                            : 'bg-[#310e0e] border-[#7d1f1f] text-[#fca5a5]'
                        }`}>
                          <strong>{isCorrect ? '✓ Acierto: ' : '✗ Fallo: '}</strong>
                          {qObj.justification}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Botón de Calificación */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleEvaluateExam}
                  className="w-full py-3.5 px-6 bg-[#0e3b26] hover:bg-[#155437] border border-[#207a4a] hover:border-[#34d399] text-white font-heading text-sm sm:text-base font-bold uppercase tracking-widest rounded-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(52,211,153,0.35)] cursor-pointer group"
                >
                  <Award className="w-5 h-5 text-[#34d399] group-hover:scale-110 transition-transform" />
                  <span>CALIFICAR Y VALIDAR COMPETENCIA DOCTRINARIA</span>
                </button>
              </div>

              {/* Resultados Oficiales del Examen */}
              {examSubmitted && (
                <div className="p-6 bg-[#03110a] border-2 border-[#164a33] rounded-xs text-center space-y-4 animate-fadeIn">
                  <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
                    RESULTADOS DE LA EVALUACIÓN OFICIAL
                  </h3>

                  <div className={`text-4xl sm:text-5xl font-mono font-bold ${
                    (examScore / 10) >= 0.8 ? 'text-[#34d399]' : 'text-[#f87171]'
                  }`}>
                    {Math.round((examScore / 10) * 100)}% ({examScore} / 10)
                  </div>

                  <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-lg mx-auto leading-relaxed">
                    {(examScore / 10) >= 0.8
                      ? 'APROBADO CON ESTÁNDAR MILITAR DE EXCELENCIA. Ha demostrado competencia y alineamiento doctrinario en las 4 dimensiones teóricas.'
                      : 'NO APTO. No ha alcanzado el umbral mandatorio del 80% (mínimo 8 respuestas correctas). Revise los núcleos temáticos antes de reintentar.'}
                  </p>

                  <div className="inline-block">
                    <span className={`px-4 py-2 rounded-xs font-mono text-xs font-bold uppercase tracking-wider border ${
                      (examScore / 10) >= 0.8
                        ? 'bg-[#06291b] border-[#34d399] text-[#86efac]'
                        : 'bg-[#290808] border-[#ef4444] text-[#fca5a5]'
                    }`}>
                      {(examScore / 10) >= 0.8 
                        ? 'HABILITADO PARA ACCESO A SIMULADORES OPERATIVOS FASE II' 
                        : 'ESTADO: RETENCIÓN TEMPORAL DE CERTIFICACIÓN'}
                    </span>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetExam}
                      className="py-2.5 px-5 bg-[#061d15] hover:bg-[#0c2f21] border border-[#164a33] text-[#cbd5e1] hover:text-white font-heading text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>REINICIAR EXAMEN</span>
                    </button>
                    {(examScore / 10) >= 0.8 && onEnterModule && (
                      <button
                        type="button"
                        onClick={onEnterModule}
                        className="py-2.5 px-6 bg-[#0e3b26] hover:bg-[#155437] border border-[#34d399] text-white font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <span>AVANZAR A FASE II</span>
                        <ArrowRight className="w-4 h-4 text-[#34d399]" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* MODAL ESPECIALIZADO: NÚCLEO 1 DOCTRINA MILITAR DE INTELIGENCIA           */}
        {/* ========================================================================= */}
        {activeTopicModalId === 1 && (
          <DoctrinaMilitarDetalle
            initialXp={topics[1]?.xp || 40}
            onClose={() => setActiveTopicModalId(null)}
            onUpdateXp={(newXp) => {
              setTopics(prev => ({
                ...prev,
                1: { ...prev[1], xp: newXp }
              }));
            }}
          />
        )}

        {/* ========================================================================= */}
        {/* MODAL ESPECIALIZADO: NÚCLEO 3 CICLO DE INTELIGENCIA ESTRATÉGICA (CVIE)    */}
        {/* ========================================================================= */}
        {activeTopicModalId === 3 && (
          <CicloInteligenciaDetalle
            initialXp={topics[3]?.xp || 40}
            onClose={() => setActiveTopicModalId(null)}
            onUpdateXp={(newXp) => {
              setTopics(prev => ({
                ...prev,
                3: { ...prev[3], xp: newXp }
              }));
            }}
          />
        )}

        {/* ========================================================================= */}
        {/* MODAL DE DETALLE DE OTROS NÚCLEOS TEMÁTICOS (2, 4)                        */}
        {/* ========================================================================= */}
        {activeTopicModalId !== null && activeTopicModalId !== 1 && activeTopicModalId !== 3 && activeModalTopic && (
          <div 
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveTopicModalId(null);
            }}
            className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-[#020b07]/90 backdrop-blur-md animate-fadeIn"
          >
            <div className="relative w-full max-w-4xl bg-[#04140e] border border-[#10b981] rounded-xs shadow-[0_0_40px_rgba(16,185,129,0.3),0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[88vh]">
              
              {/* Header Modal */}
              <div className="bg-[#030e09] border-b border-[#143e2b] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 bg-[#0a2c1d] text-[#34d399] border border-[#1d6342] text-[10px] font-mono font-bold rounded-2xs uppercase">
                    {activeModalTopic.badge}
                  </span>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                    {activeModalTopic.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTopicModalId(null)}
                  className="p-1 text-[#6e9b86] hover:text-white rounded-xs transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body: 2 Columnas (Contenido Doctrinal a la Izquierda / Copiloto IA a la Derecha) */}
              <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto">
                
                {/* Lado Izquierdo: Contenido Doctrinal */}
                <div className="lg:col-span-7 space-y-4 text-justify">
                  <div 
                    className="p-4 bg-[#061e14] border border-[#164a33] rounded-xs"
                    dangerouslySetInnerHTML={{ __html: activeModalTopic.content }}
                  />
                  <div className="flex items-center justify-between text-xs font-mono text-[#6e9b86] p-2 bg-[#020a06] rounded-xs border border-[#143c29]">
                    <span>ESTADO DE ASIMILACIÓN:</span>
                    <span className="font-bold text-[#86efac]">{activeModalTopic.xp}/100 XP</span>
                  </div>
                </div>

                {/* Lado Derecho: Tutor Socrático IA */}
                <div className="lg:col-span-5 flex flex-col bg-[#061a12] border border-[#164a33] rounded-xs p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#143c29] text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-[#34d399] font-bold">
                      <Bot className="w-4 h-4" />
                      <span>COPILOTO SOCRÁTICO IA</span>
                    </div>
                    <span className="text-[#86efac] text-[10px] bg-[#092a1c] px-2 py-0.5 rounded-2xs border border-[#195236]">ONLINE</span>
                  </div>

                  {/* Chat Message List */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[220px] text-xs font-sans p-1">
                    {(chatMessages[activeModalTopic.id] || []).map((msg, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-2.5 rounded-xs leading-relaxed text-xs ${
                          msg.sender === 'ai'
                            ? 'bg-[#08281a] border-l-2 border-[#34d399] text-[#cbd5e1]'
                            : 'bg-[#14422e] text-white self-end ml-4'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  {/* Input Chat */}
                  <div className="pt-2 border-t border-[#143c29] flex gap-2">
                    <input
                      type="text"
                      value={aiInputText}
                      onChange={(e) => setAiInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendAiMessage();
                      }}
                      placeholder="Escriba su respuesta doctrinal..."
                      className="flex-1 bg-[#020b07] border border-[#1a553b] text-white rounded-2xs px-2.5 py-1.5 text-xs outline-none focus:border-[#34d399]"
                    />
                    <button
                      type="button"
                      onClick={handleSendAiMessage}
                      className="p-2 bg-[#0e3b26] hover:bg-[#155437] text-white border border-[#207a4a] rounded-2xs transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Footer Modal */}
              <div className="bg-[#030e09] border-t border-[#143e2b] px-4 py-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTopicModalId(null)}
                  className="py-2 px-5 bg-[#0e3b26] hover:bg-[#155437] border border-[#34d399] text-white font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  REGISTRAR ASIMILACIÓN Y VOLVER
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
