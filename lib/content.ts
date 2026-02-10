export type LangContent = {
  lang: "en" | "pt"
  nav: {
    logo: string
    howItWorks: string
    test: string
    langSwitch: string
    langSwitchHref: string
  }
  hero: {
    headline: string
    subheadline: string
    cta: string
  }
  problem: {
    sectionLabel: string
    headline: string
    points: { title: string; description: string }[]
  }
  howItWorks: {
    sectionLabel: string
    headline: string
    steps: { step: string; title: string; description: string }[]
    signals: {
      title: string
      items: { label: string; color: string; description: string }[]
    }
  }
  form: {
    sectionLabel: string
    headline: string
    subheadline: string
    websiteLabel: string
    websitePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    cta: string
    disclaimer: string
    submitting: string
    successTitle: string
    successMessage: string
  }
  receive: {
    sectionLabel: string
    headline: string
    items: { title: string; description: string }[]
  }
  audit: {
    sectionLabel: string
    headline: string
    subheadline: string
    features: string[]
    cta: string
  }
  finalCta: {
    headline: string
    subheadline: string
    cta: string
  }
  footer: {
    disclaimer: string
    rights: string
  }
}

export const en: LangContent = {
  lang: "en",
  nav: {
    logo: "AI Visibility",
    howItWorks: "How it works",
    test: "Run free test",
    langSwitch: "Portugues",
    langSwitchHref: "/pt",
  },
  hero: {
    headline: "Is your business visible to AI?",
    subheadline:
      "Run a quick test to see if ChatGPT and AI-powered search tools understand and can recommend your website.",
    cta: "Run a free AI Visibility Test",
  },
  problem: {
    sectionLabel: "The shift is happening",
    headline: "Your customers are asking AI instead of searching Google",
    points: [
      {
        title: "People ask AI for answers",
        description:
          "Millions of people now use AI assistants like ChatGPT and AI-powered search to find products, services, and businesses.",
      },
      {
        title: "AI decides who gets recommended",
        description:
          "AI tools choose which businesses to mention in their answers. If your website isn't structured for AI understanding, you won't be among them.",
      },
      {
        title: "Most websites aren't ready",
        description:
          "The majority of business websites were built for traditional search. They lack the structure AI needs to understand and recommend them.",
      },
      {
        title: "Invisible businesses lose customers",
        description:
          "If AI can't clearly understand what your business does, you're invisible in AI-generated answers \u2014 and losing potential customers every day.",
      },
    ],
  },
  howItWorks: {
    sectionLabel: "How it works",
    headline: "Three simple steps to check your AI visibility",
    steps: [
      {
        step: "01",
        title: "Enter your website",
        description:
          "Type your website URL or business name. No login or credit card required.",
      },
      {
        step: "02",
        title: "AI analyzes your presence",
        description:
          "Our system checks how clearly your business is understood by AI tools.",
      },
      {
        step: "03",
        title: "Get your visibility signal",
        description:
          "Receive a clear result showing how well AI can interpret and recommend your business.",
      },
    ],
    signals: {
      title: "Your result will be one of:",
      items: [
        {
          label: "CLEAR",
          color: "emerald",
          description: "AI understands your business well",
        },
        {
          label: "PARTIAL",
          color: "amber",
          description: "AI has an incomplete picture",
        },
        {
          label: "NOT CLEAR",
          color: "red",
          description: "AI struggles to understand your business",
        },
      ],
    },
  },
  form: {
    sectionLabel: "AI Visibility Test",
    headline: "Test your AI visibility now",
    subheadline: "Free. Fast. No commitment.",
    websiteLabel: "Website or Business Name",
    websitePlaceholder: "e.g. www.yourbusiness.com",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    cta: "Run Test",
    disclaimer:
      "This test provides an indicative signal based on AI interpretation. It does not guarantee ranking or placement in AI-generated responses.",
    submitting: "Analyzing...",
    successTitle: "Test submitted!",
    successMessage:
      "We're analyzing your AI visibility. You'll receive your results by email shortly.",
  },
  receive: {
    sectionLabel: "What you'll receive",
    headline: "A clear picture of your AI visibility",
    items: [
      {
        title: "Your AI visibility result",
        description:
          "A simple, clear signal showing whether AI tools can understand and recommend your business.",
      },
      {
        title: "What's missing",
        description:
          "A brief explanation of the key factors affecting your visibility in AI-generated answers.",
      },
      {
        title: "Clear next steps",
        description:
          "Actionable guidance on what you can do to improve your presence in AI-powered search.",
      },
    ],
  },
  audit: {
    sectionLabel: "Go deeper",
    headline: "Free AI Visibility Audit",
    subheadline:
      "Want a more detailed analysis? Our free audit goes deeper than the test to give you a comprehensive view of your AI presence.",
    features: [
      "Detailed AI interpretation analysis",
      "Competitive visibility comparison",
      "Personalized improvement roadmap",
      "No technical knowledge required",
      "No commitment or obligation",
    ],
    cta: "Request a free audit",
  },
  finalCta: {
    headline: "AI is already influencing your customers' decisions",
    subheadline: "Make sure your business is part of the answer.",
    cta: "Run a free AI Visibility Test",
  },
  footer: {
    disclaimer:
      "AI Visibility Test provides indicative signals based on AI interpretation. Results do not guarantee placement in AI-generated responses.",
    rights: "All rights reserved.",
  },
}

export const pt: LangContent = {
  lang: "pt",
  nav: {
    logo: "AI Visibility",
    howItWorks: "Como funciona",
    test: "Teste gratuito",
    langSwitch: "English",
    langSwitchHref: "/en",
  },
  hero: {
    headline: "Sua empresa e visivel para a inteligencia artificial?",
    subheadline:
      "Faca um teste rapido para descobrir se o ChatGPT e ferramentas de busca com IA entendem e recomendam o seu site.",
    cta: "Faca o teste gratuito de visibilidade IA",
  },
  problem: {
    sectionLabel: "A mudanca ja comecou",
    headline:
      "Seus clientes estao perguntando para a IA em vez de pesquisar no Google",
    points: [
      {
        title: "As pessoas perguntam para a IA",
        description:
          "Milhoes de pessoas ja usam assistentes como ChatGPT e buscas com IA para encontrar produtos, servicos e empresas.",
      },
      {
        title: "A IA decide quem e recomendado",
        description:
          "As ferramentas de IA escolhem quais empresas mencionar nas respostas. Se seu site nao esta preparado, voce fica de fora.",
      },
      {
        title: "A maioria dos sites nao esta pronta",
        description:
          "Grande parte dos sites foi criada para o Google tradicional. Eles nao tem a estrutura que a IA precisa para entender e recomendar.",
      },
      {
        title: "Empresas invisiveis perdem clientes",
        description:
          "Se a IA nao consegue entender claramente o que sua empresa faz, voce e invisivel nas respostas geradas por IA \u2014 e perde clientes todos os dias.",
      },
    ],
  },
  howItWorks: {
    sectionLabel: "Como funciona",
    headline: "Tres passos simples para verificar sua visibilidade na IA",
    steps: [
      {
        step: "01",
        title: "Digite seu site",
        description:
          "Informe o endereco do seu site ou o nome da empresa. Sem cadastro, sem cartao de credito.",
      },
      {
        step: "02",
        title: "A IA analisa sua presenca",
        description:
          "Nosso sistema verifica o quao claramente sua empresa e compreendida pelas ferramentas de IA.",
      },
      {
        step: "03",
        title: "Receba seu resultado",
        description:
          "Veja um resultado claro mostrando como a IA interpreta e recomenda sua empresa.",
      },
    ],
    signals: {
      title: "Seu resultado sera um dos seguintes:",
      items: [
        {
          label: "CLARO",
          color: "emerald",
          description: "A IA entende bem sua empresa",
        },
        {
          label: "PARCIAL",
          color: "amber",
          description: "A IA tem uma visao incompleta",
        },
        {
          label: "NAO CLARO",
          color: "red",
          description: "A IA tem dificuldade em entender sua empresa",
        },
      ],
    },
  },
  form: {
    sectionLabel: "Teste de Visibilidade IA",
    headline: "Teste sua visibilidade na IA agora",
    subheadline: "Gratuito. Rapido. Sem compromisso.",
    websiteLabel: "Site ou Nome da Empresa",
    websitePlaceholder: "ex: www.suaempresa.com.br",
    emailLabel: "Email",
    emailPlaceholder: "voce@empresa.com.br",
    cta: "Executar Teste",
    disclaimer:
      "Este teste fornece um sinal indicativo baseado na interpretacao da IA. Nao garante posicionamento ou presenca em respostas geradas por inteligencia artificial.",
    submitting: "Analisando...",
    successTitle: "Teste enviado!",
    successMessage:
      "Estamos analisando sua visibilidade na IA. Voce recebera os resultados por email em breve.",
  },
  receive: {
    sectionLabel: "O que voce recebe",
    headline: "Uma visao clara da sua visibilidade na IA",
    items: [
      {
        title: "Seu resultado de visibilidade",
        description:
          "Um sinal simples e claro mostrando se as ferramentas de IA conseguem entender e recomendar sua empresa.",
      },
      {
        title: "O que esta faltando",
        description:
          "Uma explicacao objetiva dos fatores que afetam sua visibilidade nas respostas geradas por IA.",
      },
      {
        title: "Proximos passos claros",
        description:
          "Orientacoes praticas sobre o que voce pode fazer para melhorar sua presenca nas buscas com IA.",
      },
    ],
  },
  audit: {
    sectionLabel: "Va mais fundo",
    headline: "Auditoria gratuita de visibilidade IA",
    subheadline:
      "Quer uma analise mais detalhada? Nossa auditoria gratuita vai alem do teste e oferece uma visao completa da sua presenca na IA.",
    features: [
      "Analise detalhada da interpretacao pela IA",
      "Comparacao de visibilidade com concorrentes",
      "Roteiro personalizado de melhorias",
      "Nenhum conhecimento tecnico necessario",
      "Sem compromisso ou obrigacao",
    ],
    cta: "Solicitar auditoria gratuita",
  },
  finalCta: {
    headline: "A IA ja esta influenciando as decisoes dos seus clientes",
    subheadline: "Garanta que sua empresa faca parte da resposta.",
    cta: "Faca o teste gratuito de visibilidade IA",
  },
  footer: {
    disclaimer:
      "O Teste de Visibilidade IA fornece sinais indicativos baseados na interpretacao da IA. Os resultados nao garantem presenca em respostas geradas por inteligencia artificial.",
    rights: "Todos os direitos reservados.",
  },
}
