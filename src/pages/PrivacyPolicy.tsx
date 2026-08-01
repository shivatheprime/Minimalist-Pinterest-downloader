import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Pinvault';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the Privacy Policy for Pinvault to learn how we handle your information while you use our Pinterest Downloader and YouTube Thumbnail Downloader tools.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'Read the Privacy Policy for Pinvault to learn how we handle your information while you use our Pinterest Downloader and YouTube Thumbnail Downloader tools.';
      document.head.appendChild(newMeta);
    }

    window.scrollTo(0, 0);

    return () => {
      document.title = 'My Google AI Studio App';
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', '');
      }
    };
  }, []);

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center">
          Privacy Policy
        </h1>
        
        <div className="max-w-none space-y-4 text-gray-700 dark:text-gray-300">
          <p><strong>Effective Date:</strong> July 25, 2026</p>
          <p>Welcome to <strong>Pinvault</strong> ("we," "our," or "us"). This Privacy Policy explains how information is handled when you use our website located at <strong>https://the8immortal.com</strong>.</p>
          <p>By using Pinvault, you agree to this Privacy Policy.</p>
          
          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">1. About Pinvault</h2>
          <p>Pinvault provides free online tools including, but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pinterest Video Downloader</li>
            <li>Pinterest Image Downloader</li>
            <li>Pinterest GIF Downloader</li>
            <li>YouTube Thumbnail Downloader</li>
          </ul>
          <p>Our services are designed to help users download publicly available content for personal use.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">2. Information We Collect</h2>
          <p>We are committed to minimizing data collection.</p>
          
          <h3 className="text-xl font-semibold text-[#111111] dark:text-white mt-6 mb-3 tracking-tight">Information You Provide</h3>
          <p>When you contact us through email, we may receive:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your name (if provided)</li>
            <li>Your email address</li>
            <li>The contents of your message</li>
          </ul>
          <p>We only use this information to respond to your inquiry.</p>

          <h3 className="text-xl font-semibold text-[#111111] dark:text-white mt-6 mb-3 tracking-tight">Information Collected Automatically</h3>
          <p>Like most websites, our hosting provider and web servers may automatically collect limited technical information such as:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Date and time of access</li>
            <li>Pages visited</li>
          </ul>
          <p>This information is used for website security, maintenance, and troubleshooting.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">3. Downloaded Content</h2>
          <p>Pinvault does not permanently store:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pinterest URLs submitted by users</li>
            <li>YouTube URLs submitted by users</li>
            <li>Download history</li>
            <li>Downloaded videos</li>
            <li>Downloaded images</li>
            <li>Downloaded GIFs</li>
            <li>YouTube thumbnails</li>
          </ul>
          <p>Submitted URLs are processed only to provide the requested download.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">4. Cookies</h2>
          <p>Pinvault may use cookies to improve website functionality and user experience.</p>
          <p>If Google AdSense is enabled, Google and its partners may use cookies to display personalized or non-personalized advertisements based on your browsing activity.</p>
          <p>You can disable cookies through your browser settings at any time.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">5. Advertising</h2>
          <p>Pinvault may display advertisements through Google AdSense or other advertising partners.</p>
          <p>Advertising providers may use cookies or similar technologies to display relevant advertisements in accordance with their own privacy policies.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">6. Third-Party Services</h2>
          <p>Our website may use trusted third-party services, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Hostinger (Hosting)</li>
            <li>Google AdSense (Advertising, when enabled)</li>
          </ul>
          <p>Each third-party provider has its own privacy practices.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">7. Data Security</h2>
          <p>We implement reasonable technical and organizational measures to protect our website.</p>
          <p>However, no method of transmission over the Internet is completely secure. Therefore, we cannot guarantee absolute security.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">8. Copyright</h2>
          <p>Pinvault respects intellectual property rights.</p>
          <p>Users are responsible for ensuring they have permission to download and use any content obtained through our tools.</p>
          <p>If you believe copyrighted material has been used inappropriately, please contact us.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">9. Children's Privacy</h2>
          <p>Pinvault is not intended for children under the age of 13.</p>
          <p>We do not knowingly collect personal information from children.</p>
          <p>If you believe a child has provided personal information, please contact us so we can take appropriate action.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">10. External Links</h2>
          <p>Our website may contain links to third-party websites.</p>
          <p>We are not responsible for the privacy practices or content of external websites.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">11. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time.</p>
          <p>Any changes will be posted on this page with an updated Effective Date.</p>
          <p>We encourage users to review this page periodically.</p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">12. Contact Us</h2>
          <p>If you have any questions regarding this Privacy Policy or our website, please contact us:</p>
          <p><strong>Email:</strong> <a href="mailto:infinite@the8immortal.com" className="text-[#D4AF37] hover:text-[#C5A028] transition-colors">infinite@the8immortal.com</a></p>
          <p><strong>Website:</strong> <a href="https://the8immortal.com" className="text-[#D4AF37] hover:text-[#C5A028] transition-colors">https://the8immortal.com</a></p>

          <hr className="my-8 border-gray-200 dark:border-white/10" />

          <h2 className="text-2xl font-bold text-[#111111] dark:text-white mt-8 mb-4 tracking-tight">13. Consent</h2>
          <p>By using Pinvault, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
        </div>
      </motion.div>
    </main>
  );
}
