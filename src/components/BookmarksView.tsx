import { useState } from 'react';
import { AITool, BookmarkCollection } from '../types';
import { SEEDED_AI_TOOLS } from '../data';
import { 
  FolderHeart, 
  Briefcase, 
  BookOpen, 
  Star, 
  Zap, 
  Trash2, 
  ExternalLink,
  Cpu,
  Info
} from 'lucide-react';

interface BookmarksViewProps {
  bookmarkedIds: { id: string; collection: BookmarkCollection }[];
  onToggleBookmark: (toolId: string, collection: BookmarkCollection) => void;
}

export default function BookmarksView({ bookmarkedIds, onToggleBookmark }: BookmarksViewProps) {
  const [activeTab, setActiveTab] = useState<BookmarkCollection | 'All'>('All');

  // Load actual detailed tool objects from matching saved IDs
  const savedTools = bookmarkedIds.map(bookmark => {
    const tool = SEEDED_AI_TOOLS.find(t => t.id === bookmark.id);
    return tool ? { ...tool, collection: bookmark.collection } : null;
  }).filter((t): t is AITool & { collection: BookmarkCollection } => t !== null);

  // Filter tools based on selected active tab folder
  const displayedSavedTools = savedTools.filter(tool => {
    if (activeTab === 'All') return true;
    return tool.collection === activeTab;
  });

  const folderCount = (col: BookmarkCollection) => {
    return savedTools.filter(t => t.collection === col).length;
  };

  const tabs: { value: BookmarkCollection | 'All'; icon: any; label: string }[] = [
    { value: 'All', icon: FolderHeart, label: 'All Saved' },
    { value: 'Work', icon: Briefcase, label: 'Work Stack' },
    { value: 'Learning', icon: BookOpen, label: 'Learning Stack' },
    { value: 'Favorites', icon: Star, label: 'Favorites' },
    { value: 'Productivity', icon: Zap, label: 'Productivity' }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Title block */}
      <div className="space-y-1">
        <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          Your Saved Workspace Collections
        </h1>
        <p className="text-xs text-zinc-400">
          Vetted tools grouped in distinct environments to match your professional learning goals.
        </p>
      </div>

      {/* Tabs folder rail */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-white/5">
        {tabs.map(tab => {
          const isActive = activeTab === tab.value;
          const count = tab.value === 'All' ? savedTools.length : folderCount(tab.value as BookmarkCollection);
          const Icon = tab.icon;

          return (
            <button
              id={`bookmarks-tab-${tab.value.toLowerCase()}`}
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1.5 shrink-0 cursor-pointer transition-all ${
                isActive 
                  ? 'bg-purple-600 text-white shadow' 
                  : 'bg-zinc-950 border border-white/5 text-zinc-400 hover:bg-zinc-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                isActive ? 'bg-purple-700 text-purple-100' : 'bg-zinc-900 text-zinc-500 border border-white/5'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {displayedSavedTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSavedTools.map(tool => {
            return (
              <div 
                key={`${tool.id}-${tool.collection}`}
                className="bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-2xl relative group"
              >
                <div className="space-y-3">
                  {/* Top Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[8px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                        Folder: {tool.collection}
                      </span>
                      <h3 className="text-xs font-semibold text-white pt-1">{tool.name}</h3>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        id={`bookmark-remove-${tool.id}-${tool.collection}`}
                        onClick={() => onToggleBookmark(tool.id, tool.collection)}
                        className="p-1 rounded bg-zinc-900 border border-white/5 hover:bg-red-950/50 hover:text-red-400 text-zinc-400 transition-colors cursor-pointer"
                        title="Remove from bookmarks"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <a 
                        id={`bookmark-visit-${tool.id}`}
                        href={tool.visitUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-1 rounded bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  <div className="flex items-center space-x-1.5">
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded font-semibold">
                      {tool.pricingBadge}
                    </span>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded font-semibold flex items-center space-x-0.5">
                      <span>★ {tool.rating}</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 mt-4 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>Category: {tool.category}</span>
                  <span>Popularity: {tool.popularityScore}%</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-3xl space-y-3.5">
          <Info className="w-10 h-10 text-zinc-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white">This folder is empty</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {activeTab === 'All' 
                ? 'Save custom tools in the Discover or Dashboard views to collect them here.' 
                : `No bookmarks saved under the ${activeTab} collection folder yet.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
