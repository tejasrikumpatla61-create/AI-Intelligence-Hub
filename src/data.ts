import { AITool, NewsItem, Notification, GeminiInsights } from './types';

export const PROFESSIONS = [
  'Software Engineer',
  'Student',
  'Data Scientist',
  'Designer',
  'Digital Marketer',
  'Entrepreneur',
  'Researcher',
  'AI Engineer',
  'Product Manager'
];

export const SKILLS_CHIPS = [
  'Python', 'React', 'TypeScript', 'UI/UX', 'Marketing', 'AI', 'ML', 'Cloud', 
  'Data Analytics', 'Copywriting', 'SEO', 'Figma', 'Node.js', 'SQL', 'TensorFlow', 
  'Next.js', 'Prompt Engineering', 'Product Strategy', 'Research Methods', 'Branding'
];

export const INTERESTS_LIST = [
  { id: 'agents', name: 'AI Agents', description: 'Autonomous software systems solving complex workflows', icon: 'Cpu' },
  { id: 'coding', name: 'Coding', description: 'AI-assisted programming, editors, and code generators', icon: 'Code' },
  { id: 'design', name: 'Design', description: 'Generative UI, UI/UX tools, and product design enhancers', icon: 'Palette' },
  { id: 'productivity', name: 'Productivity', description: 'Note-taking, scheduling, and workspace optimization', icon: 'Zap' },
  { id: 'video-gen', name: 'Video Generation', description: 'Text-to-video and cinematic synthesis engines', icon: 'Film' },
  { id: 'image-gen', name: 'Image Generation', description: 'Digital painting, text-to-image, and visual editing', icon: 'Image' },
  { id: 'llms', name: 'LLMs & Chat', description: 'Advanced conversational engines and foundational models', icon: 'MessageSquare' },
  { id: 'robotics', name: 'Robotics', description: 'Embodied intelligence, automation, and physical systems', icon: 'Bot' },
  { id: 'healthcare', name: 'Healthcare', description: 'Biomedical research, clinical intelligence, and diagnostics', icon: 'HeartPulse' },
  { id: 'finance', name: 'Finance', description: 'Market research, financial modeling, and algorithmic trading', icon: 'TrendingUp' },
  { id: 'education', name: 'Education', description: 'AI tutors, learning management, and textbook summaries', icon: 'GraduationCap' },
  { id: 'cybersecurity', name: 'Cybersecurity', description: 'Threat detection, automated auditing, and network defense', icon: 'ShieldAlert' }
];

export const EXPERIENCE_LEVELS = [
  { value: 'Beginner', description: 'New to AI tools and prompt design' },
  { value: 'Intermediate', description: 'Regular user of ChatGPT/Claude for daily tasks' },
  { value: 'Advanced', description: 'Builds customized prompts, uses APIs and local models' },
  { value: 'Expert', description: 'Develops AI systems, fine-tunes models, deploys agent workflows' }
];

export const LEARNING_GOALS = [
  { id: 'boost-prod', name: 'Boost Professional Productivity' },
  { id: 'learn-code', name: 'Learn Coding and Technical Skills' },
  { id: 'automate-work', name: 'Automate Repetitive Daily Workflows' },
  { id: 'content-creation', name: 'Create High-Quality Digital Content' },
  { id: 'research-insight', name: 'Conduct Deep Academic/Market Research' },
  { id: 'build-ai-apps', name: 'Build and Deploy My Own AI Applications' },
  { id: 'stay-updated', name: 'Stay Updated with Latest AI Trends & News' }
];

export const SEEDED_AI_TOOLS: AITool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'An AI-first code editor built on top of VS Code, designed for paired-programming with advanced model intelligence.',
    category: 'Coding',
    tags: ['IDE', 'Auto-Complete', 'Editor'],
    pricing: 'Freemium',
    pricingBadge: 'Free Tier / $20/mo',
    popularityScore: 98,
    rating: 4.9,
    logo: 'Code',
    visitUrl: 'https://cursor.com',
    bestFor: 'Software Engineers looking to double their coding velocity through natural language code modifications.',
    features: ['Tab autocomplete', 'Edit in natural language', 'Chat with codebase', 'Auto-fixes terminal errors'],
    platforms: ['macOS', 'Windows', 'Linux'],
    apiAvailable: false,
    pros: ['Familiar VS Code keybindings & extensions', 'Blazing fast predictive autocomplete', 'In-context multi-file edits'],
    cons: ['Requires monthly premium subscription for fast Claude/GPT access', 'Can occasionally hallucinate complex architecture plans'],
    launchDate: '2023-09-12',
    trendingScore: 97
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    description: 'A generative UI system that produces production-ready React, Tailwind, and Shadcn code from simple text instructions.',
    category: 'Design',
    tags: ['Generative UI', 'React', 'Frontend'],
    pricing: 'Freemium',
    pricingBadge: 'Free Credits / Premium Plans',
    popularityScore: 96,
    rating: 4.8,
    logo: 'Palette',
    visitUrl: 'https://v0.dev',
    bestFor: 'Web designers, software developers, and product creators wanting to build beautiful frontends in seconds.',
    features: ['Instant code preview', 'Tailwind & Shadcn support', 'Interactive chat revisions', 'Figma copy-paste (experimental)'],
    platforms: ['Web / Browser'],
    apiAvailable: true,
    pros: ['Outputs pristine Tailwind CSS', 'Interactive playground matches modern SaaS components', 'Staggeringly fast design rendering'],
    cons: ['Limited backend capabilities in output', 'Occasional styling conflicts with older React versions'],
    launchDate: '2023-11-05',
    trendingScore: 95
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    description: 'Anthropic\'s state-of-the-art foundational LLM featuring unmatched reasoning, writing elegance, and code capabilities.',
    category: 'LLMs & Chat',
    tags: ['Chatbot', 'Reasoning', 'Foundational'],
    pricing: 'Freemium',
    pricingBadge: 'Free / $20/mo',
    popularityScore: 99,
    rating: 4.9,
    logo: 'MessageSquare',
    visitUrl: 'https://anthropic.com/claude',
    bestFor: 'Complex analytical tasks, advanced system design, logical reasoning, and creative writing.',
    features: ['200k context window', 'Artifacts live preview', 'Advanced vision processing', 'Projects workspace for custom instructions'],
    platforms: ['Web', 'iOS', 'Android', 'API'],
    apiAvailable: true,
    pros: ['Unparalleled coding logic', 'Nuanced, friendly, and human-like writing tone', 'Artifacts make code and UI instantly inspectable'],
    cons: ['Daily usage limits even on paid tiers', 'No native live web search integration'],
    launchDate: '2024-06-20',
    trendingScore: 99
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'An AI-powered conversational search engine that provides real-time answers with direct citations from the web.',
    category: 'Productivity',
    tags: ['Search', 'Research', 'Citations'],
    pricing: 'Freemium',
    pricingBadge: 'Free / $20/mo Pro',
    popularityScore: 97,
    rating: 4.8,
    logo: 'Zap',
    visitUrl: 'https://perplexity.ai',
    bestFor: 'Researchers, analysts, and students needing fast, grounded, referenced syntheses of complex web topics.',
    features: ['Pro Search (multi-step reasoning)', 'File uploads for doc research', 'Custom collections / prompts', 'Choice of underlying model (Claude/GPT)'],
    platforms: ['Web', 'iOS', 'Android', 'Mac'],
    apiAvailable: true,
    pros: ['Always includes direct verification sources', 'Format layout is gorgeous and readable', 'Avoids general hallucination by anchoring to web search'],
    cons: ['Pro queries have a daily limit', 'May occasionally aggregate outdated sources if search queries are ambiguous'],
    launchDate: '2022-12-15',
    trendingScore: 94
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    description: 'Google\'s personalized AI notebook that synthesizes your source materials into outlines, summaries, and stunning Audio Overviews.',
    category: 'Education',
    tags: ['Note-Taking', 'Audio Podcast', 'PDF Research'],
    pricing: 'Free',
    pricingBadge: 'Totally Free',
    popularityScore: 95,
    rating: 4.8,
    logo: 'GraduationCap',
    visitUrl: 'https://notebooklm.google',
    bestFor: 'Students, authors, and researchers organizing multiple PDFs, YouTube videos, and Google Docs into study guides.',
    features: ['Source-grounded Chat', 'Study guide generation', '2-speaker Audio Podcast generators', 'Auto-citation locator'],
    platforms: ['Web / Browser'],
    apiAvailable: false,
    pros: ['Completely private - your source data is not used for training', 'Stunning conversational podcast generation', 'Instant clickable sources'],
    cons: ['Max upload limits per notebook', 'Audio podcasts cannot be customized in length or voice types yet'],
    launchDate: '2024-07-16',
    trendingScore: 98
  },
  {
    id: 'midjourney',
    name: 'Midjourney v6',
    description: 'A state-of-the-art text-to-image platform that produces stunning cinematic, highly artistic, and hyper-realistic visual styles.',
    category: 'Image Generation',
    tags: ['Art', 'Generative Design', 'Text-to-Image'],
    pricing: 'Paid',
    pricingBadge: 'From $10/mo',
    popularityScore: 93,
    rating: 4.7,
    logo: 'Image',
    visitUrl: 'https://midjourney.com',
    bestFor: 'Creative designers, branding agencies, and game artists needing ultra-high-fidelity visuals and concept art.',
    features: ['Web editor UI', 'Aspect-ratio manipulation', 'Pan/Zoom and inpainting edits', 'Consistent characters feature'],
    platforms: ['Web', 'Discord'],
    apiAvailable: false,
    pros: ['Stunning aesthetics unmatched in photorealism and fine-art styles', 'Granular control over camera angles, styling, and text rendering'],
    cons: ['No permanently free tier', 'Discord interface is still required for certain legacy features'],
    launchDate: '2023-12-21',
    trendingScore: 91
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'The industry-leading AI speech synthesis platform generating hyper-realistic human voice overs in 29+ languages.',
    category: 'Video Generation',
    tags: ['Voice Synthesis', 'Cloning', 'Audio'],
    pricing: 'Freemium',
    pricingBadge: 'Free / Starter Plans',
    popularityScore: 94,
    rating: 4.8,
    logo: 'Film',
    visitUrl: 'https://elevenlabs.io',
    bestFor: 'Audiobook narrators, video creators, game development studios, and accessibility engineers.',
    features: ['Instant Voice Cloning', 'AI Sound Effects', 'Multilingual Speech generation', 'Video Dubbing & translation'],
    platforms: ['Web', 'API', 'iOS'],
    apiAvailable: true,
    pros: ['Perfect emotional inflections and breathing noises', 'Seamless voice design/cloning from short audio samples', 'Robust developer-friendly REST API'],
    cons: ['Free character allowance is small', 'Voice generation credits can disappear rapidly with high sample rates'],
    launchDate: '2023-01-22',
    trendingScore: 90
  },
  {
    id: 'harvey',
    name: 'Harvey AI',
    description: 'An enterprise-grade LLM system designed specifically for legal analysis, contract vetting, and clinical litigation workflows.',
    category: 'Healthcare',
    tags: ['Legal AI', 'Clinical Intelligence', 'Compliance'],
    pricing: 'Paid',
    pricingBadge: 'Custom Enterprise pricing',
    popularityScore: 82,
    rating: 4.6,
    logo: 'HeartPulse',
    visitUrl: 'https://harvey.ai',
    bestFor: 'Legal practitioners, compliance teams, and clinical analysts requiring deep document examination.',
    features: ['Contract markup and review', 'Precedent drafting', 'Regulatory cross-analysis', 'Secure HIPAA compliance'],
    platforms: ['Web / Enterprise Client'],
    apiAvailable: true,
    pros: ['Highly specialized legal and clinical terminology', 'Extremely high compliance standard', 'Custom fine-tuned parameters on law firm precedents'],
    cons: ['No transparent price tier for small startups or independent users', 'Rigid signup process requiring corporate credentials'],
    launchDate: '2023-03-15',
    trendingScore: 85
  },
  {
    id: 'phind',
    name: 'Phind',
    description: 'An AI search engine and coding assistant designed specifically for developers, linking answer responses to live API docs.',
    category: 'Coding',
    tags: ['Search', 'Coding Help', 'Technical'],
    pricing: 'Freemium',
    pricingBadge: 'Free / $20/mo Pro',
    popularityScore: 88,
    rating: 4.5,
    logo: 'Code',
    visitUrl: 'https://phind.com',
    bestFor: 'Developers needing instant coding answers with up-to-date framework documentation.',
    features: ['VS Code Extension', 'Live Search integration', 'Multiple model select (Phind model, GPT-4o)', 'Terminal link-ups'],
    platforms: ['Web', 'VS Code', 'IntelliJ'],
    apiAvailable: true,
    pros: ['Tailored to programming documentation and repository structures', 'Requires minimal prompt tuning to get working code snippets', 'Free search mode is highly capable'],
    cons: ['Less creative flexibility than vanilla Claude', 'Code styling can feel a bit robotic'],
    launchDate: '2022-11-20',
    trendingScore: 82
  }
];

export const SEEDED_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'OpenAI Launches Advanced AI Agents for Browser Automation',
    source: 'TechCrunch',
    time: '2 hours ago',
    url: '#',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    category: 'AI Agents',
    summary: 'A new framework allows autonomous web agents to navigate portals, handle bookings, fill out forms, and manage online retail carts without human intervention.'
  },
  {
    id: 'news-2',
    title: 'Claude 3.5 Artifacts API Released with Real-time Interactive Previews',
    source: 'Anthropic News',
    time: '5 hours ago',
    url: '#',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
    category: 'LLMs',
    summary: 'Developers can now embed live code sandboxes directly into their user products using the newly deployed Anthropic Artifacts API protocol.'
  },
  {
    id: 'news-3',
    title: 'Sora 2 Announced: Photorealistic Video Generation Reaches Hollywood Clarity',
    source: 'VFX Insider',
    time: '1 day ago',
    url: '#',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    category: 'Video Gen',
    summary: 'The latest neural physics update allows for perfect consistency across camera pans, hyper-realistic hair rendering, and fully consistent environmental lighting.'
  },
  {
    id: 'news-4',
    title: 'AI Researchers Discover Novel Medical Molecule in Record Time',
    source: 'Nature Biotech',
    time: '2 days ago',
    url: '#',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
    category: 'Healthcare',
    summary: 'A custom transformer architecture has mapped out a novel molecular candidate to combat specific bacterial strains in just 18 hours, compared to years in a traditional lab.'
  }
];

export const SEEDED_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'launch',
    title: 'New AI Tool: v0 by Vercel Added',
    description: 'A revolutionary generative UI framework that translates mock designs directly to styled React code.',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 'notif-2',
    type: 'trending',
    title: 'Cursor is Trending #1 Today',
    description: 'Over 20,000 developers bookmarked Cursor code editor this week. Explore why it is replacing VS Code.',
    time: '1 day ago',
    unread: true
  },
  {
    id: 'notif-3',
    type: 'digest',
    title: 'Your Weekly AI Digest is Ready',
    description: 'We synthesized 12 newly launched productivity tools that perfectly match your Marketing interest.',
    time: '2 days ago',
    unread: false
  },
  {
    id: 'notif-4',
    type: 'news',
    title: 'Breaking: Anthropic Releases Sonnet 3.5 update',
    description: 'See how the latest Claude update improves coding speed by 40% and reasoning benchmarks by 15%.',
    time: '3 days ago',
    unread: false
  }
];

export const DEFAULT_MOCK_INSIGHTS: Record<string, GeminiInsights> = {
  default: {
    headline: "Welcome to AI Intelligence Hub!",
    summary: "Based on standard interest in productivity and coding, we curated top generative platforms designed to accelerate your day-to-day workflow.",
    insights: [
      "AI-assisted code development is seeing a 40% productivity gain with customized context IDEs.",
      "Generative UI is shortening the prototyping lifecycle from days to hours by compiling Tailwind elements instantly."
    ],
    recommendedTools: [
      {
        name: "Cursor",
        description: "AI-first code editor pairing Claude Sonnet context directly within your active projects.",
        useCase: "Coding & IDE Acceleration",
        whyIdeal: "Provides autocomplete and contextual edits right inside your codebase, matching professional tech stacks."
      },
      {
        name: "v0 by Vercel",
        description: "Produces styled Tailwind and React layouts from text instructions.",
        useCase: "Interface Prototyping",
        whyIdeal: "Bypasses wireframing to produce fully interactable components."
      }
    ],
    actionPlan: [
      {
        step: "Install Cursor IDE",
        description: "Replace standard VS Code with Cursor and link your GitHub repository to index code context."
      },
      {
        step: "Design standard templates via v0",
        description: "Prompt v0 to generate a modern login page, then export the JSX and Tailwind classes directly into your project."
      },
      {
        step: "Create a custom notebook in NotebookLM",
        description: "Upload your company documents to generate a personalized search portal and automated audio brief."
      }
    ]
  },
  'Software Engineer': {
    headline: "Optimizing the Engineer's Stack",
    summary: "As a Software Engineer, the AI landscape is shifting toward multi-file workspace editing and automatic container debugging.",
    insights: [
      "Autocomplete models are transitioning from simple line-level suggestions to context-aware repo-level edits.",
      "Interactive code artifacts are making frontend prototyping highly visual, bypassing static design tools."
    ],
    recommendedTools: [
      {
        name: "Cursor",
        description: "The leading AI editor built for repository analysis, fast inline edits, and terminal error resolving.",
        useCase: "Integrated Coding Environment",
        whyIdeal: "Integrates with existing VS Code setups while providing blazing-fast Claude 3.5 context matching."
      },
      {
        name: "Claude 3.5 Sonnet",
        description: "Foundational reasoning engine capable of complex architectural mapping and code drafting.",
        useCase: "Architectural Planning & Debugging",
        whyIdeal: "The highest benchmarks for programmatic problem-solving and software design."
      }
    ],
    actionPlan: [
      {
        step: "Adopt Cursor and index your main repository",
        description: "Let Cursor build an offline vector database of your codebase for accurate multi-file code modifications."
      },
      {
        step: "Utilize Anthropic Projects",
        description: "Gather style guides, API structures, and coding principles in a Claude Project workspace to ensure uniform styling."
      },
      {
        step: "Examine API structures via Phind",
        description: "Use Phind to quickly query external library updates without reading tedious changelogs manually."
      }
    ]
  },
  'Designer': {
    headline: "Visual & Generative Design Evolution",
    summary: "For Designers, AI tools represent a giant leap in generative layouts and instant UI prototyping, allowing you to focus on high-fidelity user journeys.",
    insights: [
      "Text-to-design models are compiling raw visual ideas into functional React and Tailwind components instantly.",
      "Consistent characters and high-fidelity text generation in image models now support flawless poster and UI rendering."
    ],
    recommendedTools: [
      {
        name: "v0 by Vercel",
        description: "Generates fully modular, styled web interfaces using modern component paradigms.",
        useCase: "Rapid UI/UX Prototyping",
        whyIdeal: "Translates abstract UI design guidelines into live interactive code with precise Tailwind styling."
      },
      {
        name: "Midjourney v6",
        description: "Highest benchmark for visual asset composition, brand assets, and digital artwork production.",
        useCase: "Moodboards & Illustrative Branding",
        whyIdeal: "Provides cinematic lighting controls, style references, and direct text rendering."
      }
    ],
    actionPlan: [
      {
        step: "Design layouts interactively with v0",
        description: "Iterate on component structures using chat, then copy the tailwind classes into your layouts."
      },
      {
        step: "Establish asset guides using Midjourney",
        description: "Generate consistent design backgrounds using --sref and character references to maintain visual branding."
      },
      {
        step: "Create a visual asset library",
        description: "Organize generated components and assets into custom project collections within the hub for quick team sharing."
      }
    ]
  }
};
