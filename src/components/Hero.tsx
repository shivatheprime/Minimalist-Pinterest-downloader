import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, Download, Loader2, Image as ImageIcon, Video, FileImage, Copy, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { Button } from './Button';

export default function Hero() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    url: string;
    type: string;
    title: string;
    thumbnail: string;
    originalUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleProcessUrl = async (inputUrl: string) => {
    if (!inputUrl) return;
    
    // Basic validation
    const isPinterest = inputUrl.includes('pinterest.com') || inputUrl.includes('pin.it');
    const isYouTube = inputUrl.includes('youtube.com') || inputUrl.includes('youtu.be');
    if (!isPinterest && !isYouTube) {
      setError('Please enter a valid Pinterest or YouTube URL');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputUrl })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract media');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Basic auto-detect when pasting, wait a little to avoid firing immediately while typing manually
    const delayDebounceFn = setTimeout(() => {
      if (url.length > 15) {
        handleProcessUrl(url);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [url]);

  const handleDownload = () => {
    if (!result) return;
    
    // Use the backend proxy to trigger actual download bypass CORS
    window.location.href = `/api/download?url=${encodeURIComponent(result.url)}&type=${result.type}`;
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.originalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    if (!result) return null;
    if (result.type === 'video') return <Video className="w-4 h-4 text-[#D4AF37]" />;
    if (result.type === 'gif') return <FileImage className="w-4 h-4 text-[#D4AF37]" />;
    return <ImageIcon className="w-4 h-4 text-[#D4AF37]" />;
  };

  const getLabel = () => {
    if (!result) return null;
    if (result.title === 'YouTube Thumbnail') return 'YouTube Thumbnail';
    if (result.type === 'video') return 'Pinterest Video';
    if (result.type === 'gif') return 'Pinterest GIF';
    return 'Pinterest Image';
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C69C6D]/10 via-transparent to-transparent blur-3xl -z-10 pointer-events-none" />
      
      <div className="text-center w-full max-w-4xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-4 block">
              Luxury Media Extraction
            </span>
          </div>
          
          <h1 className="text-[48px] md:text-[72px] leading-[0.9] font-semibold tracking-tighter text-[#111111] dark:text-white mb-6">
            Elevate your <br className="hidden md:block" />
            <span className="text-[#D4AF37] italic font-serif">Inspiration</span>.
          </h1>
          
          <p className="text-gray-400 dark:text-gray-500 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Download Pinterest Images & Videos and YouTube Thumbnails — Free & in Full Quality.
          </p>
        </motion.div>

        {/* Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-3xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 dark:from-white/10 via-[#D4AF37]/20 to-gray-200 dark:to-white/10 rounded-[28px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative bg-white dark:bg-[#111111] rounded-[24px] shadow-xl shadow-gray-100 dark:shadow-none p-2 pr-3 flex flex-col md:flex-row items-center gap-2 border border-gray-200 dark:border-white/10">
            <div className="flex items-center flex-1 w-full pl-6 pr-4 py-3 md:py-2">
              <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Paste your Pinterest or YouTube URL here..."
                className="w-full bg-transparent border-none outline-none text-[#111111] dark:text-white placeholder-gray-300 dark:placeholder-gray-600 text-lg md:text-base font-medium py-2"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleProcessUrl(url);
                }}
              />
              {url && (
                <button 
                  onClick={() => { setUrl(''); setResult(null); setError(null); }}
                  className="text-gray-300 dark:text-gray-600 hover:text-[#111111] dark:hover:text-white p-1 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              )}
            </div>
            <Button 
              onClick={() => handleProcessUrl(url)}
              disabled={loading || !url}
              className="w-full md:w-auto h-14 bg-[#111111] dark:bg-white text-white dark:text-[#111111] px-8 rounded-[18px] font-semibold text-sm uppercase tracking-widest hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <span>Extract</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </span>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Feature Pills under search */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center space-x-6 mt-8"
        >
          <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
            <span>Supports Video</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
            <span>High-Res Images</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
            <span>GIF Animations</span>
          </div>
        </motion.div>

        {/* Results Area */}
        <div className="mt-6 w-full max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#111111] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-50 dark:border-white/5 flex flex-col items-center justify-center min-h-[250px]"
              >
                <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 border-4 border-gray-100 dark:border-white/10 rounded-full" />
                  <div className="absolute inset-0 border-4 border-[#D4AF37] rounded-full border-t-transparent animate-spin" />
                </div>
                <p className="text-[#111111] dark:text-white font-medium">Analyzing URL...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This usually takes a few seconds.</p>
              </motion.div>
            )}

            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-50/50 dark:bg-red-900/10 rounded-3xl p-8 border border-red-100 dark:border-red-900/20 flex flex-col items-center justify-center min-h-[250px] text-center"
              >
                <AlertCircle className="w-12 h-12 text-red-400 dark:text-red-500 mb-4" />
                <h3 className="text-red-800 dark:text-red-400 font-semibold text-lg mb-2">Oops! Something went wrong</h3>
                <p className="text-red-600/80 dark:text-red-300/80 mb-6">{error}</p>
                <Button 
                  variant="outline" 
                  onClick={() => handleProcessUrl(url)}
                  className="bg-white dark:bg-[#111111] dark:text-white dark:border-white/10 dark:hover:bg-white/5"
                >
                  Try Again
                </Button>
              </motion.div>
            )}

            {result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#111111] rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-white/10 flex flex-col md:flex-row items-center md:items-stretch gap-6"
              >
                <div className="w-full md:w-80 aspect-video bg-gray-50 dark:bg-[#1a1a1a] rounded-xl overflow-hidden flex-shrink-0 relative group flex items-center justify-center">
                   {result.thumbnail ? (
                     <img src={result.thumbnail} alt={result.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
                       <ImageIcon className="w-12 h-12" />
                     </div>
                   )}
                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center text-left py-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FAFAFA] dark:bg-white/5 border border-gray-100 dark:border-white/10">
                      {getIcon()}
                    </span>
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#111111] dark:text-white">{getLabel()} Detected</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold tracking-tight text-[#111111] dark:text-white mb-2 line-clamp-2">{result.title}</h3>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 truncate w-full max-w-[300px]">
                    {result.originalUrl}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Button 
                      onClick={handleDownload}
                      className="bg-[#111111] dark:bg-white hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-white dark:text-[#111111] dark:hover:text-white flex-1 h-12 rounded-[14px] text-sm font-semibold uppercase tracking-widest transition-all duration-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Extract {result.type === 'video' ? 'Video' : 'Image'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={copyToClipboard}
                      className="h-12 rounded-[14px] text-[#111111] dark:text-white border-gray-200 dark:border-white/10 hover:bg-[#FAFAFA] dark:hover:bg-white/5 text-sm font-semibold uppercase tracking-widest transition-colors"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
