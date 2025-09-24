'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const showHeader = !pathname?.startsWith('/dashboard'); // ne pas afficher sur /dashboard

  if (!showHeader) return null;
  return <Footer />;
}
