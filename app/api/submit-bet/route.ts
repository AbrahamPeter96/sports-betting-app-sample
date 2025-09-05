import { NextRequest, NextResponse } from 'next/server';
import { BetSelection } from '@/lib/betting-context';

interface BetSubmissionRequest {
  selections: BetSelection[];
  totalStake: number;
  potentialPayout: number;
}

interface BetSubmissionResponse {
  success: boolean;
  betId: string;
  message: string;
  totalStake: number;
  potentialPayout: number;
  selections: BetSelection[];
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BetSubmissionRequest = await request.json();
    
    // Validate request
    if (!body.selections || body.selections.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No selections provided',
          message: 'Please add at least one selection to your bet slip',
        },
        { status: 400 }
      );
    }

    if (body.totalStake <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid stake amount',
          message: 'Stake amount must be greater than zero',
        },
        { status: 400 }
      );
    }

    // Validate each selection
    for (const selection of body.selections) {
      if (!selection.matchId || !selection.match || !selection.selection || !selection.odds) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid selection data',
            message: 'One or more selections contain invalid data',
          },
          { status: 400 }
        );
      }
      
      if (selection.stake <= 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid stake',
            message: `Stake for ${selection.match.homeTeam} vs ${selection.match.awayTeam} must be greater than zero`,
          },
          { status: 400 }
        );
      }
    }

    const betId = `BET_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    await new Promise(resolve => setTimeout(resolve, 1000));

    const calculatedStake = body.selections.reduce((sum, sel) => sum + sel.stake, 0);
    const calculatedPayout = body.selections.reduce((sum, sel) => sum + (sel.stake * sel.odds), 0);

    const response: BetSubmissionResponse = {
      success: true,
      betId,
      message: 'Bet placed successfully',
      totalStake: calculatedStake,
      potentialPayout: calculatedPayout,
      selections: body.selections,
      timestamp: new Date().toISOString(),
    };

    // Log bet submission for debugging
    console.log('Bet submitted:', {
      betId,
      selectionsCount: body.selections.length,
      totalStake: calculatedStake,
      potentialPayout: calculatedPayout,
    });

    return NextResponse.json(response, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Bet submission error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Server error',
        message: 'An error occurred while processing your bet. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}