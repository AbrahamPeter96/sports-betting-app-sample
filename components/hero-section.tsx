'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Shield, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">
            <Zap className="w-3 h-3 mr-1" />
            Live Odds Updated Every Second
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Sports
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
              Betting Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the thrill of sports betting with real-time odds, instant calculations, 
            and secure bet placement across multiple leagues.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Betting Now
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
              View Live Matches
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <Shield className="w-6 h-6 text-green-400" />
              <span className="text-sm font-medium">Secure & Licensed</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-sm font-medium">Real-Time Odds</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <span className="text-sm font-medium">Live Calculations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}