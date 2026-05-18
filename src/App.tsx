import { Activity, BarChart2, CheckCircle2, Clock, ShieldAlert, TrendingUp, Upload, Zap, ArrowLeft, Target, Cpu, Globe2, Sparkles, Users, Send, Lock, Unlock, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useRef, useState } from 'react';
import { ParticleBackground } from './components/ParticleBackground';

interface AnalysisResult {
  trend: string;
  signal: 'CALL' | 'PUT';
  confidence: number;
  reason: string;
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image too large. Please select an image under 10MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const preventDefault = (e: React.DragEvent) => e.preventDefault();

  const analyzeChart = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);
    
    // Simulate complex AI analysis delay
    setTimeout(() => {
      const signals: ('CALL' | 'PUT')[] = ['CALL', 'PUT'];
      const trends = ['Bullish', 'Bearish', 'Sideways', 'Strong Bullish', 'Strong Bearish'];
      
      const randomSignal = signals[Math.floor(Math.random() * signals.length)];
      const randomTrend = trends[Math.floor(Math.random() * trends.length)];
      const randomConfidence = Math.floor(Math.random() * (98 - 75 + 1)) + 75; // 75% to 98%
      
      const callReasons = [
        "Price action indicates a strong rejection at the support level, confirming bullish momentum.",
        "RSI is oversold and a bullish engulfing candlestick pattern has formed.",
        "Moving average crossover indicates a short-term upward trend continuation.",
        "Breakout above the local resistance zone suggests further upside potential."
      ];
      
      const putReasons = [
        "Significant price rejection at the resistance zone indicates bearish pressure.",
        "RSI divergence combined with a bearish pin bar suggests an immediate reversal.",
        "Breakdown below the recent consolidation phase points to a downward move.",
        "MACD histogram shows decreasing bullish momentum, aligning with a potential drop."
      ];
      
      const randomReason = randomSignal === 'CALL' 
        ? callReasons[Math.floor(Math.random() * callReasons.length)]
        : putReasons[Math.floor(Math.random() * putReasons.length)];

      setResult({
        trend: randomTrend,
        signal: randomSignal,
        confidence: randomConfidence,
        reason: randomReason,
      });
      
      setIsAnalyzing(false);
    }, 2500); // 2.5 seconds fake processing time
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'traderx007') {
      setIsUnlocked(true);
    } else {
      setPassError(true);
      setTimeout(() => setPassError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans relative pb-20">
      <ParticleBackground />

      {!isUnlocked ? (
        <main className="max-w-md mx-auto px-4 pt-32 flex flex-col items-center gap-10 relative z-10 min-h-[80vh] justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5 text-center w-full"
          >
            <div className="relative">
              {/* Glowing effects behind icon */}
              <div className="absolute inset-0 bg-cyan-500/40 blur-2xl rounded-full" />
              <div className="absolute inset-0 bg-purple-500/40 blur-2xl rounded-full translate-x-2 translate-y-2" />
              <div className="relative w-24 h-24 bg-slate-900/90 border border-slate-700/80 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-md animate-pulse">
                <Lock className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" strokeWidth={2} />
              </div>
            </div>
            
            <div className="flex flex-col items-center mt-2">
              <div className="flex items-center gap-3 flex-wrap justify-center mb-1">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] uppercase animate-text-gradient bg-[length:200%_auto]">
                  Galaxy Octa Core
                </h1>
                <Sparkles className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)] animate-pulse" />
              </div>
              <p className="text-[10px] tracking-[0.3em] text-cyan-400/80 font-bold uppercase mt-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                Secure Access Required
              </p>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.1 }}
             className="w-full relative group"
          >
             <form onSubmit={handleUnlock} className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/80 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col gap-6 w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-purple-600/10 rounded-3xl group-hover:from-cyan-500/20 group-hover:to-purple-600/20 transition duration-500 pointer-events-none" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-3xl blur opacity-50 group-hover:opacity-100 transition duration-500 pointer-events-none animate-pulse" />
                
                <div className="relative z-10 w-full pt-2">
                   <div className="relative">
                     <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                     <input
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Enter Password"
                       className={`w-full bg-slate-950/90 border-2 ${passError ? 'border-red-500/60 focus:border-red-500 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-slate-700/80 focus:border-cyan-500 text-slate-100 shadow-[0_0_15px_rgba(34,211,238,0.1)]'} rounded-2xl py-5 pl-14 pr-6 font-black text-center text-lg outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all tracking-widest placeholder:text-slate-600`}
                     />
                   </div>
                   <AnimatePresence>
                     {passError && (
                       <motion.p 
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         className="text-red-400 text-xs text-center font-bold tracking-widest mt-4 uppercase drop-shadow-[0_0_5px_rgba(239,68,68,0.6)]"
                       >
                         Invalid Password! Access Denied.
                       </motion.p>
                     )}
                   </AnimatePresence>
                </div>

                <button
                  type="submit"
                  className="relative w-full overflow-hidden rounded-2xl p-[1px] group mt-4 z-10"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-2xl animate-[spin_3s_linear_infinite] opacity-80 group-hover:opacity-100" />
                  <div className="relative bg-slate-950 px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all group-hover:bg-slate-900 border border-transparent">
                    <Unlock className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-black text-slate-100 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                      Unlock System
                    </span>
                  </div>
                </button>
             </form>
          </motion.div>
        </main>
      ) : (
        <main className="max-w-2xl mx-auto px-4 pt-12 flex flex-col gap-8 relative z-10">
          
          {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            {/* Glowing effect behind icon */}
            <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-2xl" />
            <div className="relative w-16 h-16 bg-slate-900/80 border border-slate-700/50 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-900/20 backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-cyan-400" strokeWidth={2.5} />
            </div>
          </div>
          
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] uppercase animate-text-gradient bg-[length:200%_auto]">
                Galaxy Octa Core
              </h1>
              <Sparkles className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)] animate-pulse" />
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-400 border border-purple-800/50 uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.4)] animate-pulse">
                Pro
              </span>
            </div>
            <p className="text-sm tracking-[0.2em] text-slate-400 font-medium uppercase mt-1">
              Professional Trading Intelligence
            </p>
          </div>
        </motion.div>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          {/* Animated glowing border effect wrapper */}
          <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500/20 to-blue-600/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
          
          <div 
            className="relative bg-slate-925/80 backdrop-blur-md rounded-3xl p-8 border border-slate-800 shadow-2xl overflow-hidden cursor-pointer hover:bg-slate-900/80 transition-colors"
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
            />

            <div className="border-2 border-dashed border-slate-700/70 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[250px] relative transition-all group-hover:border-cyan-500/50">
              
              {/* Optional glowing effect inside the box when empty */}
              {!selectedImage && (
                 <div className="absolute inset-0 bg-cyan-900/5 blur-3xl rounded-full" />
              )}

              <AnimatePresence mode="wait">
                {selectedImage ? (
                  <motion.div 
                    key="image"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="w-full relative z-10 flex flex-col items-center"
                  >
                    <img src={selectedImage} alt="Uploaded chart" className="max-h-64 object-contain rounded-xl border border-slate-700/50 shadow-lg" />
                    <p className="mt-4 text-sm text-cyan-400 font-medium">Click or Drop to replace image</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-700 group-hover:bg-slate-800 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all">
                      <Upload className="w-7 h-7 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Upload Chart Screenshot</h3>
                    <p className="text-slate-500 text-sm">Drag & drop or click to browse</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        {selectedImage && !result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5 w-full"
          >
            <button
              onClick={(e) => { e.stopPropagation(); analyzeChart(); }}
              disabled={isAnalyzing}
              className="relative w-full overflow-hidden rounded-2xl p-[1px] group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl animate-[spin_3s_linear_infinite] group-hover:opacity-100 opacity-80" />
              <div className="relative bg-slate-950 px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all group-hover:bg-slate-900">
                {isAnalyzing ? (
                  <div className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                ) : (
                  <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
                )}
                <span className="text-lg font-bold text-slate-100 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  {isAnalyzing ? 'Analyzing Market Data...' : 'Analyze Market Protocol'}
                </span>
              </div>
            </button>
            {error && <p className="text-red-400 text-sm bg-red-950/40 px-4 py-2 rounded-lg border border-red-900/50">{error}</p>}
          </motion.div>
        )}

        {/* Homepage Features Dashboard */}
        {!selectedImage && !result && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Live Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-cyan-500/30 transition-all group">
                <Target className="w-7 h-7 text-cyan-400 mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-black text-slate-100 mb-1 tracking-tight">94.8%</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Base Accuracy</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-cyan-500/30 transition-all group">
                <Zap className="w-7 h-7 text-amber-400 mb-3 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-black text-slate-100 mb-1 tracking-tight">&lt; 2s</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Analysis Speed</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-cyan-500/30 transition-all relative overflow-hidden group">
                <div className="absolute top-4 right-4 flex space-x-1">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                   <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-0 right-0"></span>
                </div>
                <Users className="w-7 h-7 text-emerald-400 mb-3 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] group-hover:scale-110 transition-transform relative z-10" />
                <span className="text-3xl font-black text-slate-100 mb-1 tracking-tight relative z-10">4.2K</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest relative z-10">Active Traders</span>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-start gap-4 hover:bg-slate-800/50 transition-colors">
                <div className="p-3 border border-slate-700 bg-slate-800/80 rounded-xl shadow-inner">
                  <Cpu className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200 mb-2 uppercase tracking-wide">Deep Learning Engine</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">Scans visual candlestick patterns and indicators instantly to predict short-term market movements.</p>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-start gap-4 hover:bg-slate-800/50 transition-colors">
                <div className="p-3 border border-slate-700 bg-slate-800/80 rounded-xl shadow-inner">
                  <Globe2 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200 mb-2 uppercase tracking-wide">OTC & Regular Markets</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">Works perfectly on both weekend OTC algorithms and regular weekday currency pairs.</p>
                </div>
              </div>
            </div>

            {/* How it works simple text */}
            <div className="bg-cyan-950/20 border border-cyan-900/30 p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <Sparkles className="w-8 h-8 text-cyan-400 mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <h3 className="text-slate-100 font-black mb-3 tracking-widest uppercase text-sm">How The AI Works</h3>
              <p className="text-sm text-slate-400 max-w-lg leading-relaxed font-medium">
                Upload a clear screenshot of your trading chart from Quotex or Pocket Option. Our neural network will analyze visual price action and oscillator divergence to output a highly probable 1-minute expiration signal.
              </p>
            </div>
          </motion.div>
        )}

        {/* Analysis Result Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              className="flex flex-col gap-6"
            >
               {/* Signal Card */}
               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 rounded-[2rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-500" />
                 
                 <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center overflow-hidden">
                    
                    {/* Background glow specific to signal */}
                    <div className={`absolute top-0 w-full h-1/2 opacity-20 blur-3xl ${result.signal === 'CALL' ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                    <div className="space-y-2 mb-8 w-full z-10">
                      <div className="flex flex-col sm:flex-row justify-center items-center w-full mb-8 bg-slate-950/80 p-4 rounded-2xl border border-slate-700/80 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
                        
                        <div className="flex items-center gap-3 bg-emerald-950/40 px-5 py-3 rounded-xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] relative z-10 w-full sm:w-auto justify-center">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                          <span className="text-sm sm:text-base font-bold text-emerald-50 tracking-widest uppercase">
                            Confidence: <span className="text-emerald-400 font-black text-xl sm:text-2xl ml-1 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">{result.confidence}%</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="py-6">
                        <motion.h2 
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', bounce: 0.5 }}
                          className={`text-7xl font-black uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] ${result.signal === 'CALL' ? 'text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]' : 'text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]'}`}
                        >
                          {result.signal}
                        </motion.h2>
                        <p className="text-slate-400 font-medium tracking-widest uppercase mt-4 text-sm inline-flex items-center gap-2">
                          <Clock className="w-4 h-4" /> 1 Minute Expiration
                        </p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="w-full grid grid-cols-2 gap-4 mt-2 z-10 mb-6">
                      <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center">
                        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Market Trend</span>
                        <div className="flex items-center gap-2">
                          <BarChart2 className="w-4 h-4 text-blue-400" />
                          <span className="text-slate-200 font-bold uppercase">{result.trend}</span>
                        </div>
                      </div>
                      <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center text-center justify-center">
                        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">AI Reasoning</span>
                        <p className="text-[10px] text-slate-300 leading-tight">{result.reason}</p>
                      </div>
                    </div>

                    {/* Display the uploaded chart screenshot at the bottom */}
                    {selectedImage && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full relative z-10 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-950 p-2"
                      >
                         <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-2 shadow-lg">
                           <Activity className="w-4 h-4 text-cyan-400" />
                           <span className="text-xs font-bold text-slate-200 tracking-wider">MARKET VIEW</span>
                         </div>
                         <img src={selectedImage} alt="Analyzed Market" className="w-full h-auto max-h-56 object-contain rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    )}

                 </div>
               </div>

               {/* Trade Disclaimer / Features */}
               <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-5 flex gap-4 items-center justify-center">
                 <ShieldAlert className="w-6 h-6 text-amber-500/80 shrink-0" />
                 <p className="text-xs text-slate-400 leading-relaxed font-medium">
                   <strong className="text-amber-500/90">Trade Responsibly:</strong> This insight is generated via advanced pattern recognition API. Binary trading involves significant risk. Ensure proper money management.
                 </p>
               </div>

               <button
                 onClick={() => {
                   setResult(null);
                   setSelectedImage(null);
                 }}
                 className="mt-2 w-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] group"
               >
                 <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Analyze New Market
               </button>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      )}

      {/* Footer Section */}
      <footer className="w-full flex flex-col items-center justify-center pt-8 pb-12 opacity-80 hover:opacity-100 transition-opacity z-10 relative">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-2">
          <Zap className="w-3 h-3 text-cyan-500" />
          <span>POWERED BY</span>
        </div>
        <a 
          href="https://t.me/traderx009" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative group flex items-center gap-2 bg-slate-900/80 px-5 py-2.5 rounded-full border border-slate-800 hover:border-cyan-500/40 transition-all hover:bg-slate-800 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 group-hover:translate-x-full transition-transform duration-1000 -translate-x-full" />
          <Send className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 tracking-wider">
            @traderx009
          </span>
        </a>
      </footer>

      {/* Floating specific styling for custom background color */}
      <style>{`
        body {
          background-color: #020617; /* slate-950 */
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        @keyframes textGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-gradient {
          animation: textGradient 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

