import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo } from '../components/Logo';

function AuthLayout() {
  // TODO: Add actual auth check
  const isAuthenticated = false;

  const testimonials = [
    {
      name: "Yashovardhan Saraswat",
      role: "Founder, TechVision",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100",
      quote: "CoFound helped me validate my idea and connect with the perfect co-founder. Now we're building something amazing together."
    },
    {
      name: "Adhyyan Kumar",
      role: "Founder, InnovateLabs",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
      quote: "The AI-powered insights and mentor connections through CoFound were instrumental in shaping our startup's success."
    },
    {
      name: "Ansh Mathur",
      role: "Founder, DataFlow",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
      quote: "CoFound's platform helped me turn my vision into a viable business model. The guidance was invaluable."
    },
    {
      name: "Mikhil Chohda",
      role: "Founder, CloudScale",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100",
      quote: "The structured approach and AI assistance from CoFound made my entrepreneurial journey much clearer and focused."
    }
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTestimonialIndex]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const currentTestimonial = testimonials[currentTestimonialIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: 'relative',
      width: '100%',
      top: 0,
      left: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0
    })
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex">
      {/* Gradient Orbs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 p-12 flex-col justify-between backdrop-blur-xl relative">
        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-[#0A0A0F] rounded-lg p-2">
                <Logo className="w-8 h-8" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
              LaunchMate
            </span>
          </div>
          <h1 className="mt-12 text-5xl font-bold leading-tight">
            Turn your vision into{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
              reality
            </span>
          </h1>
          <p className="mt-6 text-xl text-white/60">
            Join thousands of founders building the next generation of startups
          </p>
        </div>
        
        {/* Testimonial */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-2xl blur"></div>
          <div className="relative bg-white/5 rounded-2xl p-8 backdrop-blur-xl border border-white/10">
            <div className="relative h-[180px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentTestimonialIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <p className="text-xl italic text-white/80">
                    "{currentTestimonial.quote}"
                  </p>
                  <div className="mt-6 flex items-center space-x-4">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-cyan-500"
                    />
                    <div>
                      <p className="font-semibold">{currentTestimonial.name}</p>
                      <p className="text-sm text-white/60">{currentTestimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
              <button
                onClick={previousTestimonial}
                className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:text-white transition-colors pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:text-white transition-colors pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentTestimonialIndex ? 1 : -1);
                    setCurrentTestimonialIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonialIndex ? 'bg-cyan-500' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="w-full lg:w-1/2 p-8 lg:p-12 relative z-10">
        <div className="lg:hidden flex items-center space-x-3 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-[#0A0A0F] rounded-lg p-2">
              <Logo className="w-8 h-8" />
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
            LaunchMate
          </span>
        </div>
        
        <div className="max-w-md mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;