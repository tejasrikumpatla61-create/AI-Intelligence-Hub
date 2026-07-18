import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini API client initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize Gemini API client:', err);
  }
} else {
  console.log('GEMINI_API_KEY not found in environment. Relying on premium pre-seeded insights engine.');
}

// Fallback programmatic generator based on profile details
function generateProgrammaticInsights(profile: any) {
  const profession = profile.profession || 'Professional';
  const industry = profile.industry || 'Technology';
  const skills = profile.skills && profile.skills.length > 0 ? profile.skills : ['productivity', 'general analysis'];
  const interests = profile.interests && profile.interests.length > 0 ? profile.interests : ['AI Agents', 'LLMs'];
  const goals = profile.learningGoals && profile.learningGoals.length > 0 ? profile.learningGoals : ['Automate Workflows'];
  const experience = profile.experience || 'Intermediate';

  return {
    headline: `Personalized Intelligence Strategy for ${profile.name || 'John'}`,
    summary: `We analyzed your profile as a ${experience} ${profession} in the ${industry} sector. To help you accomplish your goal of "${goals[0]}", we synthesized the latest AI breakthroughs matching your skills (${skills.slice(0, 3).join(', ')}) and interest in ${interests.slice(0, 2).join(' & ')}.`,
    insights: [
      `The combination of ${skills[0] || 'your skill set'} and modern ${interests[0] || 'AI'} is driving a 45% reduction in manual data tasks this quarter.`,
      `Multi-agent systems (AI Agents) are currently evolving from pure chat utilities into background action executors for your sector.`,
      `Advanced prompt tuning on premium foundational LLMs offers high-leverage automation for ${goals[0].toLowerCase()}.`
    ],
    recommendedTools: [
      {
        name: interests.includes('coding') || profession.includes('Engineer') ? 'Cursor' : 'Perplexity',
        description: interests.includes('coding') || profession.includes('Engineer') 
          ? 'An AI-first code editor designed for deep codebase understanding and paired-programming modifications.'
          : 'An AI research assistant that connects directly to the web, citing references and synthesizing market data.',
        useCase: 'Workplace Acceleration',
        whyIdeal: `Directly aligns with your expertise level (${experience}) and enhances your core capability in ${skills[0] || 'analysis'}.`
      },
      {
        name: interests.includes('design') ? 'v0 by Vercel' : 'NotebookLM',
        description: interests.includes('design')
          ? 'Generative UI pipeline compiling styled React, Tailwind and HTML components instantly from chat.'
          : 'Google\'s research notebook compiling documents, transcripts, and notes into interactive sources and audio overviews.',
        useCase: 'Information Synthesis & Creation',
        whyIdeal: `Accelerates your secondary goals around "${goals[0]}" with minimal learning curve.`
      },
      {
        name: 'Claude 3.5 Sonnet',
        description: 'Premium foundational reasoning model that handles complex logic, code execution, and data formatting.',
        useCase: 'Logical Analysis & Drafting',
        whyIdeal: 'Provides an excellent general-purpose intelligence workspace for brainstorming and workflow structuring.'
      }
    ],
    actionPlan: [
      {
        step: `Integrate ${interests.includes('coding') || profession.includes('Engineer') ? 'Cursor' : 'Perplexity'} into your daily routine`,
        description: `Dedicate 20 minutes tomorrow to setting up this application and feeding it 2 current challenges in your ${industry} workflow.`
      },
      {
        step: 'Assemble a knowledge database',
        description: `Upload your standard work templates, guidelines, and reference sheets into a shared notebook context to customize model outputs.`
      },
      {
        step: 'Configure automated alerts',
        description: `Enable weekly digest emails in your profile targeting the "${interests[0]}" category to monitor emerging open-source models.`
      }
    ]
  };
}

// Dashboard Cache & Mock Fallbacks for Offline-First Robustness
interface CacheEntry {
  timestamp: number;
  data: any;
}

const dashboardCache: Record<string, CacheEntry> = {};

const DEFAULT_DASHBOARD_DATA = {
  stats: {
    totalAITools: 412,
    researchPapers: 118,
    githubProjects: 1045,
    aiNews: 24,
    learningResources: 45
  },
  latestTools: [
    {
      id: "bolt-new",
      name: "Bolt.new",
      description: "An interactive, full-stack WebContainer-powered development environment that builds, runs, and deploys full React/Vite/Express apps from prompt.",
      category: "Coding",
      tags: ["IDE", "Full-Stack", "WebContainer"],
      pricing: "Freemium",
      pricingBadge: "Free Tier / $20/mo",
      popularityScore: 97,
      rating: 4.8,
      logo: "Code",
      visitUrl: "https://bolt.new",
      bestFor: "Frontend developers and entrepreneurs who want to prototype and host web apps instantly without environment setups.",
      features: ["Full-stack compilation", "Deploy to Netlify/StackBlitz", "Terminal and NPM control", "Direct code modification"],
      platforms: ["Web / Browser"],
      apiAvailable: false,
      pros: ["Runs full-stack servers directly in browser sandbox", "Staggeringly fast hot-reloading", "One-click hosting deploy"],
      cons: ["Can hit browser memory limits for larger bundles", "No direct database connection natively standard"],
      launchDate: "2025-10-15",
      trendingScore: 96
    },
    {
      id: "gemini-flash-tts",
      name: "Gemini 3.5 Flash",
      description: "Google's newest ultra-low latency multimodal foundational model, providing direct raw PCM voice streaming, high-fidelity real-time search, and speech synthesis.",
      category: "LLMs & Chat",
      tags: ["Multimodal", "Voice API", "Real-time"],
      pricing: "Freemium",
      pricingBadge: "Free Tier / Pay-as-you-go",
      popularityScore: 99,
      rating: 4.9,
      logo: "MessageSquare",
      visitUrl: "https://ai.google.dev",
      bestFor: "Developers seeking highly reactive conversational interfaces, TTS pipelines, and grounded search agents.",
      features: ["Native audio modality", "2M context window", "Web search grounding", "Function calling support"],
      platforms: ["API", "Web"],
      apiAvailable: true,
      pros: ["Incredibly fast text and speech synthesis", "Direct raw PCM output is highly stable", "Lowest API cost for high-reasoning tasks"],
      cons: ["Still in developer preview for advanced audio features", "May require custom client integration for web PCM streams"],
      launchDate: "2026-02-10",
      trendingScore: 99
    },
    {
      id: "flux-1",
      name: "Flux.1",
      description: "The premier open-weights text-to-image synthesis model, outperforming traditional engines in text rendering, prompt adherence, and photorealistic skin textures.",
      category: "Image Generation",
      tags: ["Art", "Open Weights", "Text-to-Image"],
      pricing: "Open Source",
      pricingBadge: "Free / Commercial License",
      popularityScore: 96,
      rating: 4.8,
      logo: "Image",
      visitUrl: "https://blackforestlabs.ai",
      bestFor: "Graphic artists, brand managers, and game designers demanding exact text alignment and complex scene execution.",
      features: ["12B parameter model", "Perfect hand and face anatomy", "Incredible typographic rendering", "Configurable aspect ratios"],
      platforms: ["Web", "API", "Local (ComfyUI)"],
      apiAvailable: true,
      pros: ["Exceptional text spelling in images", "Open source weight access for local execution", "Stunning photographic composition"],
      cons: ["Extremely high GPU memory required for local runs", "Slower generation speed compared to older models"],
      launchDate: "2025-08-01",
      trendingScore: 95
    },
    {
      id: "veo-3",
      name: "Veo by Google",
      description: "A professional video generation model capable of synthesizing high-definition cinematic shots in 1080p and 4K, matching natural physics and lighting.",
      category: "Video Generation",
      tags: ["Cinematics", "Physics Update", "High-Definition"],
      pricing: "Paid",
      pricingBadge: "Commercial API",
      popularityScore: 94,
      rating: 4.7,
      logo: "Film",
      visitUrl: "https://deepmind.google/technologies/veo/",
      bestFor: "Independent creators, video editors, and cinematic producers seeking flawless camera pans and high prompt alignment.",
      features: ["Cinematic pans and zooms", "Ultra-realistic fluid dynamics", "Last-frame video extension", "Dual-speaker synchronization"],
      platforms: ["Web", "API"],
      apiAvailable: true,
      pros: ["Stunning cinematic visual quality", "Maintains physics and spatial consistency", "Supports dual image-to-video references"],
      cons: ["Relatively slow generation times", "Restrictive safety guidelines for human renders"],
      launchDate: "2025-11-20",
      trendingScore: 92
    },
    {
      id: "claude-computer-use",
      name: "Claude Computer Use",
      description: "Anthropic's groundbreaking action-agent capability allowing models to control computer interfaces—clicking, typing, and navigating like a human operator.",
      category: "Productivity",
      tags: ["Agents", "Automation", "Browser Use"],
      pricing: "Paid",
      pricingBadge: "Usage based API",
      popularityScore: 95,
      rating: 4.7,
      logo: "Bot",
      visitUrl: "https://anthropic.com",
      bestFor: "Enterprise automations, QA engineers, and operations managers wanting to automate screen-level workflows.",
      features: ["Screen screenshot analysis", "Virtual mouse and keyboard control", "Secure sandbox execution", "API-driven coordination"],
      platforms: ["Docker", "Linux API"],
      apiAvailable: true,
      pros: ["Automates non-API software directly", "Excellent visual self-correction logic", "Handles multi-stage file transfers across systems"],
      cons: ["Higher latency per action cycle", "Requires highly secure, isolated sandboxes to prevent unauthorized clicks"],
      launchDate: "2025-10-22",
      trendingScore: 94
    },
    {
      id: "v0-chat-revisions",
      name: "v0 Revisions",
      description: "Vercel's generative frontend component builder upgraded with live interactive preview editing, deep Figma copy-paste, and full backend Express proxy scaffolding.",
      category: "Design",
      tags: ["Generative UI", "Figma", "Tailwind"],
      pricing: "Freemium",
      pricingBadge: "Free Credits / $20/mo",
      popularityScore: 97,
      rating: 4.8,
      logo: "Palette",
      visitUrl: "https://v0.dev",
      bestFor: "Frontend developers needing instant UI layout components ready to drop into modern Next.js/Vite apps.",
      features: ["Figma image input matching", "Interactive component updates", "React and Tailwind export", "Theme configuration sync"],
      platforms: ["Web / Browser"],
      apiAvailable: false,
      pros: ["Pristine code generation quality", "Interactive sandbox updates are rapid", "Excellent support for Tailwind and dark theme settings"],
      cons: ["Requires credit replenishment for high-volume use", "Does not handle database hosting out of the box"],
      launchDate: "2026-01-15",
      trendingScore: 96
    }
  ],
  latestNews: [
    {
      id: "news-dyn-1",
      title: "Google DeepMind Unveils Next-Gen Veo Video Synthesis",
      source: "Tech News Daily",
      time: "4 hours ago",
      url: "https://deepmind.google",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
      category: "Video Gen",
      summary: "Google DeepMind has launched a significant upgrade to its Veo model, offering Hollywood-level physics consistency, high-resolution rendering, and raw PCM sound alignment."
    },
    {
      id: "news-dyn-2",
      title: "OpenAI Announces Native Desktop Agent Ecosystem",
      source: "Silicon Valley Tech",
      time: "8 hours ago",
      url: "https://openai.com",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      category: "AI Agents",
      summary: "OpenAI has officially launched its browser and OS-level agent suite, capable of automating complex, multi-system professional workflows securely from a secure sandbox."
    },
    {
      id: "news-dyn-3",
      title: "Anthropic Releases Claude 3.5 Upgrade with Enhanced Reasoners",
      source: "LLM Insider",
      time: "1 day ago",
      url: "https://anthropic.com",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
      category: "LLMs",
      summary: "Anthropic has rolled out a revised reasoning protocol for its premium models, improving code logic speed by 35% and mathematics benchmark scoring by 12% globally."
    },
    {
      id: "news-dyn-4",
      title: "Breakthrough AI Transformer Generates Novel Antimicrobial Molecule",
      source: "BioTech Quarterly",
      time: "2 days ago",
      url: "https://nature.com",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      category: "Healthcare",
      summary: "Using a customized multi-modal transformer, medical researchers successfully synthesized a novel drug candidate to combat resistant bacterial infections in record time."
    }
  ]
};

// API endpoint to serve dynamic, cached dashboard data
app.post('/api/dashboard-data', async (req, res) => {
  const { profile, forceRefresh } = req.body;
  
  const cacheKey = 'dashboard_global';
  const now = Date.now();
  const cacheDuration = 30 * 60 * 1000; // 30 minutes
  
  // Check cache first
  const cached = dashboardCache[cacheKey];
  if (cached && !forceRefresh && (now - cached.timestamp < cacheDuration)) {
    console.log('Serving dashboard data from cache.');
    const userInterestsCount = profile ? (profile.interests?.length || 0) + (profile.skills?.length || 0) : 0;
    const enrichedData = {
      ...cached.data,
      stats: {
        ...cached.data.stats,
        userInterests: userInterestsCount
      },
      cachedAt: cached.timestamp
    };
    return res.json({ source: 'cache', data: enrichedData });
  }

  // If Gemini client is not initialized, run the fallback instantly
  if (!ai) {
    console.log('Gemini API client not initialized. Using premium pre-seeded fallback for dashboard.');
    const userInterestsCount = profile ? (profile.interests?.length || 0) + (profile.skills?.length || 0) : 0;
    const fallbackWithUserStats = {
      ...DEFAULT_DASHBOARD_DATA,
      stats: {
        ...DEFAULT_DASHBOARD_DATA.stats,
        userInterests: userInterestsCount
      }
    };
    // Cache it as well so we're consistent
    dashboardCache[cacheKey] = {
      timestamp: now,
      data: DEFAULT_DASHBOARD_DATA
    };
    return res.json({ source: 'seeded_fallback', data: fallbackWithUserStats, cachedAt: now });
  }

  try {
    console.log('Fetching fresh dynamic dashboard data using Gemini 3.5 Flash and Google Search Grounding...');
    
    const prompt = `
      You are an expert AI Industry Analyst and Researcher. Search the web and gather the absolute latest, most accurate data for the AI Intelligence Hub dashboard:
      
      1. Find 6 of the newest, most recently released real AI tools (released in late 2025 or 2026). Give actual emerging tools such as bolt.new, Gemini 3.5, Flux, Veo, etc.
      2. Find 4 of the latest, most relevant real-world AI news items from the past few days.
      3. Synthesize realistic dynamic stats representing:
         - totalAITools (the approximate count of public AI tools, e.g., between 800 and 1200)
         - researchPapers (the count of newly indexed AI research papers this month, e.g., between 100 and 200)
         - githubProjects (the count of trending AI repositories on GitHub, e.g., between 1000 and 1500)
         - aiNews (the number of curated AI news items available, e.g., between 20 and 40)
         - learningResources (the number of active AI courses, guides, and tutorials tracked, e.g., between 40 and 60)
         
      Ensure all output fits the requested schema exactly. For pricing, use only: 'Free', 'Paid', 'Open Source', or 'Freemium'.
      For logo, use ONLY: Cpu, Code, Palette, Zap, Film, Image, MessageSquare, Bot, HeartPulse, or GraduationCap.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stats: {
              type: Type.OBJECT,
              properties: {
                totalAITools: { type: Type.INTEGER },
                researchPapers: { type: Type.INTEGER },
                githubProjects: { type: Type.INTEGER },
                aiNews: { type: Type.INTEGER },
                learningResources: { type: Type.INTEGER }
              },
              required: ['totalAITools', 'researchPapers', 'githubProjects', 'aiNews', 'learningResources']
            },
            latestTools: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  category: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  pricing: { type: Type.STRING, description: "Must be exactly 'Free' | 'Paid' | 'Open Source' | 'Freemium'" },
                  pricingBadge: { type: Type.STRING },
                  popularityScore: { type: Type.INTEGER },
                  rating: { type: Type.NUMBER },
                  logo: { type: Type.STRING, description: "Must be Cpu, Code, Palette, Zap, Film, Image, MessageSquare, Bot, HeartPulse, or GraduationCap" },
                  visitUrl: { type: Type.STRING },
                  bestFor: { type: Type.STRING },
                  features: { type: Type.ARRAY, items: { type: Type.STRING } },
                  platforms: { type: Type.ARRAY, items: { type: Type.STRING } },
                  apiAvailable: { type: Type.BOOLEAN },
                  pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                  cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                  launchDate: { type: Type.STRING },
                  trendingScore: { type: Type.INTEGER }
                },
                required: [
                  'id', 'name', 'description', 'category', 'tags', 'pricing', 'pricingBadge',
                  'popularityScore', 'rating', 'logo', 'visitUrl', 'bestFor', 'features',
                  'platforms', 'apiAvailable', 'pros', 'cons', 'launchDate', 'trendingScore'
                ]
              }
            },
            latestNews: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  source: { type: Type.STRING },
                  time: { type: Type.STRING },
                  url: { type: Type.STRING },
                  image: { type: Type.STRING },
                  category: { type: Type.STRING },
                  summary: { type: Type.STRING }
                },
                required: ['id', 'title', 'source', 'time', 'url', 'image', 'category', 'summary']
              }
            }
          },
          required: ['stats', 'latestTools', 'latestNews']
        }
      }
    });

    const text = response.text;
    if (text) {
      const parsedData = JSON.parse(text);
      
      // Post-process values to ensure they comply with our exact enums and types
      parsedData.latestTools = parsedData.latestTools.map((tool: any) => {
        let p = tool.pricing;
        if (p !== 'Free' && p !== 'Paid' && p !== 'Open Source' && p !== 'Freemium') {
          if (p === 'Premium') p = 'Freemium';
          else p = 'Freemium';
        }
        let l = tool.logo;
        if (!['Cpu', 'Code', 'Palette', 'Zap', 'Film', 'Image', 'MessageSquare', 'Bot', 'HeartPulse', 'GraduationCap'].includes(l)) {
          l = 'Cpu';
        }
        return { ...tool, pricing: p, logo: l };
      });

      console.log('Successfully received dynamic dashboard data from Gemini API.');
      
      // Save in cache
      dashboardCache[cacheKey] = {
        timestamp: now,
        data: parsedData
      };

      const userInterestsCount = profile ? (profile.interests?.length || 0) + (profile.skills?.length || 0) : 0;
      const responseData = {
        ...parsedData,
        stats: {
          ...parsedData.stats,
          userInterests: userInterestsCount
        }
      };

      return res.json({ source: 'gemini_api_search', data: responseData, cachedAt: now });
    } else {
      throw new Error('Empty response text from Gemini API');
    }
  } catch (error) {
    console.error('Failed to fetch dynamic dashboard data, reverting to high-quality local fallback:', error);
    const userInterestsCount = profile ? (profile.interests?.length || 0) + (profile.skills?.length || 0) : 0;
    const fallbackWithUserStats = {
      ...DEFAULT_DASHBOARD_DATA,
      stats: {
        ...DEFAULT_DASHBOARD_DATA.stats,
        userInterests: userInterestsCount
      }
    };
    return res.json({ source: 'fallback_error_recovery', data: fallbackWithUserStats, cachedAt: now });
  }
});

// API endpoint for personalized AI recommendations
app.post('/api/personalized-insights', async (req, res) => {
  const { profile } = req.body;
  if (!profile) {
    return res.status(400).json({ error: 'Profile is required' });
  }

  // If Gemini client is not initialized, run the programmatic fallback instantly
  if (!ai) {
    console.log('Using robust fallback engine for profile:', profile.profession);
    return res.json({ source: 'local_engine', data: generateProgrammaticInsights(profile) });
  }

  try {
    const prompt = `
      You are an expert AI Discovery Strategist. I will provide you with a user's professional onboarding profile.
      Your job is to generate a highly personalized AI Strategy and Tool Recommendations.
      
      User Profile:
      - Name: ${profile.name}
      - Profession: ${profile.profession}
      - Industry: ${profile.industry}
      - Current Skills: ${JSON.stringify(profile.skills)}
      - Chosen Interests: ${JSON.stringify(profile.interests)}
      - Experience Level with AI: ${profile.experience}
      - Learning Goals: ${JSON.stringify(profile.learningGoals)}
      
      Please analyze this profile and return a JSON payload with:
      1. A short inspirational personalized headline (string).
      2. A concise 2-3 sentence strategic summary explaining why these tools match their profession, experience, and goals.
      3. A list of exactly 3 relevant insights or trends in AI that are directly impacting their field.
      4. A list of exactly 3 recommended AI tools. Each tool must have a "name", "description", a specific "useCase", and a brief explanation of "whyIdeal" for this user.
      5. A clear step-by-step action plan of exactly 3 steps for how they can start adopting these recommendations immediately.
    `;

    console.log(`Sending insights prompt to Gemini (gemini-3.5-flash) for user: ${profile.name}`);

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING, description: 'Inspirational personalized headline' },
            summary: { type: Type.STRING, description: '2-3 sentence profile summary' },
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Exactly 3 relevant AI trends or insights for their field'
            },
            recommendedTools: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: 'Name of the recommended AI tool' },
                  description: { type: Type.STRING, description: 'Brief description of what the tool does' },
                  useCase: { type: Type.STRING, description: 'Specific use case for this user' },
                  whyIdeal: { type: Type.STRING, description: 'Why this tool is ideal based on their profile' }
                },
                required: ['name', 'description', 'useCase', 'whyIdeal']
              },
              description: 'Exactly 3 custom recommended AI tools'
            },
            actionPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.STRING, description: 'Action item title' },
                  description: { type: Type.STRING, description: 'Clear implementation guide' }
                },
                required: ['step', 'description']
              },
              description: 'Exactly 3 action plan steps'
            }
          },
          required: ['headline', 'summary', 'insights', 'recommendedTools', 'actionPlan']
        }
      }
    });

    const text = response.text;
    if (text) {
      const parsedData = JSON.parse(text);
      console.log('Successfully received response from Gemini API.');
      return res.json({ source: 'gemini_api', data: parsedData });
    } else {
      throw new Error('Empty text response from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API call failed, reverting to robust local engine:', error);
    return res.json({ source: 'fallback_engine', data: generateProgrammaticInsights(profile) });
  }
});

// Vite server connection in development mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Mounted Vite Development Middlewares.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static assets.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Intelligence Hub full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
