import { useState } from 'react';
import { Notification } from '../types';
import { 
  Bell, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Cpu, 
  CheckCheck, 
  Trash2,
  Info
} from 'lucide-react';

interface NotificationsViewProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export default function NotificationsView({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll
}: NotificationsViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = notifications.filter(notif => {
    if (activeFilter === 'unread') return notif.unread;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'launch': return <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'trending': return <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'digest': return <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
      case 'recommendation': return <Sparkles className="w-4 h-4 text-amber-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'launch': return 'bg-purple-500/10 border-purple-500/20';
      case 'trending': return 'bg-indigo-500/10 border-indigo-500/20';
      case 'digest': return 'bg-cyan-500/10 border-cyan-500/20';
      case 'recommendation': return 'bg-amber-500/10 border-amber-500/20';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Notifications & Broadcast Logs
          </h1>
          <p className="text-xs text-zinc-400">
            Real-time trigger alerts mapping releases, digests, and custom intelligence.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              id="notif-mark-all-read"
              onClick={onMarkAllAsRead}
              className="px-3 py-1.5 border border-white/5 bg-zinc-950/40 rounded-lg text-[11px] font-semibold flex items-center space-x-1.5 hover:bg-zinc-900 cursor-pointer text-zinc-300"
            >
              <CheckCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Mark all read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              id="notif-clear-all"
              onClick={onClearAll}
              className="p-1.5 border border-red-500/20 bg-red-950/10 hover:bg-red-950/30 rounded-lg text-red-400 cursor-pointer"
              title="Clear all history logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggles */}
      <div className="flex items-center space-x-2">
        <button
          id="notif-filter-all"
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg cursor-pointer ${
            activeFilter === 'all' 
              ? 'bg-purple-600 text-white' 
              : 'bg-zinc-950 border border-white/5 text-zinc-400 hover:bg-zinc-900'
          }`}
        >
          All Logs ({notifications.length})
        </button>
        <button
          id="notif-filter-unread"
          onClick={() => setActiveFilter('unread')}
          className={`px-3 py-1 text-xs font-semibold rounded-lg cursor-pointer ${
            activeFilter === 'unread' 
              ? 'bg-purple-600 text-white font-bold' 
              : 'bg-zinc-950 border border-white/5 text-zinc-400 hover:bg-zinc-900'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Timeline items list */}
      {filteredNotifs.length > 0 ? (
        <div className="space-y-3.5">
          {filteredNotifs.map(notif => {
            return (
              <div 
                key={notif.id}
                onClick={() => notif.unread && onMarkAsRead(notif.id)}
                className={`p-4 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl transition-all flex items-start space-x-4 text-left relative ${
                  notif.unread ? 'border-l-4 border-l-purple-600 cursor-pointer bg-purple-500/5' : ''
                }`}
              >
                {/* Type Icon indicator */}
                <div className={`p-2 rounded-xl border shrink-0 ${getBg(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xs font-semibold text-white leading-tight">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-zinc-500 shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {notif.description}
                  </p>
                </div>

                {notif.unread && (
                  <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-3xl space-y-3">
          <Info className="w-10 h-10 text-zinc-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white">Your log feed is clean</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">No alerts match your current view. Active updates are triggered as new AI platforms launch.</p>
          </div>
        </div>
      )}
    </div>
  );
}
