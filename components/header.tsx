'use client';

import { useBetting } from '@/lib/betting-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Menu, TrendingUp } from 'lucide-react';

export function Header() {
  const { state, dispatch } = useBetting();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              SportsBet Pro
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#sports" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Sports
            </a>
            <a href="#live" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Live Betting
            </a>
            <a href="#results" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Results
            </a>
          </nav>

          {/* Betting Slip Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: 'TOGGLE_SLIP' })}
              className="relative bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Bet Slip
              {state.selections.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {state.selections.length}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}