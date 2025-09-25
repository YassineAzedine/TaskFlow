// app/dashboard/calendar/page.tsx
'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/components/dashboard/Layout';

// Mock events data
const mockEvents = [
  { id: 1, title: 'Team Meeting', date: '2023-06-15', time: '10:00', duration: 60, type: 'meeting', project: 'Website Redesign' },
  { id: 2, title: 'Design Review', date: '2023-06-16', time: '14:00', duration: 90, type: 'review', project: 'Website Redesign' },
  { id: 3, title: 'Client Call', date: '2023-06-18', time: '11:30', duration: 45, type: 'call', project: 'Mobile App' },
  { id: 4, title: 'Sprint Planning', date: '2023-06-20', time: '09:00', duration: 120, type: 'planning', project: 'Mobile App' },
  { id: 5, title: 'Deployment', date: '2023-06-22', time: '15:00', duration: 180, type: 'deployment', project: 'Client Portal' },
  { id: 6, title: 'Product Demo', date: '2023-06-25', time: '13:00', duration: 60, type: 'demo', project: 'Marketing Campaign' },
];

// Mock tasks with due dates
const mockTasks = [
  { id: 1, title: 'Review homepage design', dueDate: '2023-06-15', project: 'Website Redesign', priority: 'high' },
  { id: 2, title: 'Implement responsive layout', dueDate: '2023-06-17', project: 'Website Redesign', priority: 'medium' },
  { id: 3, title: 'Finalize ad copy', dueDate: '2023-06-19', project: 'Marketing Campaign', priority: 'low' },
  { id: 4, title: 'Test payment integration', dueDate: '2023-06-22', project: 'Client Portal', priority: 'high' },
];

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  project: string;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
  project: string;
  priority: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  console.log(setTasks)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '09:00',
    duration: 60,
    type: 'meeting',
    project: ''
  });

  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    plan: 'Pro',
    projects: 12,
    completedTasks: 84,
    productivityScore: 87
  };

  // Get current month and year
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Get first day of month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Generate calendar days
  const calendarDays = [];
  const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Add days from previous month
  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
  
  for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
    calendarDays.push({
      date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i),
      isCurrentMonth: false,
      events: [],
      tasks: []
    });
  }

  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dateString = date.toISOString().split('T')[0];
    
    calendarDays.push({
      date,
      isCurrentMonth: true,
      events: events.filter(event => event.date === dateString),
      tasks: tasks.filter(task => task.dueDate === dateString)
    });
  }

  // Add days from next month to complete the grid
  const totalCells = 42; // 6 weeks * 7 days
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  let nextMonthDay = 1;

  while (calendarDays.length < totalCells) {
    calendarDays.push({
      date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonthDay),
      isCurrentMonth: false,
      events: [],
      tasks: []
    });
    nextMonthDay++;
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Event handling
  const handleDateClick = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    setNewEvent(prev => ({ ...prev, date: dateString }));
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        id: events.length + 1,
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        duration: newEvent.duration,
        type: newEvent.type,
        project: newEvent.project
      };
      setEvents([...events, event]);
      setShowEventModal(false);
      setNewEvent({
        title: '',
        date: '',
        time: '09:00',
        duration: 60,
        type: 'meeting',
        project: ''
      });
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'deployment': return 'bg-red-100 text-red-800';
      case 'demo': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userData={userData}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendar</h1>
        <p className="text-gray-600">Manage your schedule and deadlines</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentMonth} {currentYear}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Today
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <button
            onClick={() => {
              setSelectedDate(null);
              setShowEventModal(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Event
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-32 p-2 border border-gray-200 rounded-lg ${
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
              } ${
                day.date.toDateString() === new Date().toDateString() ? 'ring-2 ring-indigo-500 ring-inset' : ''
              }`}
              onClick={() => handleDateClick(day.date)}
            >
              <div className="text-right mb-2">
                <span className={`inline-block w-6 h-6 text-center text-sm rounded-full ${
                  day.date.toDateString() === new Date().toDateString() 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-900'
                }`}>
                  {day.date.getDate()}
                </span>
              </div>
              
              <div className="space-y-1">
                {day.events.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate ${getEventColor(event.type)}`}
                    title={event.title}
                  >
                    {event.time} {event.title}
                  </div>
                ))}
                
                {day.tasks.slice(0, 2).map(task => (
                  <div
                    key={task.id}
                    className={`text-xs p-1 rounded truncate ${getPriorityColor(task.priority)}`}
                    title={task.title}
                  >
                    📋 {task.title}
                  </div>
                ))}
                
                {(day.events.length > 2 || day.tasks.length > 2) && (
                  <div className="text-xs text-gray-500 text-center">
                    +{day.events.length + day.tasks.length - 2} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Events</h3>
        
        <div className="space-y-4">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map(event => (
              <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 ${getEventColor(event.type).split(' ')[0]} rounded-full mr-3`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString()} at {event.time} • {event.project}
                  </p>
                </div>
                <div className="ml-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          
          {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No upcoming events
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedDate ? `Add Event on ${selectedDate}` : 'Add New Event'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: parseInt(e.target.value) || 60})}
                    min="15"
                    step="15"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                >
                  <option value="meeting">Meeting</option>
                  <option value="call">Call</option>
                  <option value="review">Review</option>
                  <option value="planning">Planning</option>
                  <option value="demo">Demo</option>
                  <option value="deployment">Deployment</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={newEvent.project}
                  onChange={(e) => setNewEvent({...newEvent, project: e.target.value})}
                  placeholder="Enter project name"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                disabled={!newEvent.title || !newEvent.date}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}   