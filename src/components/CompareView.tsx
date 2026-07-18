import { useState } from 'react';
import { AITool } from '../types';
import { SEEDED_AI_TOOLS } from '../data';
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Star, 
  Info, 
  ArrowRight,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface CompareViewProps {
  compareList: AITool[];
  onRemoveFromCompare: (toolId: string) => void;
  onAddToCompare: (tool: AITool) => void;
}

export default function CompareView({
  compareList,
  onRemoveFromCompare,
  onAddToCompare
}: CompareViewProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Exclude already added tools from options list
  const availableOptions = SEEDED_AI_TOOLS.filter(
    tool => !compareList.some(c => c.id === tool.id)
  );

  const loadPreset = (presetIds: string[]) => {
    // Clear list first or append
    presetIds.forEach(id => {
      const tool = SEEDED_AI_TOOLS.find(t => t.id === id);
      if (tool && !compareList.some(c => c.id === tool.id) && compareList.length < 3) {
        onAddToCompare(tool);
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 dark:border-gray-900 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Side-by-Side Comparison Matrix
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Compare features, licensing, performance scores, pros & cons, and target environments side-by-side. (Max 3 tools)
          </p>
        </div>

        {/* Add tool selection selector */}
        {compareList.length < 3 && (
          <div className="relative">
            <button
              id="compare-add-tool-dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-md shadow-purple-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Add Tool to Compare</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl p-2 z-40 w-52">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold px-2.5 py-1">Available tools</p>
                {availableOptions.length > 0 ? (
                  <div className="max-h-56 overflow-y-auto">
                    {availableOptions.map(tool => (
                      <button
                        id={`compare-add-select-${tool.id}`}
                        key={tool.id}
                        onClick={() => {
                          onAddToCompare(tool);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left text-xs px-2.5 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium transition-colors cursor-pointer block"
                      >
                        <div className="font-bold text-gray-900 dark:text-white">{tool.name}</div>
                        <div className="text-[9px] text-gray-400">{tool.category}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 p-2">All tools loaded.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {compareList.length > 0 ? (
        <div className="overflow-x-auto rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0c0c0e] shadow-sm">
          <table className="w-full text-xs text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-950/20">
                <th className="p-4 font-bold text-gray-400 uppercase tracking-wider text-[10px] w-48">Core Metrics</th>
                {compareList.map(tool => (
                  <th key={tool.id} className="p-4 font-bold text-gray-900 dark:text-white align-top w-64 border-l border-gray-100 dark:border-gray-800">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-sm font-extrabold">{tool.name}</h3>
                        <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">{tool.category}</p>
                      </div>
                      <button
                        id={`compare-remove-${tool.id}`}
                        onClick={() => onRemoveFromCompare(tool.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                        title="Remove from matrix"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
                {compareList.length < 3 && (
                  <th className="p-4 text-center text-gray-300 dark:text-gray-700 w-64 border-l border-gray-100 dark:border-gray-800">
                    <div className="py-8 flex flex-col items-center justify-center space-y-2">
                      <Plus className="w-8 h-8 opacity-20" />
                      <p className="text-[10px]">Add another tool above</p>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {/* Description */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Brief Summary</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 text-gray-500 dark:text-gray-400 border-l border-gray-100 dark:border-gray-800 leading-relaxed text-[11px]">
                    {tool.description}
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* Pricing */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Pricing Model</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 border-l border-gray-100 dark:border-gray-800">
                    <span className="inline-block bg-purple-500/10 text-purple-700 dark:text-purple-400 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                      {tool.pricingBadge}
                    </span>
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* Best For */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Ideal For</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 text-gray-600 dark:text-gray-300 border-l border-gray-100 dark:border-gray-800 font-medium leading-relaxed">
                    {tool.bestFor}
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* Key Features */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Key Features</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 border-l border-gray-100 dark:border-gray-800 text-[11px] space-y-1">
                    {tool.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-gray-600 dark:text-gray-300">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* Platforms */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Supported Platforms</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 text-gray-500 dark:text-gray-300 border-l border-gray-100 dark:border-gray-800 font-medium">
                    {tool.platforms.join(', ')}
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* API availability */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Developer API</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 border-l border-gray-100 dark:border-gray-800">
                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      tool.apiAvailable 
                        ? 'bg-emerald-500/10 text-emerald-600' 
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-400'
                    }`}>
                      {tool.apiAvailable ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>{tool.apiAvailable ? 'Available' : 'No API'}</span>
                    </span>
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* Ratings */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Rating & Popularity</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 border-l border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center space-x-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{tool.rating} / 5.0</span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">
                      Popularity: {tool.popularityScore}%
                    </div>
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* Key Strengths */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Key Strengths</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 border-l border-gray-100 dark:border-gray-800 text-[11px] text-emerald-700 dark:text-emerald-400 space-y-1 bg-emerald-50/5 dark:bg-emerald-950/5">
                    {tool.pros.map((p, i) => <div key={i}>• {p}</div>)}
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* Trade-offs */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Limitations</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 border-l border-gray-100 dark:border-gray-800 text-[11px] text-rose-700 dark:text-rose-400 space-y-1 bg-rose-50/5 dark:bg-rose-950/5">
                    {tool.cons.map((c, i) => <div key={i}>• {c}</div>)}
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>

              {/* Direct links */}
              <tr>
                <td className="p-4 font-semibold text-gray-900 dark:text-white bg-gray-50/20 dark:bg-gray-950/10">Access Link</td>
                {compareList.map(tool => (
                  <td key={tool.id} className="p-4 border-l border-gray-100 dark:border-gray-800">
                    <a
                      id={`compare-external-${tool.id}`}
                      href={tool.visitUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 font-bold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      <span>Visit {tool.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                ))}
                {compareList.length < 3 && <td className="bg-gray-50/5 dark:bg-transparent border-l border-gray-100 dark:border-gray-800"></td>}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-[#111114] border border-gray-100 dark:border-gray-800 rounded-3xl space-y-4">
          <Info className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Your comparison matrix is empty</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Select tools in the sidebar or load one of our popular pre-composed templates below.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              id="compare-preset-code"
              onClick={() => loadPreset(['cursor', 'phind'])}
              className="px-3.5 py-2 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40 rounded-xl text-xs font-semibold cursor-pointer hover:bg-purple-100/55 transition-colors"
            >
              Preset: Cursor vs Phind (Coding)
            </button>
            <button
              id="compare-preset-ui"
              onClick={() => loadPreset(['v0', 'claude'])}
              className="px-3.5 py-2 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-900/40 rounded-xl text-xs font-semibold cursor-pointer hover:bg-purple-100/55 transition-colors"
            >
              Preset: v0 vs Claude Artifacts (Design)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
