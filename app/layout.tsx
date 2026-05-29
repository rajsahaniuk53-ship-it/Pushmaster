import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Push Notification SaaS Platform & Suite',
  description: 'Self-hosted and cloud Push Notification SaaS featuring instant simulation, automated quiet hours optimization, subscriber segment management, API keys, and AI-powered copywriter.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-slate-50/50 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

