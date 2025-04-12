import React from 'react';

export function RocketIllustration({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      
      {/* Stars */}
      <circle cx="50" cy="50" r="2" fill="white" opacity="0.5" />
      <circle cx="350" cy="80" r="2" fill="white" opacity="0.7" />
      <circle cx="280" cy="320" r="2" fill="white" opacity="0.6" />
      <circle cx="120" cy="280" r="2" fill="white" opacity="0.5" />
      
      {/* Rocket Body */}
      <path
        d="M200 50C180 50 150 80 150 160C150 240 180 300 200 300C220 300 250 240 250 160C250 80 220 50 200 50Z"
        fill="url(#rocketGradient)"
      />
      
      {/* Rocket Window */}
      <circle cx="200" cy="160" r="20" fill="#1E293B" />
      <circle cx="200" cy="160" r="15" fill="#0EA5E9" opacity="0.5" />
      
      {/* Wings */}
      <path
        d="M150 160C130 180 120 220 130 260L150 240V160Z"
        fill="url(#rocketGradient)"
      />
      <path
        d="M250 160C270 180 280 220 270 260L250 240V160Z"
        fill="url(#rocketGradient)"
      />
      
      {/* Flame */}
      <path
        d="M180 300C180 340 200 360 200 360C200 360 220 340 220 300C220 280 200 280 200 280C200 280 180 280 180 300Z"
        fill="url(#flameGradient)"
      />
    </svg>
  );
}