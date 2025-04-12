import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0B1E] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header/Logo */}
      <div className="fixed top-8 left-8 flex items-center gap-3 z-10">
        <div className="relative">
          <Rocket className="h-10 w-10 text-cyan-400" />
          <div className="absolute -bottom-1 w-10 h-10 bg-gradient-to-t from-purple-500 to-transparent filter blur-sm opacity-50"></div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text">
          LaunchMate
        </h1>
      </div>

      {/* Login button */}
      <button
        onClick={() => navigate('/auth')}
        className="fixed top-8 right-8 px-6 py-2 rounded-full bg-white bg-opacity-10 text-white hover:bg-opacity-20 transition-all z-10"
      >
        Login
      </button>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Animated Rocket */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <Rocket className="w-32 h-32 text-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400" />
          <div className="absolute bottom-0 w-32 h-32 bg-gradient-to-t from-orange-500 to-transparent filter blur-xl opacity-50 animate-pulse"></div>
        </div>

        {/* Main heading with gradient */}
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text mb-6">
          LaunchMate
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12">
          Launch smarter, grow faster.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/auth')}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative px-8 py-4 bg-[#0A0B1E] rounded-full leading-none">
            <span className="text-xl text-white group-hover:text-white transition duration-200">
              Start Your Journey
            </span>
          </div>
        </button>
      </div>

      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}