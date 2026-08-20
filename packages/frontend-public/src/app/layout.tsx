import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Configuration de la police
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Association - Développement et Solidarité',
  description: 'Association pour le développement durable des communautés',
  keywords: 'association, développement, solidarité, Togo, Lomé, Aného, Atakpamé',
  authors: [{ name: 'Association' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#16a34a',
  openGraph: {
    title: 'Association - Développement et Solidarité',
    description: 'Association pour le développement durable des communautés',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          {/* HEADER - Responsive */}
          <Header />
          
          {/* MAIN - Contenu principal avec padding adaptatif */}
          <main className="flex-grow w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
              {children}
            </div>
          </main>
          
          {/* FOOTER - Responsive */}
          <Footer />
        </div>
      </body>
    </html>
  );
}