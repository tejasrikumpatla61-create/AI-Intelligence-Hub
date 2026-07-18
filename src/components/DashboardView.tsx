import { useState } from 'react';
import { OnboardingProfile, AITool, NewsItem, GeminiInsights, BookmarkCollection } from '../types';
import { SEEDED_AI_TOOLS, SEEDED_NEWS } from '../data';
import { 
  Sparkles, 
  ArrowRight, 
  Bookmark, 
  Compass, 
  TrendingUp, 
  Cpu, 
  Code, 
  Palette, 
  Zap, 
  Film, 
  Image, 
  MessageSquare, 
  Bot, 
  HeartPulse, 
  GraduationCap, 
  ChevronRight, 
  Activity, 
  Calendar, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Award,
  BookOpen,
  ArrowUpRight,
  Clock,
  RefreshCw
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, Code, Palette, Zap, Film, Image, MessageSquare, Bot, HeartPulse, GraduationCap
};

interface DashboardViewProps {
  profile: OnboardingProfile;
  insights: GeminiInsights | null;
  loadingInsights: boolean;
  bookmarkedIds: { id: string; collection: BookmarkCollection }[];
  onToggleBookmark: (toolId: string, collection: BookmarkCollection) => void;
  onNavigateToView: (view: string) => void;
  onTriggerCompare: (tool: AITool) => void;
  
  // New dynamic dashboard data props
  stats: {
    totalAITools: number;
    researchPapers: number;
    githubProjects: number;
    aiNews: number;
    learningResources: number;
    userInterests: number;
  } | null;
  latestTools: AITool[];
  latestNews: NewsItem[];
  loadingDashboard: boolean;
  dashboardError: string | null;
  onManualRefresh: () => void;
  lastUpdated: number | null;
}

export default function DashboardView({
  profile,
  insights,
  loadingInsights,
  bookmarkedIds,
  onToggleBookmark,
  onNavigateToView,
  onTriggerCompare,
  stats,
  latestTools,
  latestNews,
  loadingDashboard,
  dashboardError,
  onManualRefresh,
  lastUpdated
}: DashboardViewProps) {
  const [expandedToolId, setExpandedToolId] = useState<string | null>(null);
  const [activeCollectionToSave, setActiveCollectionToSave] = useState<{ [key: string]: BookmarkCollection }>({});

  // Combine pre-seeded tools and newly fetched live tools for a richer pool
  const masterToolsList = (() => {
    const map: Record<string, AITool> = {};
    SEEDED_AI_TOOLS.forEach(tool => {
      map[tool.id] = tool;
    });
    if (latestTools) {
      latestTools.forEach(tool => {
        map[tool.id] = tool;
      });
    }
    return Object.values(map);
  })();

  // Filter tools relevant to user interests or categories from master list
  const personalizedTools = masterToolsList.filter(tool => {
    const categoryLower = tool.category.toLowerCase();
    const matchesInterest = profile.interests.some(interestId => {
      if (interestId === 'coding' && categoryLower.includes('coding')) return true;
      if (interestId === 'design' && categoryLower.includes('design')) return true;
      if (interestId === 'productivity' && categoryLower.includes('productiv')) return true;
      if (interestId === 'llms' && categoryLower.includes('llm')) return true;
      if (interestId === 'healthcare' && categoryLower.includes('health')) return true;
      if (interestId === 'video-gen' && categoryLower.includes('video')) return true;
      return false;
    });
    return matchesInterest;
  });

  // If none match, show top 3 tools
  const displayTools = personalizedTools.length > 0 ? personalizedTools : masterToolsList.slice(0, 3);

  // Trending AI Tools sorted by trendingScore
  const trendingTools = [...masterToolsList].sort((a, b) => b.trendingScore - a.trendingScore);

  // Quick Stats - 6 dynamic categories matching user interests and fetched database content
  const statCards = [
    { 
      label: 'Total AI Tools', 
      value: stats ? stats.totalAITools.toLocaleString() : '412', 
      change: 'Vetted & categorized', 
      icon: Cpu, 
      color: 'text-purple-400' 
    },
    { 
      label: 'Research Papers', 
      value: stats ? stats.researchPapers.toLocaleString() : '118', 
      change: 'Indexed this month', 
      icon: BookOpen, 
      color: 'text-cyan-400' 
    },
    { 
      label: 'GitHub Projects', 
      value: stats ? stats.githubProjects.toLocaleString() : '1,045', 
      change: 'Trending repositories', 
      icon: Code, 
      color: 'text-emerald-400' 
    },
    { 
      label: 'AI News Today', 
      value: stats ? stats.aiNews.toString() : '24', 
      change: 'Real-time updates', 
      icon: Zap, 
      color: 'text-amber-400' 
    },
    { 
      label: 'Learning Guides', 
      value: stats ? stats.learningResources.toString() : '45', 
      change: 'Courses & docs', 
      icon: GraduationCap, 
      color: 'text-indigo-400' 
    },
    { 
      label: 'User Interests Tracked', 
      value: stats ? stats.userInterests.toString() : (profile.interests.length + profile.skills.length).toString(), 
      change: 'Custom feed matches', 
      icon: Activity, 
      color: 'text-pink-400' 
    }
  ];

  const handleCollectionSelect = (toolId: string, col: BookmarkCollection) => {
    setActiveCollectionToSave(prev => ({ ...prev, [toolId]: col }));
    onToggleBookmark(toolId, col);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      
      {/* Top dashboard control panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-zinc-950/25 border border-white/5 p-4 rounded-2xl gap-3 text-left">
        <div className="flex items-center space-x-2.5">
          <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
          <span className="text-xs text-zinc-400">
            {lastUpdated 
              ? `Last synced: ${new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
              : 'Syncing real-time updates...'
            }
          </span>
          {lastUpdated && (
            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
              Live Feed Active
            </span>
          )}
        </div>
        
        <button
          id="dash-manual-refresh-btn"
          onClick={onManualRefresh}
          disabled={loadingDashboard}
          className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 active:scale-95 text-xs font-bold rounded-xl border border-white/10 text-white flex items-center space-x-1.5 cursor-pointer transition-all disabled:opacity-50 disabled:pointer-events-none self-stretch sm:self-auto justify-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingDashboard ? 'animate-spin text-purple-400' : 'text-zinc-400'}`} />
          <span>{loadingDashboard ? 'Synchronizing...' : 'Refresh Hub'}</span>
        </button>
      </div>

      {/* Sync Error recovery banner */}
      {dashboardError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center space-x-3 text-rose-400 text-xs text-left animate-fade-in">
          <Info className="w-5 h-5 text-rose-500 shrink-0" />
          <div className="flex-1">
            <span className="font-semibold">Sync Alert: </span>
            {dashboardError}. Showing offline-safe cache instead.
          </div>
          <button 
            onClick={onManualRefresh}
            className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg font-bold border border-rose-500/35 transition-colors cursor-pointer shrink-0"
          >
            Retry Sync
          </button>
        </div>
      )}
      
      {/* Top Welcome Widget */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Welcome Block */}
        <div className="flex-1 p-8 bg-gradient-to-br from-zinc-950 via-purple-950/10 to-indigo-950/5 border border-white/5 rounded-3xl flex flex-col justify-between text-white relative overflow-hidden shadow-2xl">
          {/* Neon Orb Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-semibold text-purple-300">
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
              <span>Personalized Strategy Hub</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Good Morning, {profile.name} 👋
              </h1>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                We analyzed your role as a <span className="font-semibold text-slate-200">{profile.profession}</span> in the <span className="font-semibold text-slate-200">{profile.industry}</span> sector. Your personalized insights model has successfully compiled 3 tactical AI accelerators.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6 lg:pt-10 border-t border-white/5 mt-6">
            <div className="flex flex-wrap gap-1">
              {profile.interests.slice(0, 3).map(id => (
                <span key={id} className="text-[10px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-full capitalize text-zinc-300">
                  # {id}
                </span>
              ))}
            </div>
            <div className="flex-1"></div>
            <button
              id="dash-explore-cta"
              onClick={() => onNavigateToView('discover')}
              className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-bold rounded-xl flex items-center space-x-1 transition-all cursor-pointer shadow-sm"
            >
              <span>Browse 200+ Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Gemini Insights Block */}
        <div className="w-full lg:w-96 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Gemini Strategy</h3>
              </div>
              <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-zinc-400">
                Active
              </span>
            </div>

            {loadingInsights ? (
              <div className="py-8 space-y-3">
                <div className="h-4 bg-white/5 animate-pulse rounded w-3/4"></div>
                <div className="h-3 bg-white/5 animate-pulse rounded w-full"></div>
                <div className="h-3 bg-white/5 animate-pulse rounded w-5/6"></div>
                <div className="h-12 bg-white/5 animate-pulse rounded-xl w-full mt-4"></div>
              </div>
            ) : insights ? (
              <div className="space-y-3.5">
                <h4 className="text-sm font-semibold text-white line-clamp-1 border-b border-white/5 pb-1.5">
                  {insights.headline}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-4">
                  {insights.summary}
                </p>
                
                {/* Micro trend bullet list */}
                <div className="space-y-2 pt-2">
                  {insights.insights.slice(0, 2).map((bullet, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></div>
                      <p className="text-[10px] text-zinc-300 leading-relaxed line-clamp-2">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-2">
                <Info className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-xs text-zinc-500">Complete onboarding to build custom strategy insights.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/5 mt-4">
            <button
              id="dash-open-profile-cta"
              onClick={() => onNavigateToView('profile')}
              className="w-full text-center text-[11px] font-semibold text-zinc-400 hover:text-white cursor-pointer"
            >
              Refine My Onboarding Settings
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {loadingDashboard ? (
          [...Array(6)].map((_, idx) => (
            <div key={idx} className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl space-y-3 text-left relative overflow-hidden animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-3 bg-white/5 rounded w-2/3"></div>
                <div className="w-4 h-4 bg-white/5 rounded-full"></div>
              </div>
              <div className="h-6 bg-white/5 rounded w-1/2"></div>
              <div className="h-2.5 bg-white/5 rounded w-5/6"></div>
            </div>
          ))
        ) : (
          statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-5 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl space-y-1 text-left relative overflow-hidden group hover:border-purple-500/25 transition-all">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider line-clamp-1">{stat.label}</span>
                  <Icon className={`w-4 h-4 ${stat.color} transition-transform group-hover:scale-110 shrink-0`} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-[9px] text-zinc-500 line-clamp-1">{stat.change}</p>
              </div>
            );
          })
        )}
      </div>
      {/* Main Content Layout Block: Split Suggested Tools & Sidebar widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
        
        {/* Left column: AI Recommendations */}
        <div className="xl:col-span-2 space-y-6 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4.5 h-4.5 text-purple-400 animate-pulse" />
              <h2 className="text-lg font-semibold text-white tracking-tight">Your Personalized AI Strategy Card</h2>
            </div>
            <span className="text-xs text-zinc-500">Updated today</span>
          </div>

          {/* If loading insights, show card skeleton */}
          {loadingInsights ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 bg-zinc-950/30 animate-pulse rounded-2xl border border-white/5"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* If we have Gemini insights recommendedTools, display them alongside custom seed components */}
              {insights && insights.recommendedTools ? (
                <div className="space-y-4">
                  <div className="p-5 bg-purple-950/10 border border-purple-500/10 rounded-2xl">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-3">AI Discovery Strategist Suggestions</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {insights.recommendedTools.map((recTool, recIdx) => (
                        <div key={recIdx} className="p-3.5 bg-zinc-950/40 border border-white/5 rounded-xl space-y-1.5 text-left">
                          <h4 className="text-xs font-semibold text-white">{recTool.name}</h4>
                          <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded font-semibold border border-purple-500/20">{recTool.useCase}</span>
                          <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">{recTool.description}</p>
                          <div className="pt-1.5 border-t border-white/5">
                            <p className="text-[9px] text-purple-400 italic line-clamp-2">Ideal: {recTool.whyIdeal}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="space-y-3.5 animate-fade-in">
                {displayTools.map(tool => {
                  const Icon = iconMap[tool.logo] || Cpu;
                  const isSaved = bookmarkedIds.some(b => b.id === tool.id);
                  const isExpanded = expandedToolId === tool.id;
                  
                  return (
                    <div 
                      key={tool.id} 
                      className="p-5 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300 flex flex-col space-y-3 text-left relative group animate-fade-in"
                    >
                      {/* Top bar */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3.5">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-sm font-semibold text-white">{tool.name}</h3>
                              <span className="text-[10px] font-medium text-zinc-500">{tool.category}</span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{tool.description}</p>
                          </div>
                        </div>

                        {/* Top action links */}
                        <div className="flex items-center space-x-1.5">
                          {/* Bookmark popover widget */}
                          <div className="relative group/bookmark-drop">
                            <button
                              id={`dash-save-${tool.id}`}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                isSaved 
                                  ? 'bg-purple-500/20 border-purple-500/35 text-purple-300' 
                                  : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5 fill-current" />
                            </button>
                            
                            {/* Collection dropdown selector popup */}
                            <div className="absolute right-0 top-full mt-1 bg-zinc-950 border border-white/5 rounded-lg shadow-2xl p-1.5 hidden group-hover/bookmark-drop:block z-20 w-36">
                              <p className="text-[8px] uppercase tracking-wider text-zinc-500 font-semibold px-1.5 mb-1">Save to Collection</p>
                              {['Work', 'Learning', 'Favorites', 'Productivity'].map(col => {
                                const isCurrentCollection = bookmarkedIds.some(b => b.id === tool.id && b.collection === col);
                                return (
                                  <button
                                    id={`dash-save-col-${tool.id}-${col.toLowerCase()}`}
                                    key={col}
                                    onClick={() => handleCollectionSelect(tool.id, col as BookmarkCollection)}
                                    className={`w-full text-left text-[10px] px-2 py-1 rounded hover:bg-white/5 font-medium cursor-pointer ${
                                      isCurrentCollection ? 'text-purple-300 font-bold bg-purple-950/20' : 'text-zinc-400'
                                    }`}
                                  >
                                    {col} {isCurrentCollection && '✓'}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <a
                            id={`dash-visit-${tool.id}`}
                            href={tool.visitUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Middle tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full font-medium">
                          {tool.pricingBadge}
                        </span>
                        <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium flex items-center space-x-1">
                          <span>Rating: {tool.rating}</span>
                        </span>
                        <span className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full font-medium">
                          Popularity: {tool.popularityScore}%
                        </span>
                        <div className="flex-1"></div>
                        <button
                          id={`dash-toggle-learn-${tool.id}`}
                          onClick={() => setExpandedToolId(isExpanded ? null : tool.id)}
                          className="text-[10px] font-semibold text-purple-400 hover:text-purple-300 hover:underline flex items-center space-x-0.5 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      {/* Expandable detailed section */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-white/5 space-y-3 text-xs animate-fade-in">
                          <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                            <span className="font-semibold text-white">Best for: </span>
                            {tool.bestFor}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                            {/* Pros */}
                            <div className="bg-emerald-950/10 border border-emerald-500/10 p-3 rounded-xl">
                              <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5">Key Strengths (Pros)</h4>
                              <ul className="space-y-1 text-[10px]">
                                {tool.pros.map((p, i) => <li key={i} className="text-zinc-300">• {p}</li>)}
                              </ul>
                            </div>

                            {/* Cons */}
                            <div className="bg-rose-950/10 border border-rose-500/10 p-3 rounded-xl">
                              <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1.5">Trade-offs (Cons)</h4>
                              <ul className="space-y-1 text-[10px]">
                                {tool.cons.map((p, i) => <li key={i} className="text-zinc-300">• {p}</li>)}
                              </ul>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 pt-2">
                            <button
                              id={`dash-compare-btn-${tool.id}`}
                              onClick={() => onTriggerCompare(tool)}
                              className="text-[10px] bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Add to Compare Matrix
                            </button>
                            <span className="text-[9px] text-zinc-500">Launch Date: {tool.launchDate}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Latest AI Tools & Releases Section */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4.5 h-4.5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white tracking-tight">Latest AI Tools & Releases</h2>
              </div>
              <span className="text-xs text-zinc-500">Real-time web verified</span>
            </div>
            
            {loadingDashboard ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-zinc-950/30 animate-pulse rounded-2xl border border-white/5"></div>
                ))}
              </div>
            ) : latestTools.length === 0 ? (
              <div className="p-8 bg-zinc-950/30 border border-white/5 rounded-2xl text-center space-y-2">
                <Info className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-xs text-zinc-500">No new tools currently stored. Tap Refresh Hub above to load fresh search data.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {latestTools.slice(0, 6).map(tool => {
                  const Icon = iconMap[tool.logo] || Cpu;
                  const isSaved = bookmarkedIds.some(b => b.id === tool.id);
                  const isExpanded = expandedToolId === tool.id;
                  
                  return (
                    <div 
                      key={tool.id} 
                      className="p-4 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/20 transition-all flex flex-col justify-between text-left relative group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                              <Icon className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-white leading-none">{tool.name}</h4>
                              <span className="text-[9px] text-zinc-500 mt-1 inline-block">{tool.category}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleCollectionSelect(tool.id, 'Productivity')}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                isSaved 
                                  ? 'bg-purple-500/20 border-purple-500/30 text-purple-300' 
                                  : 'border-white/10 bg-white/5 text-zinc-500 hover:text-white'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <a
                              href={tool.visitUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-zinc-500 hover:text-white"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2">{tool.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3">
                        <span className="text-[9px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-semibold border border-purple-500/15">
                          {tool.pricingBadge}
                        </span>
                        <button
                          onClick={() => {
                            setExpandedToolId(isExpanded ? null : tool.id);
                          }}
                          className="text-[9px] font-semibold text-purple-400 hover:text-purple-300 hover:underline flex items-center space-x-0.5 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                          {isExpanded ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="pt-3 border-t border-white/5 mt-3 space-y-2 text-[10px] text-zinc-300 animate-fade-in">
                          <p><span className="font-semibold text-white">Best For:</span> {tool.bestFor}</p>
                          <p><span className="font-semibold text-white">Launch Date:</span> {tool.launchDate}</p>
                          <p><span className="font-semibold text-white">Popularity Score:</span> {tool.popularityScore}%</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {tool.tags.map(t => <span key={t} className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-zinc-400">#{t}</span>)}
                          </div>
                          <div className="pt-2">
                            <button
                              onClick={() => onTriggerCompare(tool)}
                              className="w-full text-center text-[9px] bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Compare Tool
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

               {/* Trending Section inside left column */}
          <div className="space-y-4 pt-4 animate-fade-in">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4.5 h-4.5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white tracking-tight">Trending This Week</h2>
            </div>
            
            {/* Horizontal Scroll wrapper */}
            <div className="flex space-x-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
              {trendingTools.slice(0, 4).map(tool => {
                const Icon = iconMap[tool.logo] || Cpu;
                return (
                  <div 
                    key={tool.id}
                    className="w-64 shrink-0 bg-zinc-950/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between snap-start hover:border-purple-500/20 transition-all duration-300 shadow-xl backdrop-blur-xl"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex items-center space-x-1 bg-purple-950/40 border border-purple-500/15 px-1.5 py-0.5 rounded text-[9px] font-bold text-purple-300">
                          <TrendingUp className="w-2.5 h-2.5 animate-bounce" />
                          <span>Score: {tool.trendingScore}%</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-white">{tool.name}</h4>
                      <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">{tool.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3.5">
                      <span className="text-[9px] text-zinc-500">{tool.category}</span>
                      <button
                        id={`dash-trend-learn-${tool.id}`}
                        onClick={() => {
                          setExpandedToolId(tool.id);
                        }}
                        className="text-[9px] font-semibold text-purple-400 hover:text-purple-300 hover:underline flex items-center space-x-0.5 cursor-pointer"
                      >
                        <span>Learn</span>
                        <ChevronRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Weekly Digest (Timeline) & Latest AI News */}
        <div className="space-y-6 text-left">
          
          {/* Latest News Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white tracking-tight">Latest AI News</h2>
              <button
                id="dash-view-news-all"
                onClick={() => onNavigateToView('discover')}
                className="text-xs text-purple-400 hover:text-purple-300 hover:underline font-semibold cursor-pointer"
              >
                Browse All
              </button>
            </div>

            {loadingDashboard ? (
              <div className="space-y-3.5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-zinc-950/30 border border-white/5 rounded-2xl h-44 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3.5">
                {(latestNews && latestNews.length > 0 ? latestNews.slice(0, 3) : SEEDED_NEWS.slice(0, 3)).map(news => (
                  <div 
                    key={news.id}
                    className="bg-zinc-950/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl hover:border-purple-500/20 transition-all duration-300"
                  >
                    <div className="h-28 overflow-hidden relative">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80" 
                      />
                      <div className="absolute top-2 left-2 bg-purple-600/90 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
                        {news.category}
                      </div>
                    </div>
                    <div className="p-3.5 space-y-1.5 text-left">
                      <div className="flex items-center justify-between text-[9px] text-zinc-500">
                        <span>{news.source}</span>
                        <span>• {news.time}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-white leading-snug line-clamp-2">
                        {news.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2">
                        {news.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weekly Action Plan / Digest */}
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-semibold text-white tracking-tight">Weekly Roadmap Action Plan</h2>
            
            <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-5 shadow-2xl">
              {insights && insights.actionPlan ? (
                <div className="space-y-4">
                  {insights.actionPlan.map((stepItem, sIdx) => (
                    <div key={sIdx} className="flex space-x-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-400">
                          {sIdx + 1}
                        </div>
                        {sIdx < insights.actionPlan.length - 1 && (
                          <div className="w-0.5 h-10 bg-white/5 my-1"></div>
                        )}
                      </div>
                      <div className="space-y-0.5 text-left">
                        <h4 className="text-xs font-semibold text-white">{stepItem.step}</h4>
                        <p className="text-[10px] text-zinc-400 leading-relaxed">{stepItem.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex space-x-3 text-left">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center text-[9px] font-bold text-purple-400">1</div>
                      <div className="w-0.5 h-8 bg-white/5 my-1"></div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Integrate Cursor Code IDE</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed">Adopt context-aware AI programming right inside your active folder paths.</p>
                    </div>
                  </div>

                  <div className="flex space-x-3 text-left">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center text-[9px] font-bold text-purple-400">2</div>
                      <div className="w-0.5 h-8 bg-white/5 my-1"></div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Model UI assets with v0</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed">Generate high-fidelity mockup prototypes, bypassing static wireframes.</p>
                    </div>
                  </div>

                  <div className="flex space-x-3 text-left">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center text-[9px] font-bold text-purple-400">3</div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Research with NotebookLM</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed">Assemble customized study files or audio overviews from private documents.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
