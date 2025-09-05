'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBetting, Match } from '@/lib/betting-context';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const { state, dispatch } = useBetting();
  
  const isSelected = (selection: 'home' | 'away' | 'draw') => 
    state.selections.some(s => s.matchId === match.id && s.selection === selection);

  const handleBetSelection = (selection: 'home' | 'away' | 'draw', odds: number) => {
    if (isSelected(selection)) {
      dispatch({ type: 'REMOVE_SELECTION', payload: match.id });
    } else {
      dispatch({
        type: 'ADD_SELECTION',
        payload: {
          matchId: match.id,
          match,
          selection,
          odds,
        },
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-blue-300">
      {/* Match Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{match.league}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(match.startTime)}</span>
          <Clock className="w-4 h-4" />
          <span>{formatTime(match.startTime)}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{match.homeTeam}</h3>
          <p className="text-xs text-gray-500 mt-1">Home</p>
        </div>
        <div className="px-4 py-2 bg-gray-50 rounded-lg mx-4">
          <span className="text-lg font-bold text-gray-600">VS</span>
        </div>
        <div className="flex-1 text-center">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{match.awayTeam}</h3>
          <p className="text-xs text-gray-500 mt-1">Away</p>
        </div>
      </div>

      {/* Betting Options */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={isSelected('home') ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleBetSelection('home', match.homeOdds)}
          className={`flex flex-col h-auto py-3 ${
            isSelected('home') 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'hover:bg-blue-50 hover:border-blue-300'
          }`}
        >
          <span className="text-xs font-medium mb-1">Home</span>
          <span className="text-sm font-bold">{match.homeOdds.toFixed(2)}</span>
        </Button>
        
        {match.drawOdds && (
          <Button
            variant={isSelected('draw') ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleBetSelection('draw', match.drawOdds!)}
            className={`flex flex-col h-auto py-3 ${
              isSelected('draw') 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            <span className="text-xs font-medium mb-1">Draw</span>
            <span className="text-sm font-bold">{match.drawOdds.toFixed(2)}</span>
          </Button>
        )}
        
        <Button
          variant={isSelected('away') ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleBetSelection('away', match.awayOdds)}
          className={`flex flex-col h-auto py-3 ${
            isSelected('away') 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'hover:bg-blue-50 hover:border-blue-300'
          }`}
        >
          <span className="text-xs font-medium mb-1">Away</span>
          <span className="text-sm font-bold">{match.awayOdds.toFixed(2)}</span>
        </Button>
      </div>

      {/* Status Badge */}
      <div className="mt-3 flex justify-center">
        <Badge variant={match.status === 'live' ? 'destructive' : 'secondary'}>
          {match.status === 'live' ? 'LIVE' : 'Upcoming'}
        </Badge>
      </div>
    </Card>
  );
}