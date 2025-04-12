import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  BarChart,
  Users,
  Target,
  MessageSquare,
  Settings,
  ArrowLeft,
  ChevronRight,
  PieChart,
  TrendingUp,
  Bell
} from 'lucide-react';

function StartupWorkspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart },
    { id: 'connections', label: 'Connections', icon: Users },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'market', label: 'Market Analysis', icon: PieChart },
    { id: 'updates', label: 'Updates', icon: Bell },
    { id: 'pitch', label: 'Pitch Deck', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-4 flex flex-col">
        <div className="flex items-center space-x-2 mb-8">
          <Star className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-semibold">CoFound</span>
        </div>

        <nav className="flex-1">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === tab.id ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white/5 text-gray-400"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">EcoTravel App</h1>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
                Share
              </button>
              <button className="p-2 rounded-lg hover:bg-white/5">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="bg-white/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Current Progress</h2>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-2/3"></div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {['Ideation', 'Validation', 'MVP', 'Launch'].map((stage, index) => (
                    <div key={stage} className="text-center">
                      <div className={`text-sm ${index <= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
                        {stage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-gray-400 mb-2">Market Size</h3>
                  <div className="text-2xl font-bold">$4.2B</div>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-gray-400 mb-2">Competitors</h3>
                  <div className="text-2xl font-bold">12</div>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-gray-400 mb-2">Target Users</h3>
                  <div className="text-2xl font-bold">2.5M</div>
                </div>
              </div>

              {/* AI Assistant */}
              <div className="bg-white/5 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI Recommendation</h3>
                    <p className="text-gray-400">
                      Based on current market trends, consider focusing on eco-conscious millennials
                      as your primary target audience. Their spending power and environmental awareness
                      align well with your value proposition.
                    </p>
                    <button className="mt-4 text-blue-500 flex items-center space-x-2">
                      <span>View detailed analysis</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab !== 'overview' && (
            <div className="flex items-center justify-center h-96 text-gray-400">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content would go here
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default StartupWorkspace