'use client';

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { MatchesSection } from '@/components/matches-section';
import { BettingSlip } from '@/components/betting-slip';
import { useBetting } from '@/lib/betting-context';

export default function Home() {
  const { state } = useBetting();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="relative">
        <HeroSection />
        <MatchesSection />
      </main>

      {/* Mobile Betting Slip Overlay */}
      <div className="md:hidden">
        <BettingSlip />
      </div>

      {/* Desktop Betting Slip Sidebar */}
      <div className="hidden md:block">
        {state.isSlipOpen && (
          <div className="fixed right-4 top-24 w-80 z-40">
            <BettingSlip />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">SportsBet Pro</h3>
              <p className="text-gray-400 mb-4">
                Your trusted sports betting platform with competitive odds and secure transactions.
              </p>
              <div className="flex space-x-4">
                <div className="text-sm text-gray-400">
                  © 2025 SportsBet Pro. All rights reserved.
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Live Betting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Results</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Statistics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}