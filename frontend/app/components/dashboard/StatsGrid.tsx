// components/dashboard/StatsGrid.tsx
interface StatItem {
  name: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              stat.changeType === 'positive' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}