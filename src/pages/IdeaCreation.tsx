import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, ChevronRight } from 'lucide-react';

function IdeaCreation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    problem: '',
    industry: '',
    target: ''
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-semibold">CoFound</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {['Idea Name', 'Problem', 'Industry', 'Target Market'].map((label, index) => (
                <div
                  key={label}
                  className={`text-sm ${index + 1 === step ? 'text-blue-500' : 'text-gray-400'}`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/10 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-white/5 rounded-lg p-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Name your idea</h2>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your idea name"
                  className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Define the problem</h2>
                <textarea
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="What problem are you trying to solve?"
                  className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Select industry</h2>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an industry</option>
                  <option value="tech">Technology</option>
                  <option value="health">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Define target market</h2>
                <textarea
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  placeholder="Who is your target audience?"
                  className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
              </div>
            )}

            {/* AI Suggestions */}
            <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h3 className="text-blue-400 font-semibold mb-2">AI Suggestion</h3>
              <p className="text-gray-300">
                {step === 1 && "Consider a name that's memorable and reflects your value proposition."}
                {step === 2 && "Be specific about the pain points your solution addresses."}
                {step === 3 && "Think about which industry regulations might affect your startup."}
                {step === 4 && "Define your target market in terms of demographics, behaviors, and needs."}
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
              >
                <span>{step === 4 ? 'Create Idea' : 'Next Step'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IdeaCreation