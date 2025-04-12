import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, ChevronRight, Building2, Users, Briefcase, Target, MessageSquare, LinkedinIcon, FileCheck } from 'lucide-react';

function StartupCreation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profile: {
      name: '',
      role: '',
      experience: '',
    },
    industry: '',
    linkedin: '',
    startup: {
      name: '',
      stage: '',
      description: '',
    }
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
              {[
                { label: 'Complete Profile', icon: Users },
                { label: 'Select Industry', icon: Briefcase },
                { label: 'LinkedIn Integration', icon: LinkedinIcon },
                { label: 'Initial Assessment', icon: FileCheck }
              ].map(({ label, icon: Icon }, index) => (
                <div
                  key={label}
                  className={`text-sm flex flex-col items-center ${
                    index + 1 === step ? 'text-blue-500' : 'text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
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
                <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.profile.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        profile: { ...formData.profile, name: e.target.value }
                      })}
                      placeholder="Enter your full name"
                      className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Role
                    </label>
                    <input
                      type="text"
                      value={formData.profile.role}
                      onChange={(e) => setFormData({
                        ...formData,
                        profile: { ...formData.profile, role: e.target.value }
                      })}
                      placeholder="e.g., Software Engineer, Product Manager"
                      className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      value={formData.profile.experience}
                      onChange={(e) => setFormData({
                        ...formData,
                        profile: { ...formData.profile, experience: e.target.value }
                      })}
                      placeholder="Years of professional experience"
                      className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Select Your Industry</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Technology',
                    'Healthcare',
                    'Finance',
                    'Education',
                    'E-commerce',
                    'Manufacturing',
                    'Real Estate',
                    'Other'
                  ].map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setFormData({ ...formData, industry: ind })}
                      className={`p-4 rounded-lg border ${
                        formData.industry === ind
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">LinkedIn Integration</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    We'll use this to enhance your profile and suggest relevant connections.
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Initial Assessment</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Startup Name (if you have one)
                    </label>
                    <input
                      type="text"
                      value={formData.startup.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        startup: { ...formData.startup, name: e.target.value }
                      })}
                      placeholder="Your startup name (optional)"
                      className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Stage
                    </label>
                    <select
                      value={formData.startup.stage}
                      onChange={(e) => setFormData({
                        ...formData,
                        startup: { ...formData.startup, stage: e.target.value }
                      })}
                      className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select your stage</option>
                      <option value="idea">Just an Idea</option>
                      <option value="validation">Validation Stage</option>
                      <option value="mvp">Building MVP</option>
                      <option value="launched">Already Launched</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Brief Description
                    </label>
                    <textarea
                      value={formData.startup.description}
                      onChange={(e) => setFormData({
                        ...formData,
                        startup: { ...formData.startup, description: e.target.value }
                      })}
                      placeholder="What are you working on?"
                      className="w-full bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h3 className="text-blue-400 font-semibold mb-2">AI Suggestion</h3>
              <p className="text-gray-300">
                {step === 1 && "A complete profile helps us match you with the right co-founders and mentors."}
                {step === 2 && "Your industry selection will help us provide relevant resources and connections."}
                {step === 3 && "LinkedIn integration helps verify your experience and expand your network."}
                {step === 4 && "This assessment helps us customize your startup journey and development path."}
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
              >
                <span>{step === 4 ? 'Complete Setup' : 'Next Step'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StartupCreation;