import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore, getThemeClasses } from '../store/themeStore';
import {
  Search,
  ArrowLeft,
  Lightbulb,
  Target,
  Users,
  Code,
  DollarSign,
  AlertTriangle,
  Download,
  BookOpen
} from 'lucide-react';

interface IdeaTemplate {
  id: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  techStack: string[];
  challenges: string[];
}

const sampleIdeas: IdeaTemplate[] = [
  {
    id: '1',
    category: 'HealthTech',
    title: 'AI Health Monitor',
    problem: 'Difficulty in early detection of health issues',
    solution: 'AI-powered health monitoring system using wearable devices',
    targetMarket: 'Health-conscious individuals and elderly care',
    businessModel: 'Subscription-based service with hardware sales',
    techStack: ['React Native', 'TensorFlow', 'AWS', 'Node.js'],
    challenges: ['FDA approval', 'Data privacy', 'Hardware manufacturing']
  },
  {
    id: '2',
    category: 'EdTech',
    title: 'Personalized Learning Platform',
    problem: 'One-size-fits-all approach in education',
    solution: 'AI-driven personalized learning paths',
    targetMarket: 'K-12 students and schools',
    businessModel: 'B2B SaaS with school subscriptions',
    techStack: ['React', 'Python', 'PostgreSQL', 'Machine Learning'],
    challenges: ['Content creation', 'School adoption', 'Learning assessment']
  },
  {
    id: '3',
    category: 'FinTech',
    title: 'Smart Budget Tracker',
    problem: 'Complex personal finance management',
    solution: 'Automated expense tracking with AI insights',
    targetMarket: 'Young professionals and families',
    businessModel: 'Freemium with premium features',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'ML APIs'],
    challenges: ['Bank integration', 'Security', 'User adoption']
  }
];

const quickPrompts = [
  'Give me 3 low-cost startup ideas in EdTech',
  'Suggest a niche SaaS product for freelancers',
  'What problems exist in remote work today?',
  'Innovative solutions for sustainable living',
  'Tech ideas for local small businesses'
];

export default function HelpPage() {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const themeClasses = getThemeClasses(theme);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'healthtech', name: 'HealthTech', icon: Lightbulb, color: 'text-rose-500' },
    { id: 'edtech', name: 'EdTech', icon: BookOpen, color: 'text-blue-500' },
    { id: 'fintech', name: 'FinTech', icon: DollarSign, color: 'text-green-500' },
    { id: 'remote', name: 'Remote Work', icon: Users, color: 'text-purple-500' },
    { id: 'sustainability', name: 'Sustainability', icon: Target, color: 'text-emerald-500' },
    { id: 'dev-tools', name: 'Dev Tools', icon: Code, color: 'text-orange-500' }
  ];

  const filteredIdeas = useMemo(() => {
    return sampleIdeas.filter(idea => {
      const matchesSearch = 
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.solution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || idea.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className={`min-h-screen ${themeClasses.background}`}>
      {/* Header */}
      <header className={`${themeClasses.card} border-b ${themeClasses.border} p-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`${themeClasses.text} hover:opacity-80`}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className={`text-2xl font-semibold ${themeClasses.text}`}>
              Startup Idea Assistant
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${themeClasses.subtext}`} />
            <input
              type="text"
              placeholder="Search for startup ideas, problems, or solutions..."
              className={`w-full pl-12 pr-4 py-3 rounded-lg ${themeClasses.card} ${themeClasses.border} ${themeClasses.text} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold mb-6 ${themeClasses.text}`}>Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className={`p-6 rounded-lg ${themeClasses.card} ${themeClasses.border} 
                  ${selectedCategory === category.id ? 'ring-2 ring-indigo-500' : ''} 
                  hover:border-indigo-500 transition-all group`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-3 transform group-hover:scale-110 transition-transform ${category.color}`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <span className={`text-sm font-medium ${themeClasses.text} whitespace-nowrap`}>
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${themeClasses.text}`}>Quick Prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(prompt)}
                className={`p-4 rounded-lg ${themeClasses.card} ${themeClasses.border} hover:border-indigo-500 transition-all text-left`}
              >
                <span className={`text-sm ${themeClasses.text}`}>{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ideas Grid */}
        <div>
          <h2 className={`text-xl font-semibold mb-4 ${themeClasses.text}`}>
            {searchTerm ? 'Search Results' : 'Popular Ideas'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map(idea => (
              <div
                key={idea.id}
                className={`${themeClasses.card} ${themeClasses.border} rounded-lg p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`text-sm ${themeClasses.accent} font-medium`}>
                      {idea.category}
                    </span>
                    <h3 className={`text-lg font-semibold ${themeClasses.text} mt-1`}>
                      {idea.title}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-medium ${themeClasses.text}`}>Problem</h4>
                    <p className={`text-sm ${themeClasses.subtext}`}>{idea.problem}</p>
                  </div>
                  
                  <div>
                    <h4 className={`text-sm font-medium ${themeClasses.text}`}>Solution</h4>
                    <p className={`text-sm ${themeClasses.subtext}`}>{idea.solution}</p>
                  </div>

                  <div>
                    <h4 className={`text-sm font-medium ${themeClasses.text}`}>Tech Stack</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {idea.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className={`text-xs px-2 py-1 rounded-full ${themeClasses.button}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}