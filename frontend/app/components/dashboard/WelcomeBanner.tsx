// components/dashboard/WelcomeBanner.tsx
interface UserData {
  name: string;
  productivityScore: number;
}

interface WelcomeBannerProps {
  userData: UserData | null;
}

export default function WelcomeBanner({ userData }: WelcomeBannerProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Welcome back, {userData?.name?.split(' ')[0] || 'there'}! 👋</h2>
      <p className="opacity-90">Here whats happening with your projects today.</p>
      <div className="mt-4 flex items-center">
        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-sm">Productivity score: {userData?.productivityScore || 0}%</span>
          <div className="ml-2 w-16 h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full" 
              style={{ width: `${userData?.productivityScore || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}