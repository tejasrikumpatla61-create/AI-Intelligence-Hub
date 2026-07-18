import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Bookmark, 
  Code, 
  Search, 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  Rss, 
  Compass, 
  Grid,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export default function LandingPage({ onGetStarted, onExplore }: LandingPageProps) {
  return (
    <div className="bg-[#080808] text-slate-200 min-h-screen relative overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Futuristic Radial Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[200px] right-[-100px] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[400px] left-[-100px] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Landing Navbar */}
      <header className="border-b border-white/5 bg-[#080808]/75 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
            </div>
            <span className="font-bold tracking-tight text-base bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              AI Intelligence Hub
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="landing-nav-explore-btn"
              onClick={onExplore}
              className="text-xs font-semibold text-zinc-300 hover:text-purple-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              Browse Tools
            </button>
            <button
              id="landing-nav-start-btn"
              onClick={onGetStarted}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-purple-500/10 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl mx-auto animate-fade-in"
        >
          {/* Badge Trigger */}
          <div className="inline-flex items-center space-x-2 bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>AI-Powered Recommendations Powered by Gemini 3.5</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Discover AI That <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Matters to You.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Stop scrolling endlessly. Get a custom, real-time synthesized feed of AI applications, breaking research papers, and software tools matching your specific profession, experience, and learning goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              id="hero-get-started-btn"
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-purple-500/15 flex items-center justify-center space-x-2 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>Build My Profile Feed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-explore-btn"
              onClick={onExplore}
              className="w-full sm:w-auto border border-white/5 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Explore AI Directory</span>
            </button>
          </div>
        </motion.div>

        {/* Floating AI dashboard illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 md:mt-20 max-w-5xl mx-auto relative rounded-2xl border border-white/5 bg-zinc-950/20 p-2 md:p-3 shadow-2xl overflow-hidden group"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500"></div>
          
          <div className="bg-zinc-950 rounded-xl overflow-hidden aspect-[16/9] border border-white/5 p-4 md:p-6 text-left relative">
            
            {/* Embedded mockup sidebar + main view */}
            <div className="flex h-full space-x-4 md:space-x-6">
              {/* Mock sidebar */}
              <div className="w-1/4 hidden md:block border-r border-white/5 pr-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-md bg-purple-500"></div>
                  <div className="h-3 w-20 bg-zinc-900 rounded"></div>
                </div>
                <div className="space-y-2.5 pt-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 bg-zinc-900 rounded"></div>
                      <div className="h-2 w-16 bg-zinc-900 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock Main Dashboard */}
              <div className="flex-1 space-y-4">
                {/* Header Mock */}
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="space-y-1">
                    <div className="h-4 w-36 bg-zinc-900 rounded"></div>
                    <div className="h-2 w-24 bg-zinc-900 rounded"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-900"></div>
                </div>

                {/* Welcome Card Mock */}
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/10 rounded-xl flex items-center justify-between">
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-44 bg-purple-100/20 rounded"></div>
                    <div className="h-2 w-72 bg-zinc-900 rounded"></div>
                  </div>
                  <div className="p-2 bg-purple-500 text-white rounded-lg hidden sm:block">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                </div>

                {/* Grid Mock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="p-3 bg-zinc-950 border border-white/5 rounded-xl space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <div className="h-4 w-12 bg-purple-950/30 rounded-full"></div>
                      </div>
                      <div className="h-3 w-28 bg-zinc-900 rounded"></div>
                      <div className="h-2 w-full bg-zinc-900 rounded"></div>
                      <div className="h-2 w-3/4 bg-zinc-900 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Float-out Card 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-6 right-6 p-3.5 bg-zinc-950 border border-purple-500/20 rounded-xl shadow-2xl space-y-2 w-48 hidden md:block"
            >
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-purple-500 text-white rounded flex items-center justify-center text-[10px] font-bold">C</div>
                <span className="text-xs font-semibold">Cursor editor</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-bold">98%</span>
              </div>
              <p className="text-[10px] text-zinc-400">Integrated AI-first Coding environment matching React stack.</p>
            </motion.div>

            {/* Float-out Card 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-12 right-12 p-3 bg-zinc-950 border border-cyan-500/20 rounded-xl shadow-2xl flex items-center space-x-2.5 hidden lg:flex"
            >
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <div className="text-left">
                <p className="text-[10px] font-bold">Trending #1 Category</p>
                <p className="text-[8px] text-zinc-400">Generative Prototyping</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section className="bg-zinc-950/20 border-y border-white/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Tailored Capabilities for the Smart Era
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              We compile and index the sprawling world of artificial intelligence so you focus only on what multiplies your effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-sm font-semibold text-white">Personalized Recommendations</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Receive suggestions dynamically synthesized on our Express backend utilizing the Gemini 3.5 foundational model.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <Rss className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Latest AI News</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Stay updated with breaking releases, academic research papers, and technical updates from top publications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">AI Tool Discovery</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                A massive searchable directory categorized by pricing, popularity, and specific developer use-cases.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Compare AI Tools</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Map pricing, API availability, open source status, and performance metrics in an interactive table side-by-side.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Bookmark Favorites</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Save tools and organize them into tailored collections for Work, Productivity, Learning, or Favorites.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Learning Roadmaps</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Convert suggested action steps directly into practical day-to-day exercises to conquer skill gaps.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Grid className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Weekly AI Digest</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Receive weekly synthesized reports highlighting new model updates relevant exclusively to your core stack.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Smart Notifications</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Real-time trigger alerts notifying you of major model price drops, trending tools, and category expansions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Your Path to Mastery</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Get personalized intelligence recommendations in four simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[44px] inset-x-8 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500/40 z-0"></div>

          {/* Step 1 */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-12 h-12 bg-zinc-950 border border-purple-500/30 rounded-full flex items-center justify-center font-semibold text-sm mx-auto text-purple-400 shadow-xl">
              01
            </div>
            <h3 className="text-sm font-semibold text-white">Create Profile</h3>
            <p className="text-[11px] text-zinc-400 max-w-[200px] mx-auto leading-relaxed">Register a secure hub workspace using Google or GitHub auth credentials.</p>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-12 h-12 bg-zinc-950 border border-purple-500/30 rounded-full flex items-center justify-center font-semibold text-sm mx-auto text-purple-400 shadow-xl">
              02
            </div>
            <h3 className="text-sm font-semibold text-white">Select Interests</h3>
            <p className="text-[11px] text-zinc-400 max-w-[200px] mx-auto leading-relaxed">Provide your current engineering or design skills, experience, and learning goals.</p>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-12 h-12 bg-zinc-950 border border-purple-500/30 rounded-full flex items-center justify-center font-semibold text-sm mx-auto text-purple-400 shadow-xl">
              03
            </div>
            <h3 className="text-sm font-semibold text-white">Discover Customized AI</h3>
            <p className="text-[11px] text-zinc-400 max-w-[200px] mx-auto leading-relaxed">Review strategic insights generated by Gemini targeting your profile.</p>
          </div>

          {/* Step 4 */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-12 h-12 bg-zinc-950 border border-purple-500/30 rounded-full flex items-center justify-center font-semibold text-sm mx-auto text-purple-400 shadow-xl">
              04
            </div>
            <h3 className="text-sm font-semibold text-white">Stay Updated</h3>
            <p className="text-[11px] text-zinc-400 max-w-[200px] mx-auto leading-relaxed">Monitor breaking papers, trending tools, and bookmark items for collaborative work.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-950/20 border-y border-white/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">Endorsed by Professionals</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">See how our custom recommendations have transformed daily work velocities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "AI Intelligence Hub recommended I replace standard VS Code with Cursor and build custom Anthropic Projects. My engineering velocity has literally doubled in under two weeks."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold flex items-center justify-center border border-purple-500/20">
                  MD
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Marcus Chen</h4>
                  <p className="text-[9px] text-zinc-500">Lead Architect at Vercel</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "As a UI designer, the noise of new AI tools was overwhelming. The onboarding wizard immediately focused my dashboard on generative component systems like v0 and vector art."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold flex items-center justify-center border border-cyan-500/20">
                  EL
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Emma Lindqvist</h4>
                  <p className="text-[9px] text-zinc-500">Freelance Product Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-5 bg-zinc-950/40 border border-white/5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "We set up our marketing team profile in 5 minutes. The tailored action plan and research notebook suggestions in NotebookLM revolutionized our content curation pipelines."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold flex items-center justify-center border border-indigo-500/20">
                  AH
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Aris Thorne</h4>
                  <p className="text-[9px] text-zinc-500">Digital Strategist, OmniMedia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080808] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">AI Intelligence Hub</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
          </div>

          <p className="text-xs text-zinc-600">
            &copy; 2026 AI Intelligence Hub. Built on Google Cloud Run.
          </p>
        </div>
      </footer>
    </div>
  );
}
