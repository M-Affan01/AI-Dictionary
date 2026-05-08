/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  History,
  Settings,
  UserCircle,
  Sparkles,
  Volume2,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Languages,
  History as HistoryIcon,
  Brain,
  Layers,
  Contrast,
  Lightbulb,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Plus
} from 'lucide-react';
import { AppView, WordInsight } from './types';
import { WORD_OF_THE_DAY, INITIAL_LIBRARY } from './constants';
import { getWordInsight } from './services/gemini';

// --- Components ---

const Header = ({ currentView, changeView, openSettings }: { currentView: AppView, changeView: (v: AppView) => void, openSettings: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 frosted-glass h-20">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div
          className="text-xl font-bold tracking-tighter uppercase italic cursor-pointer group"
          onClick={() => {
            changeView('home');
            setIsMenuOpen(false);
          }}
        >
          Lexis <span className="text-white/40 group-hover:text-white transition-colors">AI</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { id: 'home', label: 'Home', icon: BookOpen },
            { id: 'details', label: 'Vault', icon: Search },
            { id: 'library', label: 'Saved', icon: Bookmark },
            { id: 'insights', label: 'Stats', icon: TrendingUp }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => changeView(item.id as AppView)}
              className={`nav-link-hover py-1 flex items-center gap-2 ${currentView === item.id
                  ? 'text-white after:w-full'
                  : 'text-white/50'
                }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:block h-8 w-[1px] bg-white/20"></div>
          <button
            onClick={openSettings}
            className="p-2 text-white/50 hover:text-white transition-all transform hover:rotate-90 active:scale-95"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white/50 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Layers className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {[
                { id: 'home', label: 'Home', icon: BookOpen },
                { id: 'details', label: 'Vault', icon: Search },
                { id: 'library', label: 'Saved', icon: Bookmark },
                { id: 'insights', label: 'Stats', icon: TrendingUp }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    changeView(item.id as AppView);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${currentView === item.id ? 'text-white' : 'text-white/40'}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Foot = () => (
  <footer className="py-12 border-t border-white/10 bg-black flex flex-col md:flex-row items-center justify-between px-8 gap-8 text-[10px] text-white/40 uppercase tracking-widest mt-32">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        <span>Lexis AI Status: Optimal</span>
      </div>
      <span>Linguistic Library: v2.04</span>
    </div>
    <div className="flex flex-wrap justify-center gap-6">
      <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
      <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
      <span className="text-white/60">© 2024 Lexis AI</span>
    </div>
  </footer>
);

// --- Home View ---

const HomeView = ({ 
  onSearch, 
  handleSpeak, 
  setView, 
  setSearchWord, 
  setLibrary, 
  library 
}: { 
  onSearch: (w: string) => void, 
  handleSpeak: (t: string) => void,
  setView: (v: AppView) => void,
  setSearchWord: (w: WordInsight) => void,
  setLibrary: (l: WordInsight[]) => void,
  library: WordInsight[]
}) => (
  <div className="pt-32 space-y-24">
    {/* Hero */}
    <section className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-light leading-tight tracking-tight">
        Architecture <br />
        <span className="italic">of Language</span>
      </h1>

      <div className="relative group max-w-2xl mx-auto px-4">
        <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 md:px-8 py-4 md:py-5 shadow-2xl transition-all duration-500 group-focus-within:border-white/40 group-focus-within:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
          <Search className="text-white/40 mr-3 md:mr-4 w-4 h-4 md:w-5 md:h-5 transition-colors group-focus-within:text-white" />
          <input
            type="text"
            placeholder="Search for etymology..."
            className="bg-transparent border-none focus:ring-0 w-full text-base md:text-lg placeholder:text-white/20 outline-none font-light"
            onKeyDown={(e) => e.key === 'Enter' && onSearch((e.target as HTMLInputElement).value)}
          />
          <div className="flex items-center gap-2 ml-3 md:ml-4 border-l border-white/10 pl-3 md:pl-4">
            <Sparkles className="text-white/20 w-4 h-4 md:w-5 md:h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </section>

    {/* Featured Cards */}
    <section className="grid grid-cols-1 md:grid-cols-12 gap-1 border-y border-white/10">
      {/* Word of the Day */}
      <div className="md:col-span-8 p-8 md:p-12 bg-gradient-to-br from-black to-zinc-950 border-b md:border-b-0 md:border-r border-white/10">
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 italic mb-4 block">Current Spotlight</span>
            <h2 className="text-4xl sm:text-6xl font-serif font-light mb-2">{WORD_OF_THE_DAY.word}</h2>
            <div className="flex items-center gap-4">
              <p className="text-white/30 italic font-serif text-lg md:text-xl">{WORD_OF_THE_DAY.phonetic}</p>
              <button
                onClick={() => handleSpeak(WORD_OF_THE_DAY.word)}
                className="text-white/20 hover:text-white transition-all transform hover:scale-110 p-2 rounded-full hover:bg-white/5"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="timeline-border pl-6 md:pl-10 space-y-6 max-w-xl">
            <p className="text-xl md:text-2xl leading-relaxed text-white/70 font-light">
              {WORD_OF_THE_DAY.definition}
            </p>
            <div className="flex items-center gap-2 text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium">
              <Brain className="w-3 h-3" />
              Source: Proto-Indo-European *āmar-
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 pt-6">
            <button 
              onClick={() => {
                setSearchWord(WORD_OF_THE_DAY);
                setView('details');
              }}
              className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-xl"
            >
              Full Analysis
            </button>
            <button 
              onClick={() => {
                if (!library.find(l => l.word === WORD_OF_THE_DAY.word)) {
                  setLibrary([WORD_OF_THE_DAY, ...library]);
                  alert(`${WORD_OF_THE_DAY.word} added to your library.`);
                }
              }}
              className="px-8 py-3 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white/5 transition-all hover:border-white/30"
            >
              Save to Library
            </button>
          </div>
        </div>
      </div>

      {/* Side Bento */}
      <div className="md:col-span-4 flex flex-col">
        <div 
          onClick={() => setView('insights')}
          className="flex-1 p-10 bg-black border-b border-white/10 glass-hover cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-6 block italic">Semantic Insight</span>
          <p className="text-sm text-white/60 leading-relaxed font-light">
            {WORD_OF_THE_DAY.usageInsight}
          </p>
        </div>
        <div 
          onClick={() => setView('library')}
          className="flex-1 p-10 bg-zinc-950/50 flex flex-col justify-end glass-hover cursor-pointer"
        >
          <div className="text-[10px] text-white/20 uppercase tracking-widest mb-2 font-mono">Archive // v2.04</div>
          <h4 className="text-2xl font-serif italic text-white/80">The Evolution of Syntax in Medieval Texts</h4>
        </div>
      </div>
    </section>

    {/* Linguistic Treasures */}
    <section className="space-y-12 py-12">
      <div className="flex justify-between items-end border-b border-white/10 pb-8">
        <div>
          <h3 className="text-4xl font-serif font-light mb-2 italic">Linguistic Treasures</h3>
          <p className="text-white/40 text-sm font-light">Explore rare dialects and extinct morphological structures.</p>
        </div>
        <button 
          onClick={() => setView('library')}
          className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          View Archive <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
        {[
          { title: 'Dead Sea Scrolls', sub: 'Aramaic Study', icon: BookOpen },
          { title: 'Rosetta Stone', sub: 'Deciphering Keys', icon: Languages },
          { title: 'Beowulf Codex', sub: 'Old English', icon: HistoryIcon },
          { title: 'Voynich MS', sub: 'Cryptic Semantics', icon: Search }
        ].map((item) => (
          <div 
            key={item.title} 
            onClick={() => setView('library')}
            className="bg-black p-10 hover:bg-zinc-950 transition-all cursor-pointer group glass-hover"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110">
              <item.icon className="w-4 h-4" />
            </div>
            <h5 className="font-serif text-xl mb-1 group-hover:text-white transition-colors">{item.title}</h5>
            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest italic">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// --- Details View ---

const DetailsView = ({ word, handleSpeak }: { word: WordInsight, handleSpeak: (t: string) => void }) => (
  <div className="pt-32 space-y-8 md:space-y-12">
    <section className="bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-16 radial-underglow relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className="border border-white/20 px-3 md:px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest italic text-white/40">
              {word.partOfSpeech}
            </span>
            <span className="bg-white text-black px-3 md:px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Linguistic Profile
            </span>
            <div className="flex items-center gap-2 text-white/30 font-serif italic text-base md:text-lg">
              <span>{word.phonetic}</span>
              <button
                onClick={() => handleSpeak(word.word)}
                className="hover:text-white transition-all transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-white/5"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-light tracking-tight hover:italic transition-all duration-500 cursor-default">{word.word}</h1>
        </div>
      </div>

      <div className="timeline-border pl-6 md:pl-12 py-4">
        <p className="text-3xl sm:text-4xl md:text-5xl text-white/80 font-serif leading-tight mb-6 italic">{word.definition}</p>
        <p className="text-white/30 italic text-lg md:text-xl font-light">"{word.example}"</p>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-white/10 border border-white/10">
          {/* Synonyms */}
          <div className="bg-black p-10 space-y-8 glass-hover">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 italic block">Semantic Neighbors</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {word.synonyms?.map(s => (
                <span key={s} className="text-2xl font-serif italic text-white/70 hover:text-white transition-all cursor-pointer border-b border-white/5 pb-1 hover:border-white/40 hover:scale-105 active:scale-95">{s}</span>
              ))}
            </div>
          </div>

          {/* Antonyms */}
          <div className="bg-black p-10 space-y-8 glass-hover">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 italic block">Divergent Forms</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {word.antonyms?.map(s => (
                <span key={s} className="text-2xl font-serif italic text-white/30 hover:text-white transition-all cursor-pointer border-b border-white/5 pb-1 hover:border-white/40 hover:scale-105 active:scale-95">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Translations */}
        <div className="bg-gradient-to-b from-zinc-950 to-black border border-white/10 p-10 space-y-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Languages className="text-white/20 w-6 h-6" />
              <h3 className="text-xl font-serif italic text-white/80">Cross-Cultural Mapping</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {word.translations?.map(t => (
              <div
                key={t.lang}
                onClick={() => handleSpeak(t.word)}
                className="flex items-center justify-between pb-4 border-b border-white/5 hover:border-white/20 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-bold text-white/20 w-8 italic uppercase tracking-widest group-hover:text-white/40 transition-colors">{t.lang}</span>
                  <span className="text-2xl font-serif group-hover:text-white transition-colors">{t.word}</span>
                </div>
                <Volume2 className="w-4 h-4 text-white/10 group-hover:text-white/40 group-hover:scale-110 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="md:col-span-4 space-y-12">
        <div className="border border-white/10 p-10 bg-black space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 italic block">Etymological Origin</span>
          </div>
          <p className="text-lg text-white/60 leading-relaxed font-light font-serif italic">
            {word.etymology}
          </p>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-6">
          <div className="flex items-center gap-3">
            <Brain className="text-white/20 w-5 h-5" />
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Usage Dynamics</h4>
          </div>
          <p className="text-sm text-white/50 leading-relaxed font-light">
            {word.usageInsight}
          </p>
        </div>
      </aside>
    </div>
  </div>
);

// --- Library View ---

const LibraryView = ({ words }: { words: WordInsight[] }) => (
  <div className="pt-32 space-y-16">
    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
      <div>
        <h1 className="text-7xl font-serif font-light mb-4">The Archive</h1>
        <p className="text-xl text-white/40 font-light italic">Saved lexical discoveries and semantic explorations.</p>
      </div>
      <div className="flex gap-4">
        {['Recent', 'A-Z', 'Categories'].map(label => (
          <button key={label} className="px-8 py-3 bg-black border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            {label}
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
      {words.map(w => (
        <div key={w.word} className="bg-black p-10 group hover:bg-zinc-950 transition-all duration-500 cursor-pointer glass-hover">
          <div className="flex justify-between items-start mb-10">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors">
              {w.word === 'Ephemeral' ? 'INSIGHT-V1' : 'SAVED'}
            </span>
            <Bookmark className={`w-4 h-4 cursor-pointer transition-all transform group-hover:scale-120 ${w.word === 'Petrichor' ? 'text-white' : 'text-white/10 hover:text-white'}`} />
          </div>
          <h3 className="text-4xl font-serif mb-2 group-hover:text-white transition-colors">{w.word}</h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest italic mb-8">{w.phonetic}</p>
          <div className="timeline-border pl-8 mb-10 border-white/10 group-hover:border-white/30 transition-colors">
            <p className="text-white/50 font-light line-clamp-3 italic leading-relaxed group-hover:text-white/70 transition-colors">{w.definition}</p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-1 border border-white/5 text-[10px] font-bold text-white/20 uppercase tracking-tighter group-hover:border-white/20 group-hover:text-white/40 transition-all">Archived</span>
          </div>
        </div>
      ))}
      <div className="bg-zinc-950/50 flex flex-col items-center justify-center p-12 group cursor-pointer border border-dashed border-white/5 hover:border-white/20 hover:bg-white/5 transition-all">
        <Plus className="text-white/10 w-8 h-8 group-hover:scale-110 group-hover:text-white transition-all mb-4" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 group-hover:text-white/60 transition-all">Add Manual Entry</p>
      </div>
    </div>
  </div>
);

// --- Insights View ---

const InsightsView = ({ word, handleSpeak }: { word: WordInsight, handleSpeak: (t: string) => void }) => (
  <div className="pt-32 space-y-12 md:space-y-16">
    <header className="text-center relative py-12 md:py-20 bg-gradient-to-b from-zinc-950 to-black border-y border-white/10 group overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-32 radial-underglow pointer-events-none" />
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6 block italic px-4">Linguistic Profile // 01 / 12</span>
      <div className="flex flex-col items-center gap-4 px-4">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-serif font-light italic tracking-tighter leading-none hover:text-white transition-colors cursor-default">{word.word}</h1>
        <button
          onClick={() => handleSpeak(word.word)}
          className="text-white/10 hover:text-white transition-all transform hover:scale-110 p-4 rounded-full hover:bg-white/5"
        >
          <Volume2 className="w-8 h-8" />
        </button>
      </div>
      <p className="text-white/40 text-lg sm:text-xl md:text-2xl font-light font-serif italic max-w-3xl mx-auto opacity-80 leading-relaxed px-6 mt-8">({word.partOfSpeech.toLowerCase()}.) {word.definition}</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-white/10 border border-white/10">
      <section className="md:col-span-7 bg-black p-16 space-y-16">
        <div className="flex justify-between items-center border-b border-white/10 pb-10">
          <h2 className="text-3xl font-serif italic">Etymology Timeline</h2>
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest font-bold">Ref: PIE-V2</div>
        </div>
        <div className="space-y-16 relative">
          <div className="absolute left-[3px] top-4 bottom-4 w-[1px] bg-white/10" />
          {word.timeline.map((item, i) => (
            <div key={i} className="flex gap-12 group relative cursor-default hover:bg-white/5 p-6 -ml-6 rounded-2xl transition-all duration-500">
              <div className={`z-10 w-2 h-2 rounded-full absolute left-[-0.5px] mt-2 transition-all duration-500 ${i === 0 ? 'bg-white ring-4 ring-white/10' : 'bg-white/20 group-hover:bg-white/60'}`} />
              <div className="pl-6">
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] font-mono transition-colors ${i === 0 ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>{item.period}</span>
                <h3 className="text-2xl font-serif mt-2 italic text-white/90 group-hover:text-white transition-colors">{item.details}</h3>
                <p className="text-white/50 mt-4 leading-relaxed font-light max-w-xl group-hover:text-white/70 transition-colors">{item.context}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="md:col-span-5 bg-gradient-to-b from-[#080808] to-black p-16 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-serif italic mb-16">Usage Intensity</h2>
          <div className="flex items-end justify-between gap-4 h-64 mb-10">
            {word.usageTrend.map((h, i) => (
              <div
                key={i}
                className={`w-full transition-all duration-1000 ${i === word.usageTrend.length - 1 ? 'bg-white' : 'bg-white/10 hover:bg-white/20'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-white/20 text-[10px] font-mono uppercase tracking-widest border-t border-white/10 pt-4">
            <span>1800</span>
            <span>Present</span>
          </div>
        </div>
        <p className="text-sm text-white/40 leading-relaxed font-light italic mt-16 pb-2 border-b border-white/5">
          Temporal analysis indicates a significant <span className="text-white font-bold">24%</span> deviation in literary frequency since the last cycle.
        </p>
      </section>

      <section className="md:col-span-12 bg-black p-16 space-y-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/10 pb-10">
          <h2 className="text-3xl font-serif italic">Relational Collocations</h2>
          <div className="flex gap-4">
            {['Frequency', 'Variance'].map(f => (
              <button key={f} className="px-8 py-2 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white hover:text-black transition-all">
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
          {word.collocations.map(c => (
            <div key={c.pair} className="p-12 bg-black hover:bg-zinc-950 transition-colors group cursor-pointer glass-hover">
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/20 italic group-hover:text-white/40 transition-colors">{c.label}</span>
              <div className="text-2xl font-serif italic mt-4 mb-10 group-hover:text-white transition-colors">{c.pair}</div>
              <div className="w-full bg-white/5 h-px relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.frequency}%` }}
                  className="bg-white h-full group-hover:bg-white/80 transition-colors"
                />
              </div>
              <div className="mt-2 text-right text-[10px] font-mono text-white/10 group-hover:text-white/30 transition-colors">{c.frequency}% Match</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

// --- Settings Modal ---

const SettingsModal = ({ isOpen, onClose, settings, setSettings }: {
  isOpen: boolean,
  onClose: () => void,
  settings: any,
  setSettings: (s: any) => void
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/10 z-[101] p-12 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-3xl font-serif italic">System Configuration</h2>
              <button
                onClick={onClose}
                className="p-2 text-white/20 hover:text-white transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="space-y-12">
              {/* Voice Selection */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-white/20" />
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Vocal Synthesis</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <select
                    value={settings.voiceName}
                    onChange={(e) => setSettings({ ...settings, voiceName: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/30 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Default System Voice</option>
                    {voices.map(voice => (
                      <option key={voice.name} value={voice.name} className="bg-black text-white">{voice.name} ({voice.lang})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Visual Theme */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Contrast className="w-4 h-4 text-white/20" />
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Visual Interface</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Default', 'High Contrast'].map(theme => (
                    <button
                      key={theme}
                      onClick={() => setSettings({ ...settings, theme })}
                      className={`px-4 py-3 text-[10px] uppercase tracking-widest font-bold border transition-all ${settings.theme === theme ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:border-white/30'
                        }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Persistence */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <HistoryIcon className="w-4 h-4 text-white/20" />
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Data Management</span>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Wipe all local lexical data?')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="w-full py-3 border border-red-900/30 text-red-500 text-[10px] uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-all"
                >
                  Reset Library
                </button>
              </div>
            </div>

            <div className="absolute bottom-12 left-12 right-12">
              <div className="text-[10px] text-white/10 uppercase tracking-widest mb-2">Build // 2.0.4.77</div>
              <div className="text-[10px] text-white/10 uppercase tracking-widest italic">Lexis AI Core // Powered by Groq</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [searchWord, setSearchWord] = useState<WordInsight>(WORD_OF_THE_DAY);
  const [library, setLibrary] = useState<WordInsight[]>(INITIAL_LIBRARY);
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    voiceName: '',
    theme: 'Default',
    fontSize: 'Normal'
  });

  const handleSpeak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => v.name === settings.voiceName);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };
  const handleSearch = async (word: string) => {
    if (!word) return;
    setLoading(true);
    const insight = await getWordInsight(word);
    if (insight) {
      setSearchWord(insight);
      setView('details');
      // Add to history if unique
      if (!library.find(l => l.word.toLowerCase() === insight.word.toLowerCase())) {
        setLibrary([insight, ...library]);
      }
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${settings.theme === 'High Contrast' ? 'theme-high-contrast' : ''}`}>
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="jellyfish-glow w-[600px] h-[600px] top-[-10%] right-[-10%]" />
        <div className="jellyfish-glow w-[400px] h-[400px] bottom-[10%] left-[-10%] bg-tertiary/20" style={{ animationDelay: '-5s' }} />
        <div className="jellyfish-glow w-[300px] h-[300px] top-[40%] left-[20%] opacity-20" style={{ animationDelay: '-12s' }} />
      </div>

      <Header
        currentView={view}
        changeView={setView}
        openSettings={() => setSettingsOpen(true)}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface/80 backdrop-blur-2xl"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-3xl border-4 border-primary/20 border-t-primary"
              />
              <p className="mt-8 text-xl font-display font-medium tracking-widest text-primary animate-pulse uppercase">Searching Lexis AI...</p>
            </motion.div>
          ) : (
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {view === 'home' && (
                <HomeView 
                  onSearch={handleSearch} 
                  handleSpeak={handleSpeak} 
                  setView={setView}
                  setSearchWord={setSearchWord}
                  setLibrary={setLibrary}
                  library={library}
                />
              )}
              {view === 'details' && <DetailsView word={searchWord} handleSpeak={handleSpeak} />}
              {view === 'library' && <LibraryView words={library} />}
              {view === 'insights' && <InsightsView word={searchWord} handleSpeak={handleSpeak} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Foot />
    </div>
  );
}
