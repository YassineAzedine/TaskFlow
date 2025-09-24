// components/dashboard/ActivityFeed.tsx
interface Activity {
  id: number;
  user: string;
  action: string;
  item: string;
  project: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  showViewAll?: boolean;
}

export default function ActivityFeed({ activities, showViewAll = true }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        {showViewAll && (
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            See all
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action} {activity.item} in <span className="font-medium">{activity.project}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}