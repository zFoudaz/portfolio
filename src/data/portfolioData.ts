import {
  TopicOption,
  TopicId,
  ExperienceItem,
  ProjectItem,
  SkillGroup,
  CertificateItem,
  FunFactItem,
  ContactChannel,
} from '@/types/portfolio';

export const TOPIC_OPTIONS: TopicOption[] = [
  {
    id: 'me',
    label: 'Me',
    queryText: 'Who is Ziyad Fouda? (Me)',
    userEmoji: '👤',
    icon: '☺',
    badgeClass: 'bg-[#00AA44]/20 text-[#008833]',
  },
  {
    id: 'projects',
    label: 'Projects',
    queryText: 'What are your top projects? (Projects)',
    userEmoji: '💼',
    icon: '💼',
    badgeClass: 'bg-[#ED1C24]/20 text-[#ED1C24]',
  },
  {
    id: 'skills',
    label: 'Skills',
    queryText: 'What are your skills and certificates? (Skills)',
    userEmoji: '📚',
    icon: '📚',
    badgeClass: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'fun',
    label: 'Fun',
    queryText: 'Tell me something fun! (Fun)',
    userEmoji: '🎉',
    icon: '🎉',
    badgeClass: 'bg-pink-100 text-pink-600',
  },
  {
    id: 'contact',
    label: 'Contact',
    queryText: 'How can I reach you? (Contact)',
    userEmoji: '✉',
    icon: '✉',
    badgeClass: 'bg-yellow-100 text-yellow-800',
  },
];

const PROJECT_IMG =
  'https://lh3.googleusercontent.com/aida/ALJJyrDizylsROFfDq2_A0NKlsEcFf8A_jDgzNSBadz908lPK_kCrhwYfKxirpzyu5MObrssvq2XehvnBmI3aft-_wzufm5mZ8qyEwmavOj1poG7zhAWPdRKGm3zkRlXmVJS-XiPZb5u7dYLw95Ye9tdme8_UNt_rwv91dS7Ck9oq4NXGm8DP82DFQqra9Z048SHqVCU67HarMJNrtuoM6e1a8JpNUtiLltIY8emQpPi4XUsNoFBtWmVAZMi76aB';

const CERT_IMG =
  'https://lh3.googleusercontent.com/aida/ALJJyrCMgPK3UXb_Pq9rSMlKeN6FcILK1ZEDIX8Ko8x5ud368RbeNh56h2KeY9VODhlJLHlNPAqt5CfbLpFTU1LWMkp43SsSOE9q4Pkw8PBP8K1XvBU89aFshxDNZtHV2OwXcQGdvr547prcX3q8L341vXrOMZKQSR5AulnhepWppwy0TZhUf4S87o3U4Ei7_QZkelV9CcPKTH5Ambbvuw4QuInaV8cTxwFLJe5pdelCHPECbVt7kOSoOeQrWWY';

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Ziyad Fouda',
    initials: 'ZF',
    role: 'AI Engineer | Computer Engineering Graduate',
    headerSubtitle: 'AI Engineer • Mansoura, Egypt',
    location: 'Mansoura, Egypt',
    graduation: 'Graduation: June 2026',
    resumeUrl: '/Ziyad_Fouda_Resume.pdf',
    githubUrl: 'https://github.com/zFoudaz',
    linkedinUrl: 'https://linkedin.com/in/zfouda',
    summary:
      'AI Engineer and Computer Engineering graduate with hands-on experience in machine learning, deep learning, Generative AI, and LLM application development. Experienced in building AI-powered applications and agentic workflows using Python, LangChain, LangGraph, Azure OpenAI, and RAG. Seeking an entry-level AI Engineering opportunity to build and deploy scalable AI solutions for real-world problems.',
    stats: [
      {
        label: 'University',
        value: 'Mansoura University',
        subtext: 'Computer & Control Systems',
        isHighlightSubtext: false,
      },
      {
        label: 'Academic Standing',
        value: 'GPA: 3.7 / 4.0',
        subtext: 'High Honors Distinction',
        isHighlightSubtext: true,
      },
      {
        label: 'Track Record',
        value: '4 AI Internships',
        subtext: 'Production & Research',
        isHighlightSubtext: false,
      },
    ],
  },
  experiences: [
    {
      badge: 'Current',
      isCurrent: true,
      period: '09/2026 – Present',
      role: 'AI Engineer Intern',
      companyAndLocation: 'Zawolf • Mansoura, Egypt',
      bullets: [
        'Explore AI integration across agriculture, manufacturing, real estate, and e-commerce.',
        'Contribute to developing AI-powered solutions tailored to industry-specific business needs.',
      ],
    },
    {
      badge: 'LLM Systems',
      isCurrent: false,
      period: '12/2025 – 02/2026',
      role: 'AI & Large Language Models Intern',
      companyAndLocation: 'Tips Hindawi • Remote',
      bullets: [
        'Developed chatbots and intelligent assistants using LLMs and prompt engineering.',
        'Implemented RAG pipelines using embeddings, LangChain, and vector databases.',
        'Experimented with Mistral and LLM fine-tuning fundamentals for model optimization.',
      ],
    },
    {
      badge: 'Microsoft ML',
      isCurrent: false,
      period: '06/2025 – 12/2025',
      role: 'Machine Learning Engineer Intern',
      companyAndLocation: 'Digital Egypt Pioneers Program • Remote',
      bullets: [
        'Applied regression, classification, clustering, dimensionality reduction, and model evaluation.',
        'Implemented neural networks, optimization, CNNs, and transfer learning for computer vision.',
      ],
    },
    {
      badge: 'Applied AI',
      isCurrent: false,
      period: '01/2025 – 02/2025',
      role: 'AI Internship Trainee',
      companyAndLocation: 'National Telecommunication Institute • Mansoura',
      bullets: [
        'Applied 4 core machine learning techniques: Regression, Classification, Clustering, and PCA.',
        'Prepared structured and image datasets via cleaning, preprocessing, and feature visualization.',
      ],
    },
  ] satisfies ExperienceItem[],
  projects: [
    {
      id: 'genlearn',
      badge: 'Flagship Platform',
      isAccentBadge: false,
      techFocus: 'Azure AI Foundry',
      title: 'GenLearn',
      description:
        'AI-powered learning platform converting user documents into structured courses, lecture videos, quizzes, and interactive AI assistance.',
      highlights: [
        {
          label: '4-Stage Pipeline:',
          detail: 'LangChain and Azure AI Foundry transform documents into course modules and narration scripts.',
        },
        {
          label: 'Multi-Format OCR:',
          detail: 'Ingestion of PDF, DOCX, PPTX, and images via Azure Content Understanding layout analysis.',
        },
        {
          label: 'Video & RAG Q&A:',
          detail: 'Integrated Azure Text-to-Speech video rendering and grounded conversational assistance.',
        },
      ],
      tags: ['LangChain', 'Azure AI Foundry', 'RAG', 'Azure TTS'],
      imageUrl: PROJECT_IMG,
      imageAlt: 'GenLearn Project Architecture',
    },
    {
      id: 'research-agent',
      badge: 'Agentic AI',
      isAccentBadge: true,
      techFocus: 'LangGraph',
      title: 'Research Agent with LangGraph',
      description:
        'Agentic research workflow decomposing topics into research plans, generating drafts, and executing multi-stage evaluation.',
      highlights: [
        {
          label: 'Planner-Writer-Reviewer:',
          detail: 'Conditional routing looping drafts back to the writer for iterative review cycles.',
        },
        {
          label: 'Tavily Search:',
          detail: 'Integrated live web search tool for the writer node with Azure OpenAI reasoning.',
        },
        {
          label: 'Typed Shared State:',
          detail: 'Managed research plans, drafts, review rubrics, and retry attempts across graph nodes.',
        },
      ],
      tags: ['LangGraph', 'LangChain', 'Tavily Search', 'Azure OpenAI'],
      imageUrl: PROJECT_IMG,
      imageAlt: 'Research Agent Architecture',
    },
    {
      id: 'popchoice',
      badge: 'Semantic RAG',
      isAccentBadge: false,
      techFocus: 'Supabase + Workers',
      title: 'PopChoice',
      description:
        'RAG-based movie recommendation application using embeddings and Large Language Models.',
      highlights: [
        {
          label: 'Vector Similarity:',
          detail: 'Embedded user natural language inputs matched against Supabase pgvector embeddings.',
        },
        {
          label: 'Serverless Backend:',
          detail: 'Deployed on Cloudflare Workers for sub-second low-latency global delivery.',
        },
        {
          label: 'Responsive Frontend:',
          detail: 'Hosted and maintained live on GitHub Pages.',
        },
      ],
      tags: ['Supabase pgvector', 'Cloudflare Workers', 'Embeddings'],
      imageUrl: PROJECT_IMG,
      imageAlt: 'PopChoice Movie System',
    },
    {
      id: 'study-tracker',
      badge: 'Full-Stack Backend',
      isAccentBadge: false,
      techFocus: 'FastAPI + Docker',
      title: 'Study Tracker App',
      description:
        'Full-stack study tracking application for recording study sessions, organizing users, and analyzing study statistics.',
      highlights: [
        {
          label: 'RESTful Backend:',
          detail: 'Built with FastAPI, Pydantic, psycopg2, date-range filtering, and session tracking.',
        },
        {
          label: 'PostgreSQL Database:',
          detail: 'Schema with relational constraints, initialization scripts, and persistent Docker storage.',
        },
        {
          label: 'Docker Compose:',
          detail: 'Multi-service containerization with network isolation and health checks.',
        },
      ],
      tags: ['FastAPI', 'PostgreSQL', 'Docker Compose'],
      imageUrl: PROJECT_IMG,
      imageAlt: 'Study Tracker Architecture',
    },
  ] satisfies ProjectItem[],
  skills: [
    {
      category: 'Languages & Tools',
      items: ['Python', 'JavaScript', 'SQL', 'Docker'],
    },
    {
      category: 'Frameworks & Libraries',
      items: ['scikit-learn', 'PyTorch', 'LangChain', 'LangGraph', 'OpenAI SDK'],
    },
    {
      category: 'Soft Skills',
      items: ['Creativity', 'Problem-Solving', 'Time Management'],
    },
  ] satisfies SkillGroup[],
  certificates: [
    {
      title: 'AI Engineering Specialization',
      issuer: 'Scrimba',
      badge: 'Verified Specialization',
      imageUrl: CERT_IMG,
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'deeplearning.AI',
      badge: 'Verified Specialization',
      imageUrl: CERT_IMG,
    },
    {
      title: 'Agentic AI with LangChain & LangGraph',
      issuer: 'IBM',
      badge: 'Verified Specialization',
      imageUrl: CERT_IMG,
    },
    {
      title: 'LLM Applications with Prompt Engineering',
      issuer: 'NVIDIA',
      badge: 'Verified Specialization',
      imageUrl: CERT_IMG,
    },
    {
      title: 'Python Data Association',
      issuer: 'DataCamp',
      badge: 'Verified Specialization',
      imageUrl: CERT_IMG,
    },
    {
      title: 'SQL for Data Science',
      issuer: 'UCDAVIS',
      badge: 'Verified Specialization',
      imageUrl: CERT_IMG,
    },
  ] satisfies CertificateItem[],
  funFacts: [
    {
      emoji: '🤖',
      title: 'Control Systems Meets LangGraph',
      description:
        'Studying control systems engineering gave me a natural intuition for designing cyclic feedback loops in LangGraph: PID controllers and multi-agent critique routers share the exact same feedback error-correction philosophy!',
    },
    {
      emoji: '🍿',
      title: 'PopChoice Movie Night Dilemma',
      description:
        'PopChoice was born because I spent more time browsing Netflix menus than actually watching movies. Building a vector embedding recommender was my engineering excuse to solve movie paralysis.',
    },
    {
      emoji: '☕',
      title: 'Prompt Precision & Coffee',
      description:
        'Refining deterministic system prompts and evaluating edge cases runs best with strong Egyptian and Turkish coffee.',
    },
    {
      emoji: '⚙️',
      title: 'From Mansoura to Global AI',
      description:
        'Based in Mansoura, Egypt, but building for distributed systems and global teams with asynchronous communication and containerized Docker environments.',
    },
  ] satisfies FunFactItem[],
  contact: [
    {
      label: 'Email',
      isAccentLabel: true,
      value: 'ziyad.fouda7@gmail.com',
      sublabel: 'Direct inbox contact',
      href: 'mailto:ziyad.fouda7@gmail.com',
      external: false,
    },
    {
      label: 'Phone & WhatsApp',
      isAccentLabel: false,
      value: '+20 1069640521',
      sublabel: 'Mansoura, Egypt (GMT+2)',
      href: 'tel:+201069640521',
      external: false,
    },
    {
      label: 'LinkedIn',
      isAccentLabel: false,
      value: 'linkedin.com/in/zfouda',
      sublabel: 'Professional Network',
      href: 'https://linkedin.com/in/zfouda',
      external: true,
    },
    {
      label: 'GitHub',
      isAccentLabel: false,
      value: 'github.com/zFoudaz',
      sublabel: 'Code repositories & demos',
      href: 'https://github.com/zFoudaz',
      external: true,
    },
  ] satisfies ContactChannel[],
};

export function matchTopicFromInput(input: string): TopicId | null {
  const val = input.trim().toLowerCase();
  if (!val) return null;

  if (
    val === 'projects' ||
    val.includes('project') ||
    val.includes('genlearn') ||
    val.includes('langgraph') ||
    val.includes('popchoice') ||
    val.includes('study tracker') ||
    val.includes('portfolio work') ||
    val.includes('built')
  ) {
    return 'projects';
  }

  if (
    val === 'skills' ||
    val.includes('skill') ||
    val.includes('cert') ||
    val.includes('python') ||
    val.includes('pytorch') ||
    val.includes('langchain') ||
    val.includes('stack') ||
    val.includes('tech') ||
    val.includes('docker') ||
    val.includes('sql')
  ) {
    return 'skills';
  }

  if (
    val === 'fun' ||
    val.includes('fun') ||
    val.includes('hobby') ||
    val.includes('hobbies') ||
    val.includes('coffee') ||
    val.includes('fact') ||
    val.includes('movie')
  ) {
    return 'fun';
  }

  if (
    val === 'contact' ||
    val.includes('contact') ||
    val.includes('email') ||
    val.includes('phone') ||
    val.includes('reach') ||
    val.includes('hire') ||
    val.includes('linkedin') ||
    val.includes('github') ||
    val.includes('whatsapp')
  ) {
    return 'contact';
  }

  if (
    val === 'me' ||
    val.includes('who is') ||
    val.includes('who are you') ||
    val.includes('about') ||
    val.includes('ziyad') ||
    val.includes('education') ||
    val.includes('university') ||
    val.includes('experience') ||
    val.includes('intern') ||
    val.includes('gpa') ||
    val.includes('resume') ||
    val.includes('cv')
  ) {
    return 'me';
  }

  return null;
}
