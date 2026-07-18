import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Compass, 
  TrendingUp, 
  FolderHeart, 
  Settings, 
  ChevronDown, 
  Sparkle
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import LoginSignup from './components/LoginSignup';
import DashboardView from './components/DashboardView';
import DiscoverView from './components/DiscoverView';
import CompareView from './components/CompareView';
import BookmarksView from './components/BookmarksView';
import NotificationsView from './components/NotificationsView';
import ProfileView from './components/ProfileView';
import { OnboardingProfile, AITool, Notification, BookmarkCollection, GeminiInsights, NewsItem } from './types';
import { SEEDED_AI_TOOLS, SEEDED_NOTIFICATIONS, DEFAULT_MOCK_INSIGHTS } from './data';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const cached = localStorage.getItem('hub-theme');
    return (cached === 'light' ? 'light' : 'dark');
  });

  // Session / User states
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const cached = localStorage.getItem('hub-user');
    return cached ? JSON.parse(cached) : null;
  });

  const [profile, setProfile] = useState<OnboardingProfile | null>(() => {
    const cached = localStorage.getItem('hub-profile');
    return cached ? JSON.parse(cached) : null;
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('hub-onboarded') === 'true';
  });

  // Navigation and overlay states
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [authOverlayMode, setAuthOverlayMode] = useState<'login' | 'signup' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Bookmarks & compares
  const [bookmarkedIds, setBookmarkedIds] = useState<{ id: string; collection: BookmarkCollection }[]>(() => {
    const cached = localStorage.getItem('hub-bookmarks');
    return cached ? JSON.parse(cached) : [];
  });

  const [compareList, setCompareList] = useState<AITool[]>([]);

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const cached = localStorage.getItem('hub-notifications');
    return cached ? JSON.parse(cached) : SEEDED_NOTIFICATIONS;
  });

  // Backend Insights state
  const [insights, setInsights] = useState<GeminiInsights | null>(() => {
    const cached = localStorage.getItem('hub-insights');
    return cached ? JSON.parse(cached) : null;
  });
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Dashboard dynamic stats, news, and tools state
  const [stats, setStats] = useState<{
    totalAITools: number;
    researchPapers: number;
    githubProjects: number;
    aiNews: number;
    learningResources: number;
    userInterests: number;
  } | null>(() => {
    const cached = localStorage.getItem('hub-dashboard-stats');
    return cached ? JSON.parse(cached) : null;
  });

  const [latestTools, setLatestTools] = useState<AITool[]>(() => {
    const cached = localStorage.getItem('hub-dashboard-tools');
    return cached ? JSON.parse(cached) : [];
  });

  const [latestNews, setLatestNews] = useState<NewsItem[]>(() => {
    const cached = localStorage.getItem('hub-dashboard-news');
    return cached ? JSON.parse(cached) : [];
  });

  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(() => {
    const cached = localStorage.getItem('hub-dashboard-updated');
    return cached ? Number(cached) : null;
  });

  // Sync state changes to LocalStorage and Document Element class
  useEffect(() => {
    localStorage.setItem('hub-theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('hub-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hub-user');
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('hub-profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('hub-profile');
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('hub-onboarded', isOnboarded ? 'true' : 'false');
  }, [isOnboarded]);

  useEffect(() => {
    localStorage.setItem('hub-bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('hub-notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (insights) {
      localStorage.setItem('hub-insights', JSON.stringify(insights));
    } else {
      localStorage.removeItem('hub-insights');
    }
  }, [insights]);

  useEffect(() => {
    if (stats) {
      localStorage.setItem('hub-dashboard-stats', JSON.stringify(stats));
    } else {
      localStorage.removeItem('hub-dashboard-stats');
    }
  }, [stats]);

  useEffect(() => {
    if (latestTools && latestTools.length > 0) {
      localStorage.setItem('hub-dashboard-tools', JSON.stringify(latestTools));
    } else {
      localStorage.removeItem('hub-dashboard-tools');
    }
  }, [latestTools]);

  useEffect(() => {
    if (latestNews && latestNews.length > 0) {
      localStorage.setItem('hub-dashboard-news', JSON.stringify(latestNews));
    } else {
      localStorage.removeItem('hub-dashboard-news');
    }
  }, [latestNews]);

  useEffect(() => {
    if (lastUpdated) {
      localStorage.setItem('hub-dashboard-updated', lastUpdated.toString());
    } else {
      localStorage.removeItem('hub-dashboard-updated');
    }
  }, [lastUpdated]);

  const fetchDashboardData = async (forceRefresh = false) => {
    // If we have cached data and it's less than 30 minutes old, don't auto-fetch unless forced
    const cacheDuration = 30 * 60 * 1000;
    const now = Date.now();
    if (lastUpdated && (now - lastUpdated < cacheDuration) && !forceRefresh && stats) {
      console.log('Using cached dashboard dataset.');
      return;
    }

    setLoadingDashboard(true);
    setDashboardError(null);
    try {
      console.log('Requesting fresh dashboard dataset from backend API...', forceRefresh ? '(Forced)' : '(Standard)');
      const res = await fetch('/api/dashboard-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profile, forceRefresh })
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const payload = await res.json();
      if (payload && payload.data) {
        setStats(payload.data.stats);
        setLatestTools(payload.data.latestTools);
        setLatestNews(payload.data.latestNews);
        setLastUpdated(payload.cachedAt || Date.now());
        console.log('Successfully synchronized dashboard dataset from server. Source:', payload.source);
      } else {
        throw new Error('Invalid response structure from dashboard api');
      }
    } catch (err: any) {
      console.error('Failed to sync dashboard from server:', err);
      setDashboardError(err.message || 'Network sync lost');
    } finally {
      setLoadingDashboard(false);
    }
  };

  // Trigger Gemini API Insights via full-stack Express service
  const fetchGeminiInsights = async (userProfile: OnboardingProfile) => {
    setLoadingInsights(true);
    try {
      console.log('Requesting insights from backend API...', userProfile.profession);
      const res = await fetch('/api/personalized-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profile: userProfile })
      });
      const payload = await res.json();
      if (payload && payload.data) {
        setInsights(payload.data);
        console.log('Received insights successfully. Source:', payload.source);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      console.error('Insights fetch failed, building smart default mock strategy...', err);
      // Grabbing curated static fallback
      const fallback = DEFAULT_MOCK_INSIGHTS[userProfile.profession] || DEFAULT_MOCK_INSIGHTS.default;
      setInsights(fallback);
    } finally {
      setLoadingInsights(false);
    }
  };

  // Synchronize dashboard and insights on mount / onboarding change
  useEffect(() => {
    if (profile && isOnboarded) {
      if (!insights) {
        fetchGeminiInsights(profile);
      }
      fetchDashboardData(false);
    }
  }, [profile, isOnboarded]);

  // Establish standard 30-minute auto-refresh interval for real-time compliance
  useEffect(() => {
    if (isOnboarded) {
      const interval = setInterval(() => {
        console.log('Background Interval Triggered: Synchronizing AI Hub dataset...');
        fetchDashboardData(true);
      }, 30 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isOnboarded]);

  // View handlers
  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setAuthOverlayMode(null);
    
    // Add custom notification
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      type: 'recommendation',
      title: `Welcome to the Hub, ${userData.name}!`,
      description: 'Complete your 3-step onboarding to receive customized AI recommendations.',
      time: 'Just now',
      unread: true
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleOnboardingComplete = (onboardingProfile: OnboardingProfile) => {
    setProfile(onboardingProfile);
    setIsOnboarded(true);
    fetchGeminiInsights(onboardingProfile);

    // Trigger notification
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      type: 'digest',
      title: 'Strategy Feed Synthesized Successfully',
      description: `Your custom dashboard is live. Explore curated tools matching your expertise in ${onboardingProfile.industry}.`,
      time: 'Just now',
      unread: true
    };
    setNotifications([newNotif, ...notifications]);
    setActiveView('dashboard');
  };

  const handleUpdateProfileSettings = (updatedProfile: OnboardingProfile) => {
    setProfile(updatedProfile);
    fetchGeminiInsights(updatedProfile);
  };

  const handleToggleBookmark = (toolId: string, col: BookmarkCollection) => {
    const exists = bookmarkedIds.some(b => b.id === toolId && b.collection === col);
    if (exists) {
      setBookmarkedIds(bookmarkedIds.filter(b => !(b.id === toolId && b.collection === col)));
    } else {
      // Remove same tool from any other collection to keep it clean, or allow duplicates. Let's filter first:
      const filtered = bookmarkedIds.filter(b => b.id !== toolId);
      setBookmarkedIds([...filtered, { id: toolId, collection: col }]);
    }
  };

  const handleTriggerCompare = (tool: AITool) => {
    if (compareList.some(c => c.id === tool.id)) return;
    if (compareList.length >= 3) {
      // Shift out first item if full
      setCompareList([...compareList.slice(1), tool]);
    } else {
      setCompareList([...compareList, tool]);
    }
    setActiveView('compare');
  };

  const handleRemoveFromCompare = (toolId: string) => {
    setCompareList(compareList.filter(c => c.id !== toolId));
  };

  const handleAddToCompareDirect = (tool: AITool) => {
    if (compareList.length < 3 && !compareList.some(c => c.id === tool.id)) {
      setCompareList([...compareList, tool]);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    setIsOnboarded(false);
    setInsights(null);
    setBookmarkedIds([]);
    setCompareList([]);
    localStorage.removeItem('hub-user');
    localStorage.removeItem('hub-profile');
    localStorage.removeItem('hub-onboarded');
    localStorage.removeItem('hub-insights');
    localStorage.removeItem('hub-bookmarks');
    setActiveView('dashboard');
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Navigations sidebar items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'compare', label: 'Compare', icon: TrendingUp },
    { id: 'bookmarks', label: 'Bookmarks', icon: FolderHeart },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications.filter(n => n.unread).length },
    { id: 'profile', label: 'Profile Settings', icon: Settings }
  ];

  // Guest Exploration flow
  const handleGuestExplore = () => {
    setUser({
      name: 'Guest Explorer',
      email: 'guest@aihub.com'
    });
    // Skip onboarding defaults
    setProfile({
      name: 'Guest Explorer',
      email: 'guest@aihub.com',
      profession: 'Software Engineer',
      industry: 'Technology',
      skills: ['Python', 'React', 'AI'],
      interests: ['coding', 'productivity'],
      experience: 'Intermediate',
      learningGoals: ['boost-prod', 'stay-updated']
    });
    setIsOnboarded(true);
    setActiveView('discover');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="bg-slate-50 text-zinc-900 dark:bg-[#080808] dark:text-slate-200 min-h-screen font-sans relative overflow-hidden transition-colors duration-300">
        {/* Glow gradients behind everything */}
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
        
        {/* If user is completely logged out and not onboarded, show premium landing page */}
        {!user && !isOnboarded ? (
          <div>
            {authOverlayMode ? (
              <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 dark:bg-[#08080a] relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 w-full max-w-md">
                  <div className="mb-4 text-left">
                    <button
                      id="auth-back-to-landing-btn"
                      onClick={() => setAuthOverlayMode(null)}
                      className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white flex items-center space-x-1 cursor-pointer"
                    >
                      <span>← Back to Landing</span>
                    </button>
                  </div>
                  <LoginSignup 
                    initialMode={authOverlayMode}
                    onSuccess={handleLoginSuccess}
                  />
                </div>
              </div>
            ) : (
              <LandingPage 
                onGetStarted={() => setAuthOverlayMode('signup')}
                onExplore={handleGuestExplore}
              />
            )}
          </div>
        ) : user && !isOnboarded ? (
          /* Multi step onboarding wizard */
          <div className="min-h-screen bg-slate-50 dark:bg-[#080808] p-4 sm:p-6 lg:p-8 flex items-center justify-center relative">
            <Onboarding 
              initialEmail={user.email}
              initialName={user.name}
              onComplete={handleOnboardingComplete}
            />
          </div>
        ) : (
          /* Core SaaS Dashboard workspace layout */
          <div className="flex h-screen overflow-hidden relative z-10">
            
            {/* Desktop Left Sidebar */}
            <aside className="w-64 hidden lg:flex flex-col bg-white dark:bg-zinc-950/50 backdrop-blur-xl border-r border-zinc-200 dark:border-white/5 h-full p-5 justify-between select-none transition-colors duration-300">
              <div className="space-y-6">
                
                {/* Logo */}
                <div className="flex items-center gap-3 px-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center shrink-0">
                    <div className="w-3.5 h-3.5 bg-white rounded-full animate-pulse" />
                  </div>
                  <span className="font-bold tracking-tight text-zinc-800 dark:text-white text-sm">
                    AI Intelligence Hub
                  </span>
                </div>
 
                {/* Navigation Links */}
                <nav className="space-y-1">
                  {sidebarItems.map(item => {
                    const isActive = activeView === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        id={`sidebar-link-${item.id}`}
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white border-zinc-200 dark:border-white/10 font-bold shadow-sm' 
                            : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 hover:dark:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                           <Icon className="w-4.5 h-4.5 shrink-0" />
                           <span>{item.label}</span>
                        </div>
                        {item.count && item.count > 0 ? (
                          <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${
                            isActive ? 'bg-zinc-200 dark:bg-white/10 text-zinc-800 dark:text-white' : 'bg-purple-500 text-white animate-pulse'
                          }`}>
                            {item.count}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </nav>
              </div>
 
              {/* Bottom logout / Profile block */}
              <div className="pt-4 border-t border-zinc-200 dark:border-white/5 space-y-3.5">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shrink-0 flex items-center justify-center text-white font-bold text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-medium text-zinc-800 dark:text-white truncate">{user?.name}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
                  </div>
                </div>
 
                <button
                  id="sidebar-logout-btn"
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </aside>

            {/* Mobile Slide-out sidebar drawer */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-40 lg:hidden flex">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                <div className="relative w-64 bg-white dark:bg-[#0a0a0c] h-full p-4 flex flex-col justify-between border-r border-gray-100 dark:border-gray-900 z-50">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-xs">Intelligence Hub</span>
                      </div>
                      <button onClick={() => setMobileMenuOpen(false)}>
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    <nav className="space-y-1">
                      {sidebarItems.map(item => {
                        const isActive = activeView === item.id;
                        const Icon = item.icon;
                        return (
                          <button
                            id={`mobile-sidebar-link-${item.id}`}
                            key={item.id}
                            onClick={() => {
                              setActiveView(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl ${
                              isActive ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </div>
                            {item.count && item.count > 0 && (
                              <span className="bg-purple-500 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                                {item.count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-gray-900">
                    <button
                      id="mobile-sidebar-logout-btn"
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out Session</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Core Work View Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
              
              {/* Workspace Top Header */}
              <header className="h-16 border-b border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-950/30 backdrop-blur-md flex items-center justify-between px-6 z-30 select-none transition-colors duration-300">
                
                <div className="flex items-center space-x-4">
                  <button
                    id="mobile-menu-trigger-btn"
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-1.5 lg:hidden rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 cursor-pointer hover:bg-zinc-200 dark:hover:bg-white/10"
                  >
                    <Menu className="w-5 h-5" />
                  </button>

                  {/* Smart mini-search widget */}
                  <div className="relative w-44 sm:w-64 hidden sm:block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <input
                      id="top-navbar-search-input"
                      type="text"
                      placeholder="Quick directory lookup..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActiveView('discover');
                        }
                      }}
                      className="w-full pl-8 pr-4 py-1.5 text-xs bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500/50 text-zinc-800 dark:text-slate-200 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  
                  {/* Theme Toggle Button */}
                  <button
                    id="theme-toggle-btn"
                    onClick={handleToggleTheme}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 hover:dark:text-white cursor-pointer transition-all hover:bg-zinc-200 dark:hover:bg-white/10 hover:scale-105"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500 animate-pulse" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  </button>

                  {/* Notification badge trigger */}
                  <button
                    id="nav-notif-bell-trigger"
                    onClick={() => setActiveView('notifications')}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 hover:dark:text-white cursor-pointer relative transition-all hover:bg-zinc-200 dark:hover:bg-white/10 hover:scale-105"
                  >
                    <Bell className="w-4 h-4" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
                    )}
                  </button>

                  {/* Profile Dropdown trigger */}
                  <div className="relative group/profile-drop">
                    <button
                      id="nav-profile-dropdown-trigger"
                      className="flex items-center space-x-1.5 p-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    </button>

                    <div className="absolute right-0 top-full mt-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-xl shadow-xl p-1.5 w-44 z-40 hidden group-hover/profile-drop:block text-left animate-fade-in">
                      <button
                        id="nav-profile-go-profile"
                        onClick={() => setActiveView('profile')}
                        className="w-full text-left text-xs px-2.5 py-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg text-zinc-700 dark:text-slate-300 font-medium cursor-pointer"
                      >
                        Account Profile
                      </button>
                      <button
                        id="nav-profile-go-bookmarks"
                        onClick={() => setActiveView('bookmarks')}
                        className="w-full text-left text-xs px-2.5 py-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg text-zinc-700 dark:text-slate-300 font-medium cursor-pointer"
                      >
                        Saved Stack Folders
                      </button>
                      <div className="w-full border-t border-zinc-200 dark:border-white/5 my-1"></div>
                      <button
                        id="nav-profile-logout"
                        onClick={handleLogout}
                        className="w-full text-left text-xs px-2.5 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-red-500 dark:text-red-400 font-semibold cursor-pointer"
                      >
                        Sign Out Session
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              {/* View workspace main window content scroll */}
              <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50 dark:bg-[#080808] relative transition-colors duration-300">
                
                {activeView === 'dashboard' && (
                  <DashboardView 
                    profile={profile || { name: 'Explorer', email: '', profession: '', industry: '', skills: [], interests: [], experience: 'Intermediate', learningGoals: [] }}
                    insights={insights}
                    loadingInsights={loadingInsights}
                    bookmarkedIds={bookmarkedIds}
                    onToggleBookmark={handleToggleBookmark}
                    onNavigateToView={setActiveView}
                    onTriggerCompare={handleTriggerCompare}
                    stats={stats}
                    latestTools={latestTools}
                    latestNews={latestNews}
                    loadingDashboard={loadingDashboard}
                    dashboardError={dashboardError}
                    onManualRefresh={() => fetchDashboardData(true)}
                    lastUpdated={lastUpdated}
                  />
                )}

                {activeView === 'discover' && (
                  <DiscoverView 
                    bookmarkedIds={bookmarkedIds}
                    onToggleBookmark={handleToggleBookmark}
                    onTriggerCompare={handleTriggerCompare}
                    latestTools={latestTools}
                  />
                )}

                {activeView === 'compare' && (
                  <CompareView 
                    compareList={compareList}
                    onRemoveFromCompare={handleRemoveFromCompare}
                    onAddToCompare={handleAddToCompareDirect}
                  />
                )}

                {activeView === 'bookmarks' && (
                  <BookmarksView 
                    bookmarkedIds={bookmarkedIds}
                    onToggleBookmark={handleToggleBookmark}
                  />
                )}

                {activeView === 'notifications' && (
                  <NotificationsView 
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onClearAll={handleClearNotifications}
                  />
                )}

                {activeView === 'profile' && (
                  <ProfileView 
                    profile={profile || { name: 'Explorer', email: '', profession: '', industry: '', skills: [], interests: [], experience: 'Intermediate', learningGoals: [] }}
                    onUpdateProfile={handleUpdateProfileSettings}
                    savedToolsCount={bookmarkedIds.length}
                  />
                )}

              </main>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

