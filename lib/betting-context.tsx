'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  awayOdds: number;
  drawOdds?: number;
  sport: string;
  league: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'finished';
}

export interface BetSelection {
  matchId: string;
  match: Match;
  selection: 'home' | 'away' | 'draw';
  odds: number;
  stake: number;
}

interface BettingState {
  selections: BetSelection[];
  isSlipOpen: boolean;
  totalStake: number;
  potentialPayout: number;
}

type BettingAction =
  | { type: 'ADD_SELECTION'; payload: Omit<BetSelection, 'stake'> }
  | { type: 'REMOVE_SELECTION'; payload: string }
  | { type: 'UPDATE_STAKE'; payload: { matchId: string; stake: number } }
  | { type: 'TOGGLE_SLIP' }
  | { type: 'CLEAR_SELECTIONS' };

const initialState: BettingState = {
  selections: [],
  isSlipOpen: false,
  totalStake: 0,
  potentialPayout: 0,
};

function bettingReducer(state: BettingState, action: BettingAction): BettingState {
  switch (action.type) {
    case 'ADD_SELECTION': {
      const existingIndex = state.selections.findIndex(s => s.matchId === action.payload.matchId);
      const newSelections = existingIndex >= 0
        ? state.selections.map((sel, index) => 
            index === existingIndex ? { ...action.payload, stake: sel.stake } : sel
          )
        : [...state.selections, { ...action.payload, stake: 10 }];
      
      return {
        ...state,
        selections: newSelections,
        isSlipOpen: true,
        ...calculateTotals(newSelections),
      };
    }
    case 'REMOVE_SELECTION': {
      const newSelections = state.selections.filter(s => s.matchId !== action.payload);
      return {
        ...state,
        selections: newSelections,
        ...calculateTotals(newSelections),
      };
    }
    case 'UPDATE_STAKE': {
      const newSelections = state.selections.map(sel =>
        sel.matchId === action.payload.matchId
          ? { ...sel, stake: action.payload.stake }
          : sel
      );
      return {
        ...state,
        selections: newSelections,
        ...calculateTotals(newSelections),
      };
    }
    case 'TOGGLE_SLIP':
      return { ...state, isSlipOpen: !state.isSlipOpen };
    case 'CLEAR_SELECTIONS':
      return { ...state, selections: [], totalStake: 0, potentialPayout: 0 };
    default:
      return state;
  }
}

function calculateTotals(selections: BetSelection[]) {
  const totalStake = selections.reduce((sum, sel) => sum + sel.stake, 0);
  const potentialPayout = selections.reduce((sum, sel) => sum + (sel.stake * sel.odds), 0);
  return { totalStake, potentialPayout };
}

const BettingContext = createContext<{
  state: BettingState;
  dispatch: React.Dispatch<BettingAction>;
} | null>(null);

export function BettingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bettingReducer, initialState);

  return (
    <BettingContext.Provider value={{ state, dispatch }}>
      {children}
    </BettingContext.Provider>
  );
}

export function useBetting() {
  const context = useContext(BettingContext);
  if (!context) {
    throw new Error('useBetting must be used within a BettingProvider');
  }
  return context;
}