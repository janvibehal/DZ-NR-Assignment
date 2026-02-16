"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const creators = [
    { 
      name: "Sarah Chen", 
      role: "AI Researcher",
      color: "from-orange-400 to-orange-600",
      message: "Building the future of AI",
      icon: "🤖"
    },
    { 
      name: "Marcus Dev", 
      role: "Full Stack Developer",
      color: "from-blue-400 to-blue-600",
      message: "Creating amazing web experiences",
      icon: "💻"
    },
    { 
      name: "Emily Watson", 
      role: "Product Designer",
      color: "from-purple-400 to-purple-600",
      message: "Designing beautiful interfaces",
      icon: "🎨"
    },
    { 
      name: "David Kim", 
      role: "Entrepreneur",
      color: "from-green-400 to-green-600",
      message: "Scaling innovative startups",
      icon: "🚀"
    },
  ];

  // Triple the array for seamless infinite loop
  const repeatedCreators = [...creators, ...creators, ...creators];

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-select and scroll through items
    const interval = setInterval(() => {
      setSelectedIndex((prev) => {
        const next = prev + 1;
        // Reset to middle section when reaching end
        if (next >= creators.length * 2) {
          return creators.length;
        }
        return next;
      });
    }, 2500); // Change selection every 2.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black border-b border-neutral-800">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-600/10 blur-3xl animate-pulse" />
      
      {/* Moving Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge with slide in */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-sm transition-all duration-700 ${
                isLoaded ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
              }`}
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm text-orange-300 font-medium">Discover Top Talent</span>
            </div>
            
            {/* Title with stagger animation */}
            <h1 
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-700 delay-100 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Find Popular
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
                Creators
              </span>
            </h1>
            
            {/* Description with fade in */}
            <p 
              className={`text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Connect with innovative creators, thought leaders, and industry experts. 
              Discover inspiring content and collaborate on groundbreaking projects.
            </p>
            
            {/* Stats with scale animation */}
            <div 
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 delay-300 ${
                isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-black transition-transform duration-300 hover:scale-110 hover:z-10"
                    />
                  ))}
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <p className="text-white font-semibold">10K+ Creators</p>
                  <p className="text-sm text-neutral-500">Join the community</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Illustration - Infinite Loop */}
          <div 
            className={`relative lg:block hidden transition-all duration-1000 delay-400 ${
              isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
          >
            {/* Animated glow that changes color */}
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl transition-all duration-1000"
              style={{
                background: `radial-gradient(circle, ${
                  selectedIndex % 4 === 0 ? 'rgba(251, 146, 60, 0.2)' :
                  selectedIndex % 4 === 1 ? 'rgba(96, 165, 250, 0.2)' :
                  selectedIndex % 4 === 2 ? 'rgba(192, 132, 252, 0.2)' :
                  'rgba(74, 222, 128, 0.2)'
                }, transparent)`
              }}
            />
            
            {/* Glass card */}
            <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden h-80">
              
              {/* Gradient overlay top */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />
              
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />
              
              <div 
                className="space-y-3 transition-transform duration-700 ease-out"
                style={{
                  transform: `translateY(-${(selectedIndex - 1) * 90}px)`
                }}
              >
                {repeatedCreators.map((creator, index) => {
                  const actualIndex = index % creators.length;
                  const isSelected = index === selectedIndex;
                  const distanceFromSelected = Math.abs(index - selectedIndex);
                  
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-700 ${
                        isSelected 
                          ? 'bg-white/10 backdrop-blur-md border-white/20 scale-105 shadow-2xl shadow-orange-500/20' 
                          : distanceFromSelected === 1
                          ? 'bg-white/5 border-white/10 opacity-70'
                          : 'bg-white/[0.02] border-white/5 opacity-40 scale-95'
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div 
                          className={`rounded-2xl bg-gradient-to-br ${creator.color} flex items-center justify-center transition-all duration-700 ${
                            isSelected ? 'w-16 h-16 shadow-xl' : 'w-12 h-12'
                          }`}
                        >
                          <span className={`transition-all duration-700 ${isSelected ? 'text-2xl' : 'text-xl'}`}>
                            {creator.icon}
                          </span>
                        </div>
                        
                        {/* Animated ring on selected */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-ping" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div 
                          className={`font-bold transition-all duration-700 truncate ${
                            isSelected ? 'text-white text-lg' : 'text-neutral-400 text-sm'
                          }`}
                        >
                          {creator.name}
                        </div>
                        <div 
                          className={`font-medium transition-all duration-700 truncate ${
                            isSelected ? 'text-orange-400 text-sm' : 'text-neutral-600 text-xs'
                          }`}
                        >
                          {creator.role}
                        </div>
                        
                        {/* Message - only show on selected */}
                        <div 
                          className={`text-xs text-neutral-300 mt-1.5 transition-all duration-500 overflow-hidden ${
                            isSelected 
                              ? 'max-h-20 opacity-100' 
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          {creator.message}
                        </div>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="flex-shrink-0 flex flex-col gap-1">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-1.5 mt-4">
              {creators.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === (selectedIndex % creators.length)
                      ? 'w-8 bg-gradient-to-r from-orange-400 to-orange-600' 
                      : 'w-1 bg-neutral-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.1); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  );
}