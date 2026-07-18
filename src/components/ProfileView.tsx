import React, { useState } from 'react';
import { OnboardingProfile, AITool } from '../types';
import { PROFESSIONS, SKILLS_CHIPS, INTERESTS_LIST, EXPERIENCE_LEVELS, LEARNING_GOALS } from '../data';
import { 
  User, 
  Settings, 
  Award, 
  Check, 
  Cpu, 
  History, 
  Trash2, 
  Save, 
  BookOpen,
  Briefcase
} from 'lucide-react';

interface ProfileViewProps {
  profile: OnboardingProfile;
  onUpdateProfile: (profile: OnboardingProfile) => void;
  savedToolsCount: number;
}

export default function ProfileView({
  profile,
  onUpdateProfile,
  savedToolsCount
}: ProfileViewProps) {
  const [name, setName] = useState(profile.name);
  const [profession, setProfession] = useState(profile.profession);
  const [industry, setIndustry] = useState(profile.industry);
  const [experience, setExperience] = useState(profile.experience);
  
  // Manage array lists
  const [skills, setSkills] = useState<string[]>(profile.skills);
  const [interests, setInterests] = useState<string[]>(profile.interests);
  const [goals, setGoals] = useState<string[]>(profile.learningGoals);

  const [skillInput, setSkillInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Simple mock logs
  const activityHistory = [
    { text: 'Completed professional onboarding assessment', time: '10 mins ago' },
    { text: 'Queried Gemini AI for personalized recommendations', time: '9 mins ago' },
    { text: 'Loaded side-by-side comparison matrix for Cursor vs Phind', time: '5 mins ago' },
    { text: 'Bookmarked v0 by Vercel inside "Work Stack" collection', time: '2 mins ago' }
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (s: string) => {
    setSkills(skills.filter(item => item !== s));
  };

  const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      setInterests(interests.filter(item => item !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const toggleGoal = (id: string) => {
    if (goals.includes(id)) {
      setGoals(goals.filter(item => item !== id));
    } else {
      setGoals([...goals, id]);
    }
  };

  const handleFormSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email: profile.email,
      profession,
      industry,
      skills,
      interests,
      experience,
      learningGoals: goals
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Title block */}
      <div className="space-y-1 border-b border-white/5 pb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          Workspace Account Settings
        </h1>
        <p className="text-xs text-zinc-400">
          Refine your professional credentials to adjust Gemini insights and weekly recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Profile card */}
        <div className="space-y-6">
          <div className="p-6 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md shadow-purple-500/20">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">{profile.name}</h3>
              <p className="text-[11px] text-zinc-500">{profile.email}</p>
            </div>

            <div className="flex justify-around items-center pt-4 border-t border-white/5 text-xs">
              <div className="text-center">
                <p className="text-sm font-semibold text-white">{savedToolsCount}</p>
                <p className="text-[10px] text-zinc-500">Bookmarks</p>
              </div>
              <div className="w-px h-6 bg-white/5"></div>
              <div className="text-center">
                <p className="text-sm font-semibold text-white">{skills.length}</p>
                <p className="text-[10px] text-zinc-500">Skills Tracked</p>
              </div>
              <div className="w-px h-6 bg-white/5"></div>
              <div className="text-center">
                <p className="text-sm font-semibold text-white">{interests.length}</p>
                <p className="text-[10px] text-zinc-500">Interests</p>
              </div>
            </div>

            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-left">
              <p className="text-[10px] font-semibold text-purple-400 flex items-center space-x-1">
                <Award className="w-3.5 h-3.5" />
                <span>AI Comfort Level: {profile.experience}</span>
              </p>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="p-5 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl space-y-4">
            <h3 className="text-xs font-semibold text-white flex items-center space-x-2">
              <History className="w-4 h-4 text-zinc-500" />
              <span>Activity History Logs</span>
            </h3>

            <div className="space-y-3">
              {activityHistory.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-[10px] text-zinc-500">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-zinc-300 font-medium leading-relaxed">{log.text}</p>
                    <p className="text-zinc-500 text-[9px]">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Edit forms */}
        <div className="lg:col-span-2">
          <form onSubmit={handleFormSave} className="p-6 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Account profile variables</h3>
              {isSaved && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/20">✓ Saved successfully</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">First / Last Name</label>
                <input
                  id="profile-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Role / Profession</label>
                <select
                  id="profile-profession-select"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white cursor-pointer"
                >
                  {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Target Sector</label>
                <input
                  id="profile-industry-input"
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Comfort Level</label>
                <select
                  id="profile-experience-select"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Editable Skills chips */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-zinc-300">Technical Skills Tracked</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {skills.map(s => (
                  <span key={s} className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs bg-purple-950 text-purple-300 border border-purple-500/30">
                    <span>{s}</span>
                    <button
                      id={`profile-remove-skill-${s.toLowerCase()}`}
                      type="button"
                      onClick={() => removeSkill(s)}
                      className="font-bold text-[10px] hover:text-red-400 cursor-pointer pl-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex max-w-xs space-x-1.5">
                <input
                  id="profile-add-skill-input"
                  type="text"
                  placeholder="Add skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white flex-1"
                />
                <button
                  id="profile-add-skill-btn"
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 bg-zinc-900 border border-white/5 text-zinc-300 text-xs font-semibold rounded-xl cursor-pointer hover:bg-zinc-800"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Editable interests */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-zinc-300">Areas of Interest ({interests.length} checked)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[120px] overflow-y-auto pr-1">
                {INTERESTS_LIST.map(item => {
                  const checked = interests.includes(item.id);
                  return (
                    <button
                      id={`profile-interest-${item.id}`}
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`px-3 py-1.5 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-colors ${
                        checked 
                          ? 'border-purple-500 bg-purple-950/20 text-purple-300' 
                          : 'border-white/5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editable goals */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-zinc-300">AI Learning Goals</label>
              <div className="space-y-1.5">
                {LEARNING_GOALS.map(goal => {
                  const checked = goals.includes(goal.id);
                  return (
                    <button
                      id={`profile-goal-${goal.id}`}
                      key={goal.id}
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                        checked 
                          ? 'border-purple-500 bg-purple-950/20 text-purple-300' 
                          : 'border-white/5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      <span>{goal.name}</span>
                      {checked && <Check className="w-4 h-4 text-purple-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button
                id="profile-save-all-btn"
                type="submit"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center space-x-1.5 shadow-md shadow-purple-500/10"
              >
                <Save className="w-4 h-4" />
                <span>Save All Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
