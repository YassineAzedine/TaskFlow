// app/layout.tsx
import './globals.css';

import HeaderWrapper from './components/HeaderWrapper';
import FooterWrapper from './components/FooterWrapper';

export const metadata = {
  title: 'TaskFlow - Gestionnaire de tâches pour freelances',
  description: 'Organisez vos projets et boostez votre productivité avec TaskFlow.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        {/* Header global uniquement si besoin */}
        <HeaderWrapper />
        {children}
      <FooterWrapper/>
      </body>
    </html>
  );
}
