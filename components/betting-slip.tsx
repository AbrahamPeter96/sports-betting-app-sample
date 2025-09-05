'use client';

import { useBetting } from '@/lib/betting-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Trash2, Calculator } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function BettingSlip() {
  const { state, dispatch } = useBetting();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStakeChange = (matchId: string, value: string) => {
    const stake = parseFloat(value) || 0;
    dispatch({ type: 'UPDATE_STAKE', payload: { matchId, stake } });
  };

  const handleSubmitBet = async () => {
    if (state.selections.length === 0) {
      toast.error('Please add at least one selection to your bet slip');
      return;
    }

    if (state.totalStake === 0) {
      toast.error('Please enter stakes for your selections');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-bet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selections: state.selections,
          totalStake: state.totalStake,
          potentialPayout: state.potentialPayout,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit bet');
      }

      const result = await response.json();
      toast.success(`Bet submitted successfully! Bet ID: ${result.betId}`);
      dispatch({ type: 'CLEAR_SELECTIONS' });
    } catch (error) {
      toast.error('Failed to submit bet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!state.isSlipOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:relative md:bg-transparent md:backdrop-blur-none">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:relative md:shadow-lg md:rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white md:rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Bet Slip</h2>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {state.selections.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: 'TOGGLE_SLIP' })}
            className="text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
          {state.selections.length === 0 ? (
            <div className="text-center py-8">
              <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Your bet slip is empty</p>
              <p className="text-sm text-gray-400 mt-1">Click on odds to add selections</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.selections.map((selection) => (
                <Card key={`${selection.matchId}-${selection.selection}`} className="p-3 bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {selection.match.homeTeam} vs {selection.match.awayTeam}
                      </p>
                      <p className="text-xs text-gray-500">{selection.match.league}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dispatch({ type: 'REMOVE_SELECTION', payload: selection.matchId })}
                      className="text-gray-400 hover:text-red-500 p-1 h-auto"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {selection.selection === 'home' ? 'Home Win' : 
                       selection.selection === 'away' ? 'Away Win' : 'Draw'}
                    </Badge>
                    <span className="text-sm font-bold text-blue-600">
                      {selection.odds.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">Stake:</span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={selection.stake}
                      onChange={(e) => handleStakeChange(selection.matchId, e.target.value)}
                      className="h-8 text-sm"
                      placeholder="0.00"
                    />
                    <span className="text-xs text-gray-600">$</span>
                  </div>

                  <div className="mt-2 text-right">
                    <p className="text-xs text-gray-500">
                      Potential return: <span className="font-medium text-green-600">
                        ${(selection.stake * selection.odds).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.selections.length > 0 && (
          <div className="border-t bg-gray-50 p-4 md:rounded-b-lg">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Stake:</span>
                <span className="font-semibold">${state.totalStake.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Potential Payout:</span>
                <span className="text-lg font-bold text-green-600">
                  ${state.potentialPayout.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Potential Profit:</span>
                <span className="font-medium text-green-600">
                  ${(state.potentialPayout - state.totalStake).toFixed(2)}
                </span>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch({ type: 'CLEAR_SELECTIONS' })}
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
                <Button
                  onClick={handleSubmitBet}
                  disabled={isSubmitting || state.totalStake === 0}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  {isSubmitting ? 'Placing...' : 'Place Bet'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}