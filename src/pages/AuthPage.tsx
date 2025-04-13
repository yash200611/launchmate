import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, X, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const testimonials = [
  {
    name: "Yashovardhan Saraswat",
    role: "Founder & CEO, TechFlow",
    text: "LaunchMate transformed how I approach startup ideation. The platform's intuitive design and powerful features made the entire process seamless.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Mikhil Chohda",
    role: "CTO, InnovateLabs",
    text: "An incredible tool that helped me validate my business ideas quickly. The collaborative features are especially impressive.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Adhyyan Kumar",
    role: "Product Lead, StartupX",
    text: "The best platform I've used for startup planning. It streamlines the entire process from ideation to execution.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Ansh Mathur",
    role: "Founder, GrowthMate",
    text: "LaunchMate's comprehensive approach to startup development has been invaluable. It's become an essential part of my entrepreneurial toolkit.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
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
    if (user) navigate('/dashboard');
  }, [user]);

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
      {/* Left Section - Testimonials */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <Rocket className="h-12 w-12 text-cyan-400" />
                <div className="absolute -bottom-2 w-12 h-12 bg-gradient-to-t from-purple-500 to-transparent filter blur-sm opacity-50"></div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text">
                LaunchMate
              </h1>
            </div>
            <h2 className="text-5xl font-bold text-white leading-tight mb-6">
              Turn your vision<br />into reality
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Join thousands of founders who are building the next generation of successful startups with LaunchMate.
            </p>
          </div>

          <div className="bg-white bg-opacity-5 backdrop-blur-xl rounded-2xl p-8 relative">
            <Quote className="text-purple-400 h-8 w-8 mb-6 opacity-50" />

            <div className="relative h-48">
              <div className={`absolute w-full transition-all duration-500 ${isAnimating ? 'slide-out' : 'slide-in'}`}>
                <div className="flex items-start gap-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full ring-2 ring-cyan-400"
                  />
                  <div>
                    <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="text-white font-medium">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-purple-400 text-sm">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-purple-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-400" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Auth */}
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