import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#111111] dark:bg-white rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white dark:text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-[#111111] dark:text-white">PinVault</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
              Fast, private and unlimited tools to download Pinterest content and YouTube thumbnails in full quality.
            </p>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold text-[#111111] dark:text-white uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 mb-8">
              <li><Link to="/privacy-policy" className="text-gray-500 dark:text-gray-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] text-sm transition-colors font-medium">Privacy Policy</Link></li>
              <li><a href="mailto:infinite@the8immortal.com" className="text-gray-500 dark:text-gray-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] text-sm transition-colors font-medium">Contact Us</a></li>
            </ul>
            <div className="flex items-center gap-4">
              <a href="https://in.pinterest.com/shiva197733/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E60023] hover:border-[#E60023]/30 hover:bg-[#E60023]/10 transition-all" aria-label="Pinterest">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.915 2.171-2.915 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.568-.994 3.995-.283 1.193.6 2.165 1.777 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.372 18.627 0 12 0z"/></svg>
              </a>
              <a href="https://x.com/sujal8645313773" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] dark:hover:text-white hover:border-[#1DA1F2]/30 dark:hover:border-white/30 hover:bg-[#1DA1F2]/10 dark:hover:bg-white/10 transition-all" aria-label="X (Twitter)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.reddit.com/user/shiva_the_prime/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FF4500] hover:border-[#FF4500]/30 hover:bg-[#FF4500]/10 transition-all" aria-label="Reddit">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 13.37C1.5 13.07 1 12.35 1 11.5c0-1.1.9-2 2-2 .64 0 1.22.32 1.6.82-1.1.85-1.92 1.9-2.3 3.05zm3.7.13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9.8 4.8c-1.08.63-2.42.96-3.8.96-1.4 0-2.74-.34-3.8-.95-.24-.13-.32-.44-.2-.68.15-.24.46-.32.7-.18 1.83 1.06 4.76 1.06 6.6 0 .23-.13.53-.05.67.2.14.23.06.54-.18.67zm.2-2.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.7-2.13c-.38-1.16-1.2-2.2-2.3-3.05.38-.5.96-.82 1.6-.82 1.1 0 2 .9 2 2 0 .84-.53 1.57-1.3 1.87z"/></svg>
              </a>
            </div>
          </div>


        </div>

        <div className="border-t border-gray-100 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          <p>
            &copy; {new Date().getFullYear()} PINVAULT STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
