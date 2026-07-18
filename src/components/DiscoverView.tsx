import { useState, useMemo } from 'react';
import { AITool, BookmarkCollection } from '../types';
import { SEEDED_AI_TOOLS } from '../data';
import { 
  Search, 
  Filter, 
  Bookmark, 
  ExternalLink, 
  Star, 
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
  SlidersHorizontal,
  ChevronDown,
  Info,
  Check,
  X
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, Code, Palette, Zap, Film, Image, MessageSquare, Bot, HeartPulse, GraduationCap
};

interface DiscoverViewProps {
  bookmarkedIds: { id: string; collection: BookmarkCollection }[];
  onToggleBookmark: (toolId: string, collection: BookmarkCollection) => void;
  onTriggerCompare: (tool: AITool) => void;
  latestTools?: AITool[];
}

export default function DiscoverView({
  bookmarkedIds,
  onToggleBookmark,
  onTriggerCompare,
  latestTools = []
}: DiscoverViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'launchDate'>('popularity');
  const [showFilters, setShowFilters] = useState(false);
  
  // Search state autocomplete
  const [showSuggestions, setShowSuggestions] = useState(false);
  const recentSearches = ['Cursor', 'Generative UI', 'LLM Agent', 'Midjourney v6'];
  const trendingSearches = ['v0', 'Anthropic Artifacts', 'NotebookLM Podcast', 'ElevenLabs speech'];

  const categories = ['All', 'Coding', 'Design', 'LLMs & Chat', 'Productivity', 'Video Generation', 'Image Generation', 'Healthcare', 'Education'];

  const handlePricingToggle = (price: string) => {
    if (selectedPricing.includes(price)) {
      setSelectedPricing(selectedPricing.filter(p => p !== price));
    } else {
      setSelectedPricing([...selectedPricing, price]);
    }
  };

  const handleSearchClick = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedPricing([]);
    setMinRating(0);
    setSortBy('popularity');
  };

  // Filtered and sorted tools
  const processedTools = useMemo(() => {
    // Merge latestTools and SEEDED_AI_TOOLS dynamically while removing any duplicate IDs
    const allToolsMap: Record<string, AITool> = {};
    SEEDED_AI_TOOLS.forEach(tool => {
      allToolsMap[tool.id] = tool;
    });
    latestTools.forEach(tool => {
      allToolsMap[tool.id] = tool;
    });
    
    let result = Object.values(allToolsMap);

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(q) || 
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some(tag => tag.toLowerCase().includes(q)) ||
        tool.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(tool => tool.category === activeCategory);
    }

    // Pricing filter
    if (selectedPricing.length > 0) {
      result = result.filter(tool => selectedPricing.includes(tool.pricing));
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter(tool => tool.rating >= minRating);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'popularity') return b.popularityScore - a.popularityScore;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'launchDate') return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime();
      return 0;
    });

    return result;
  }, [searchQuery, activeCategory, selectedPricing, minRating, sortBy]);

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Title block */}
      <div className="space-y-1">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
          AI Application Directory
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Search over 200+ vetted artificial intelligence platforms and foundational models.
        </p>
      </div>

      {/* Advanced Search Bar + suggestions popover */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              id="discover-search-input"
              type="text"
              placeholder="Search by model name, tags, or use case (e.g. Code agent, podcast, MIDI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111114] border border-gray-100 dark:border-gray-800 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-950 dark:text-white shadow-sm"
            />
            {searchQuery && (
              <button
                id="discover-clear-search"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              id="discover-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                showFilters || selectedPricing.length > 0 || minRating > 0
                  ? 'bg-purple-600/15 border-purple-500/20 text-purple-600 dark:text-purple-400' 
                  : 'bg-white dark:bg-[#111114] border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {(selectedPricing.length > 0 || minRating > 0) && (
                <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[8px]">
                  {selectedPricing.length + (minRating > 0 ? 1 : 0)}
                </span>
              )}
            </button>

            <select
              id="discover-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 bg-white dark:bg-[#111114] border border-gray-100 dark:border-gray-800 rounded-2xl text-xs text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer font-semibold shadow-sm"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Sort by Rating</option>
              <option value="launchDate">Sort by Newest</option>
            </select>
          </div>
        </div>

        {/* Search Suggestion box */}
        {showSuggestions && (
          <div className="absolute top-full inset-x-0 mt-1.5 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-850 rounded-2xl shadow-xl p-4 z-30 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recent Queries</h4>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map(q => (
                  <button
                    id={`suggest-recent-${q.toLowerCase().replace(/\s+/g, '-')}`}
                    key={q}
                    onMouseDown={() => handleSearchClick(q)}
                    className="text-[10px] px-2.5 py-1 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:border-purple-400 hover:text-purple-600 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Trending Right Now</h4>
              <div className="flex flex-wrap gap-1.5">
                {trendingSearches.map(q => (
                  <button
                    id={`suggest-trending-${q.toLowerCase().replace(/\s+/g, '-')}`}
                    key={q}
                    onMouseDown={() => handleSearchClick(q)}
                    className="text-[10px] px-2.5 py-1 bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-purple-700 dark:text-purple-300 rounded-lg hover:border-purple-500 cursor-pointer font-medium"
                  >
                    🔥 {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expandable Advanced Filters panel */}
      {showFilters && (
        <div className="p-4 bg-gray-50/50 dark:bg-[#121215]/50 border border-gray-100 dark:border-gray-800/80 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-down">
          {/* Price Filters */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Pricing Model</h4>
            <div className="flex flex-col gap-1.5">
              {['Free', 'Paid', 'Freemium', 'Open Source'].map(price => (
                <label key={price} className="flex items-center space-x-2 text-xs font-medium text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input
                    id={`filter-price-${price.replace(/\s+/g, '-').toLowerCase()}`}
                    type="checkbox"
                    checked={selectedPricing.includes(price)}
                    onChange={() => handlePricingToggle(price)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>{price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filters */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Minimum Rating</h4>
            <div className="flex items-center space-x-2">
              {[4.0, 4.5, 4.7, 4.8].map(rating => (
                <button
                  id={`filter-rating-${rating.toString().replace('.', '-')}`}
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border cursor-pointer transition-colors ${
                    minRating === rating 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`}
                >
                  {rating}★ +
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Indicators / Clear */}
          <div className="flex flex-col justify-between">
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Active Filters</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Refining to matches. Total directory matches: <span className="font-bold text-gray-900 dark:text-white">{processedTools.length}</span> tools.
              </p>
            </div>
            
            <button
              id="discover-clear-filters-btn"
              onClick={clearFilters}
              className="text-left text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Horizontal Scroll Category Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-gray-50 dark:border-gray-900">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              id={`discover-category-tab-${cat.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 cursor-pointer transition-all ${
                isActive 
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/10' 
                  : 'bg-white dark:bg-[#111114] border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results grid */}
      {processedTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedTools.map(tool => {
            const Icon = iconMap[tool.logo] || Cpu;
            const isSaved = bookmarkedIds.some(b => b.id === tool.id);

            return (
              <div 
                key={tool.id}
                className="bg-white dark:bg-[#111114] border border-gray-100 dark:border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-950 dark:text-white leading-tight truncate">{tool.name}</h3>
                        <p className="text-[9px] text-gray-400 mt-0.5">{tool.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {/* Interactive Collection bookmark trigger */}
                      <div className="relative group/saved">
                        <button
                          id={`discover-save-${tool.id}`}
                          className={`p-1 rounded bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-950 border border-transparent hover:border-purple-500/10 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-purple-600' : ''}`} />
                        </button>
                        
                        {/* Quick Hover Select */}
                        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg shadow-xl p-1 z-30 w-32 hidden group-hover/saved:block text-left">
                          {['Work', 'Learning', 'Favorites', 'Productivity'].map(col => {
                            const isSelected = bookmarkedIds.some(b => b.id === tool.id && b.collection === col);
                            return (
                              <button
                                id={`discover-save-col-${tool.id}-${col.toLowerCase()}`}
                                key={col}
                                onClick={() => onToggleBookmark(tool.id, col as BookmarkCollection)}
                                className={`w-full text-left text-[9px] px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800 font-medium cursor-pointer ${
                                  isSelected ? 'text-purple-600 font-bold bg-purple-50/40 dark:bg-purple-950/30' : 'text-gray-600 dark:text-gray-400'
                                }`}
                              >
                                {col} {isSelected && '✓'}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <a 
                        id={`discover-visit-${tool.id}`}
                        href={tool.visitUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-1 rounded bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-white border border-transparent cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Pricing and ratings metrics */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-1.5 py-0.2 rounded font-semibold">
                      {tool.pricingBadge}
                    </span>
                    <span className="text-[9px] bg-amber-500/10 text-amber-700 dark:text-amber-400 px-1.5 py-0.2 rounded font-semibold flex items-center space-x-0.5">
                      <Star className="w-2.5 h-2.5 fill-current text-amber-500 shrink-0" />
                      <span>{tool.rating}</span>
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 px-1.5 py-0.2 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-gray-50 dark:border-gray-900 mt-4 flex items-center justify-between">
                  <span className="text-[9px] text-gray-400">Popularity: {tool.popularityScore}%</span>
                  <button
                    id={`discover-compare-btn-${tool.id}`}
                    onClick={() => onTriggerCompare(tool)}
                    className="text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                  >
                    Add to Compare Matrix
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-[#111114] border border-gray-100 dark:border-gray-800 rounded-2xl space-y-3.5">
          <Info className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">No matches found</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Try clarifying your terms, removing pricing model filters, or expanding your category tabs.</p>
          </div>
          <button
            id="discover-reset-empty-btn"
            onClick={clearFilters}
            className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl cursor-pointer hover:bg-purple-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
