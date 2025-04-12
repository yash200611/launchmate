import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, X, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const testimonials = [
  // ... unchanged testimonials
];

function AuthPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, user, loading, error } = useAuthStore();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  const handleShowForm = (signup: boolean) => {
    setIsSignUp(signup);
    setShowForm(true);
    setEmail('');
    setPassword('');
  };

  const nextTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const prevTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0A0B1E] flex relative overflow-hidden">
      {/* Left Section + testimonials unchanged */}

      {/* Right Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="lg:hidden flex items-center gap-4 mb-12">
          <Rocket className="h-10 w-10 text-cyan-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text">
            LaunchMate
          </h1>
        </div>

        {showForm ? (
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-xl text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-5 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-opacity-5 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="relative w-full group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative px-6 py-3 bg-[#0A0B1E] rounded-xl leading-none flex items-center justify-center">
                  <span className="text-gray-100 group-hover:text-white transition duration-200">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </span>
                </div>
              </button>

              <p className="text-center text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  {isSignUp ? 'Sign In' : 'Create one'}
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Your Journey
              </h2>
              <p className="text-gray-400">
                Join thousands of founders building the next generation of startups
              </p>
            </div>

            <button
              onClick={() => handleShowForm(false)}
              className="relative w-full group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative px-6 py-3 bg-[#0A0B1E] rounded-xl leading-none flex items-center justify-center">
                <span className="text-gray-100 group-hover:text-white transition duration-200">
                  Sign In
                </span>
              </div>
            </button>

            <button
              onClick={() => handleShowForm(true)}
              className="relative w-full group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-indigo-500 to-cyan-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative px-6 py-3 bg-[#0A0B1E] rounded-xl leading-none flex items-center justify-center">
                <span className="text-gray-100 group-hover:text-white transition duration-200">
                  Create Account
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
