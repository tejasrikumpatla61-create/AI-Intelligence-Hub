import React, { useState, useMemo } from 'react';
import { OnboardingProfile } from '../types';
import { 
  PROFESSIONS, 
  SKILLS_CHIPS, 
  INTERESTS_LIST, 
  EXPERIENCE_LEVELS, 
  LEARNING_GOALS 
} from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Sparkles, 
  GraduationCap, 
  Cpu, 
  Code, 
  Palette, 
  Zap, 
  Film, 
  Image, 
  MessageSquare, 
  Bot, 
  HeartPulse, 
  TrendingUp, 
  ShieldAlert,
  CheckCircle2,
  Check
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, Code, Palette, Zap, Film, Image, MessageSquare, Bot, HeartPulse, TrendingUp, GraduationCap, ShieldAlert
};

interface OnboardingProps {
  initialEmail: string;
  initialName: string;
  onComplete: (profile: OnboardingProfile) => void;
}

export default function Onboarding({ initialEmail, initialName, onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profession, setProfession] = useState(PROFESSIONS[0]);
  const [industry, setIndustry] = useState('Technology');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'React', 'AI']);
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['coding', 'productivity']);
  const [experience, setExperience] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['boost-prod', 'stay-updated']);
  const [isFinishing, setIsFinishing] = useState(false);
  const [finishStage, setFinishStage] = useState(0);

  const filteredSkills = useMemo(() => {
    return SKILLS_CHIPS.filter(
      skill => skill.toLowerCase().includes(skillSearch.toLowerCase()) && !selectedSkills.includes(skill)
    );
  }, [skillSearch, selectedSkills]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillSearch.trim() && !selectedSkills.includes(skillSearch.trim())) {
      setSelectedSkills([...selectedSkills, skillSearch.trim()]);
      setSkillSearch('');
    }
  };

  const toggleInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    setIsFinishing(true);
    
    // Simulate multi-stage premium AI building animation
    setTimeout(() => setFinishStage(1), 1000); // "Analyzing professional skills..."
    setTimeout(() => setFinishStage(2), 2200); // "Mapping learning roadmaps & trends..."
    setTimeout(() => setFinishStage(3), 3400); // "Querying real-time Gemini recommendations..."
    setTimeout(() => {
      onComplete({
        name: initialName || 'Explorer',
        email: initialEmail,
        profession,
        industry,
        skills: selectedSkills,
        interests: selectedInterests,
        experience,
        learningGoals: selectedGoals
      });
    }, 4500);
  };

  const stepsInfo = [
    { number: 1, title: 'Profile' },
    { number: 2, title: 'Skills' },
    { number: 3, title: 'Interests' },
    { number: 4, title: 'Goals' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {isFinishing ? (
        <div className="p-12 text-center min-h-[500px] flex flex-col items-center justify-center relative z-10 animate-fade-in">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-500/20 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">
            Synthesizing Your Intelligence Feed
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto mb-8">
            Our premium intelligence engine is custom tailoring recommendations matching your background.
          </p>

          <div className="w-full max-w-xs space-y-3.5">
            <div className="flex items-center space-x-3 text-left">
              <div className={`p-1 rounded-full ${finishStage >= 0 ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}>
                {finishStage > 0 ? <Check className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-current border-t-transparent animate-spin"></div>}
              </div>
              <span className={`text-xs font-medium ${finishStage >= 0 ? 'text-slate-200' : 'text-zinc-500'}`}>
                Analyzing professional background...
              </span>
            </div>

            <div className="flex items-center space-x-3 text-left">
              <div className={`p-1 rounded-full ${finishStage >= 1 ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}>
                {finishStage > 1 ? <Check className="w-3.5 h-3.5" /> : (finishStage === 1 ? <div className="w-3.5 h-3.5 rounded-full border border-current border-t-transparent animate-spin"></div> : <div className="w-3.5 h-3.5 rounded-full"></div>)}
              </div>
              <span className={`text-xs font-medium ${finishStage >= 1 ? 'text-slate-200' : 'text-zinc-500'}`}>
                Mapping {selectedInterests.length} interest areas & latest tools...
              </span>
            </div>

            <div className="flex items-center space-x-3 text-left">
              <div className={`p-1 rounded-full ${finishStage >= 2 ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}>
                {finishStage > 2 ? <Check className="w-3.5 h-3.5" /> : (finishStage === 2 ? <div className="w-3.5 h-3.5 rounded-full border border-current border-t-transparent animate-spin"></div> : <div className="w-3.5 h-3.5 rounded-full"></div>)}
              </div>
              <span className={`text-xs font-medium ${finishStage >= 2 ? 'text-slate-200' : 'text-zinc-500'}`}>
                Querying server-side Gemini API recommendations...
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col md:flex-row min-h-[550px] animate-fade-in">
          {/* Left Side Info Panel */}
          <div className="w-full md:w-80 bg-zinc-950/20 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full text-xs font-medium text-purple-300 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>Onboarding Wizard</span>
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight leading-snug">
                Let's customize your discovery engine
              </h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                By modeling your skills, profession, and learning goals, we can filter noise to recommend highly impactful AI tooling.
              </p>
            </div>

            {/* Stepper progress indicator */}
            <div className="space-y-4 my-8 md:my-0">
              {stepsInfo.map((s, idx) => {
                const isActive = step === s.number;
                const isCompleted = step > s.number;
                return (
                  <div key={s.number} className="flex items-center space-x-3.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 scale-110' 
                        : isCompleted 
                          ? 'bg-purple-950/40 text-purple-400 border border-purple-500/30' 
                          : 'bg-zinc-900 text-zinc-500 border border-white/5'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : s.number}
                    </div>
                    <span className={`text-xs font-medium ${isActive ? 'text-white font-semibold' : 'text-zinc-500'}`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] text-zinc-500">
              Completed values are saved securely to your workspace cache.
            </div>
          </div>

          {/* Right Side Work Stage */}
          <div className="flex-1 p-8 flex flex-col justify-between bg-zinc-950/10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">Profession & Core Sector</h3>
                    <p className="text-xs text-zinc-400 mt-1">Select the role and industry that matches your primary daily activities.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">What is your profession?</label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {PROFESSIONS.map((prof) => {
                          const isSel = profession === prof;
                          return (
                            <button
                              id={`onboard-prof-${prof.replace(/\s+/g, '-').toLowerCase()}`}
                              key={prof}
                              type="button"
                              onClick={() => setProfession(prof)}
                              className={`p-3 text-left text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                                isSel 
                                  ? 'border-purple-500 bg-purple-950/10 text-purple-400 shadow-sm' 
                                  : 'border-white/5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                                <span>{prof}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">Target Industry / Sector</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                          <Layers className="w-4 h-4" />
                        </span>
                        <select
                          id="onboard-industry-select"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white cursor-pointer"
                        >
                          <option value="Technology">Technology & SaaS</option>
                          <option value="Healthcare">Healthcare & Biotech</option>
                          <option value="Finance">Finance & Investing</option>
                          <option value="Education">Education & EdTech</option>
                          <option value="Marketing">Marketing, Sales & SEO</option>
                          <option value="E-commerce">E-commerce & Retail</option>
                          <option value="Gaming">Gaming & VFX</option>
                          <option value="Cyber Security">Cyber Security</option>
                          <option value="Consulting">Consulting & Advisory</option>
                          <option value="Other">Other / Independent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">Skills & AI Experience</h3>
                    <p className="text-xs text-zinc-400 mt-1">Specify your current competencies and comfort levels using AI systems.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">Select or Search Skills ({selectedSkills.length} selected)</label>
                      <form onSubmit={handleAddCustomSkill} className="relative flex mb-3">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                          <Search className="w-4 h-4" />
                        </span>
                        <input
                          id="onboard-skills-search"
                          type="text"
                          placeholder="Type a skill (e.g. Next.js, Figma, Python)..."
                          value={skillSearch}
                          onChange={(e) => setSkillSearch(e.target.value)}
                          className="w-full pl-9 pr-16 py-2 text-xs bg-zinc-950 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        />
                        <button
                          id="onboard-add-skill-btn"
                          type="submit"
                          className="absolute right-1.5 top-1.5 px-2.5 py-1 text-[10px] font-semibold bg-zinc-900 text-zinc-300 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                        >
                          Add
                        </button>
                      </form>

                      {/* Active selected skills */}
                      <div className="flex flex-wrap gap-1.5 mb-3 max-h-[75px] overflow-y-auto pr-1">
                        {selectedSkills.map(s => (
                          <span
                            key={s}
                            onClick={() => toggleSkill(s)}
                            className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-950 text-purple-300 border border-purple-500/30 cursor-pointer hover:bg-red-950 hover:text-red-300 hover:border-red-500/30 transition-all"
                          >
                            <span>{s}</span>
                            <span className="text-[9px] font-bold">×</span>
                          </span>
                        ))}
                      </div>

                      {/* Filter suggestions */}
                      <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl">
                        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Suggested Skills</p>
                        <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto">
                           {filteredSkills.slice(0, 10).map(s => (
                            <button
                              id={`onboard-skill-chip-${s.toLowerCase()}`}
                              key={s}
                              type="button"
                              onClick={() => toggleSkill(s)}
                              className="px-2.5 py-1 rounded-full text-xs bg-zinc-900 text-zinc-300 border border-white/5 hover:border-purple-400 hover:text-purple-400 transition-colors cursor-pointer"
                            >
                              + {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-2">What is your current AI experience level?</label>
                      <div className="space-y-1.5">
                        {EXPERIENCE_LEVELS.map(level => {
                          const isSel = experience === level.value;
                          return (
                            <button
                              id={`onboard-exp-${level.value.toLowerCase()}`}
                              key={level.value}
                              type="button"
                              onClick={() => setExperience(level.value as any)}
                              className={`w-full p-2.5 text-left rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                                isSel 
                                  ? 'border-purple-500 bg-purple-950/20 text-purple-300' 
                                  : 'border-white/5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300'
                              }`}
                            >
                              <div className={`mt-0.5 p-0.5 rounded-full ${isSel ? 'bg-purple-600 text-white' : 'border border-zinc-700 text-transparent'}`}>
                                <Check className="w-2.5 h-2.5" />
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold">{level.value}</h4>
                                <p className="text-[10px] text-zinc-400 mt-0.5">{level.description}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">Areas of Interest</h3>
                    <p className="text-xs text-zinc-400 mt-1">Select the AI sub-fields you want to explore and receive trending articles for.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {INTERESTS_LIST.map((interest) => {
                      const isSel = selectedInterests.includes(interest.id);
                      const Icon = iconMap[interest.icon] || Cpu;
                      return (
                        <button
                          id={`onboard-interest-${interest.id}`}
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex items-start space-x-3 relative ${
                            isSel 
                              ? 'border-purple-500 bg-purple-950/20' 
                              : 'border-white/5 bg-zinc-950 hover:bg-zinc-900'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${isSel ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate">{interest.name}</h4>
                            <p className="text-[9px] text-zinc-400 mt-0.5 line-clamp-2">{interest.description}</p>
                          </div>
                          {isSel && (
                            <div className="absolute top-2 right-2 p-0.5 bg-purple-600 text-white rounded-full">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">Your AI Learning Goals</h3>
                    <p className="text-xs text-zinc-400 mt-1">What major outcomes do you wish to achieve by leveraging AI tools?</p>
                  </div>

                  <div className="space-y-2">
                    {LEARNING_GOALS.map((goal) => {
                      const isSel = selectedGoals.includes(goal.id);
                      return (
                        <button
                          id={`onboard-goal-${goal.id}`}
                          key={goal.id}
                          type="button"
                          onClick={() => toggleGoal(goal.id)}
                          className={`w-full p-3.5 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSel 
                              ? 'border-purple-500 bg-purple-950/20 text-purple-300 font-medium' 
                              : 'border-white/5 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                              isSel ? 'bg-purple-600 border-purple-600 text-white' : 'border-zinc-700'
                            }`}>
                              {isSel && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className="text-xs font-semibold">{goal.name}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500">Core Goal</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
              <button
                id="onboard-back-btn"
                onClick={handleBack}
                disabled={step === 1}
                className="flex items-center space-x-1 px-4 py-2 text-xs font-medium rounded-lg border border-white/5 hover:bg-zinc-900 cursor-pointer disabled:opacity-30 disabled:pointer-events-none text-zinc-300"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                id="onboard-next-btn"
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-5 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors cursor-pointer shadow-md shadow-purple-500/10"
              >
                <span>{step === 4 ? 'Build My Personalized Feed' : 'Continue'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );;
}
