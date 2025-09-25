'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const t = localStorage.getItem('token');
    setToken(t);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 " >
      {/* Navigation */}
   

      {/* Hero Section */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden ">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero content */}
      <div className="relative text-center max-w-3xl mx-auto  ">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Organisez votre travail, simplifiez votre vie
        </h1>
        <p className="text-xl text-gray-700 mb-10">
          TaskFlow est loutil ultime de gestion de tâches pour les freelances et créatifs.
          Centralisez vos projets, suivez votre productivité et atteignez vos objectifs.
        </p>

        {!token && (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="/demo"
              className="border border-indigo-600 text-indigo-600 font-semibold px-8 py-4 rounded-lg hover:bg-indigo-50 transition-all duration-300"
            >
              Voir la démo
            </Link>
          </div>
        )}
      </div>

      {/* Hero Illustration */}
      <div className="relative mt-20 flex justify-center">
        <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-all duration-500">
          <div className="bg-gradient-to-r from-indigo-400 to-purple-400 h-64 w-80 md:w-full rounded-xl flex items-center justify-center">
            <div className="text-white text-center p-6">
              <div className="text-5xl md:text-6xl font-bold mb-4">📋</div>
              <h3 className="text-2xl md:text-3xl font-semibold">Interface TaskFlow</h3>
              <p className="mt-2 text-sm md:text-base">Visualisation moderne de vos projets</p>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Fonctionnalités conçues pour les créatifs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des outils puissants qui sadaptent à votre flux de travail, pas linverse
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">∞</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Projets illimités</h3>
            <p className="text-gray-600">Créez et gérez autant de projets que vous voulez, avec des tâches organisées et un suivi facile.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Tableau Kanban</h3>
            <p className="text-gray-600">Visualisez vos tâches et suivez leur progression grâce à un tableau Kanban intuitif et personnalisable.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">📤</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Export PDF/CSV</h3>
            <p className="text-gray-600">Exportez vos projets et tâches pour partager vos rapports ou garder des archives professionnelles.</p>
          </div>
        </div>
      </section>

     

      {/* Testimonials Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ils utilisent TaskFlow</h2>
          <p className="text-xl text-gray-600">Découvrez comment TaskFlow transforme leur travail au quotidien</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-bold">M</span>
              </div>
              <div>
                <h4 className="font-semibold">Marie L.</h4>
                <p className="text-gray-500">Designer Freelance</p>
              </div>
            </div>
            <p className="text-gray-600">TaskFlow a revolutionne ma gestion de projets. Je peux enfin visualiser lavancement de tous mes clients en un clin dœil.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 font-bold">T</span>
              </div>
              <div>
                <h4 className="font-semibold">Thomas D.</h4>
                <p className="text-gray-500">Développeur Web</p>
              </div>
            </div>
            <p className="text-gray-600">Lexport PDF est parfait pour envoyer des rapports à mes clients. Ça fait professionnel et ça me fait gagner un temps precieux.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-pink-600 font-bold">S</span>
              </div>
              <div>
                <h4 className="font-semibold">Sophie M.</h4>
                <p className="text-gray-500">Rédactrice Indépendante</p>
              </div>
            </div>
            <p className="text-gray-600">Le tableau Kanban maide à prioriser mes articles. Je nai plus jamais de trou de mémoire sur les deadlines !</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!token && (
        <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre productivité ?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Rejoignez des milliers de freelances qui utilisent TaskFlow pour organiser leur travail et développer leur activité.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                Créer un compte gratuit
              </Link>
              <Link
                href="/demo"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Essayer la démo
              </Link>
            </div>
            <p className="mt-6 text-indigo-200">Aucune carte de crédit requise • Essai gratuit de 14 jours</p>
          </div>
        </section>
      )}

      {/* Footer */}
    

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}