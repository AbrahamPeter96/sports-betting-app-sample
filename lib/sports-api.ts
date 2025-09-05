export interface TheSportsDBEvent {
  idEvent: string;
  idAPIfootball: string;
  strEvent: string;
  strEventAlternate: string;
  strFilename: string;
  strSport: string;
  idLeague: string;
  strLeague: string;
  strLeagueBadge: string;
  strSeason: string;
  strDescriptionEN: string | null;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: number | null;
  intRound: string;
  intAwayScore: number | null;
  intSpectators: number | null;
  strOfficial: string;
  strTimestamp: string;
  dateEvent: string;
  dateEventLocal: string | null;
  strTime: string;
  strTimeLocal: string | null;
  strGroup: string | null;
  idHomeTeam: string;
  strHomeTeamBadge: string;
  idAwayTeam: string;
  strAwayTeamBadge: string;
  intScore: number | null;
  intScoreVotes: number | null;
  strResult: string | null;
  idVenue: string;
  strVenue: string;
  strCountry: string;
  strCity: string | null;
  strPoster: string;
  strSquare: string;
  strFanart: string | null;
  strThumb: string;
  strBanner: string;
  strMap: string | null;
  strTweet1: string | null;
  strTweet2: string | null;
  strTweet3: string | null;
  strVideo: string | null;
  strStatus: string;
  strPostponed: string;
  strLocked: string;
}

export interface TheSportsDBResponse {
  events: TheSportsDBEvent[];
}

// Generate realistic betting odds based on team names and league
const generateOddsForMatch = (homeTeam: string, awayTeam: string, league: string) => {
  // Create a simple hash from team names for consistent odds
  const homeHash = homeTeam.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const awayHash = awayTeam.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  // Use hash to generate consistent but varied odds
  const homeBase = 1.5 + (homeHash % 200) / 100; // 1.5 to 3.5
  const awayBase = 1.5 + (awayHash % 200) / 100; // 1.5 to 3.5
  const drawBase = 2.8 + ((homeHash + awayHash) % 150) / 100; // 2.8 to 4.3
  
  // Adjust odds based on league prestige
  const leagueMultiplier = league.includes('Premier') ? 0.9 : 
                          league.includes('Championship') ? 0.95 : 1.0;
  
  return {
    home: Math.round(homeBase * leagueMultiplier * 100) / 100,
    away: Math.round(awayBase * leagueMultiplier * 100) / 100,
    draw: Math.round(drawBase * 100) / 100,
  };
};

// Fallback data in case API is unavailable
const fallbackMatches: TheSportsDBEvent[] = [
  {
    idEvent: "2274707",
    idAPIfootball: "1387176",
    strEvent: "Manchester City vs Arsenal",
    strEventAlternate: "Arsenal @ Manchester City",
    strFilename: "Premier League 2025-01-15 Manchester City vs Arsenal",
    strSport: "Soccer",
    idLeague: "4328",
    strLeague: "Premier League",
    strLeagueBadge: "https://r2.thesportsdb.com/images/media/league/badge/i6o0kh1549879062.png",
    strSeason: "2024-2025",
    strDescriptionEN: "",
    strHomeTeam: "Manchester City",
    strAwayTeam: "Arsenal",
    intHomeScore: null,
    intRound: "21",
    intAwayScore: null,
    intSpectators: null,
    strOfficial: "",
    strTimestamp: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    dateEvent: new Date().toISOString().split('T')[0],
    dateEventLocal: new Date().toISOString().split('T')[0],
    strTime: "15:00:00",
    strTimeLocal: "15:00:00",
    strGroup: "",
    idHomeTeam: "133613",
    strHomeTeamBadge: "https://r2.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png",
    idAwayTeam: "133604",
    strAwayTeamBadge: "https://r2.thesportsdb.com/images/media/team/badge/xzqdr11517514812.png",
    intScore: null,
    intScoreVotes: null,
    strResult: "",
    idVenue: "28826",
    strVenue: "Etihad Stadium",
    strCountry: "England",
    strCity: "Manchester",
    strPoster: "",
    strSquare: "",
    strFanart: null,
    strThumb: "https://r2.thesportsdb.com/images/media/event/thumb/mjohgu1752494772.jpg",
    strBanner: "",
    strMap: null,
    strTweet1: "",
    strTweet2: "",
    strTweet3: "",
    strVideo: "",
    strStatus: "Not Started",
    strPostponed: "no",
    strLocked: "unlocked"
  },
  {
    idEvent: "2274708",
    idAPIfootball: "1387177",
    strEvent: "Liverpool vs Chelsea",
    strEventAlternate: "Chelsea @ Liverpool",
    strFilename: "Premier League 2025-01-15 Liverpool vs Chelsea",
    strSport: "Soccer",
    idLeague: "4328",
    strLeague: "Premier League",
    strLeagueBadge: "https://r2.thesportsdb.com/images/media/league/badge/i6o0kh1549879062.png",
    strSeason: "2024-2025",
    strDescriptionEN: "",
    strHomeTeam: "Liverpool",
    strAwayTeam: "Chelsea",
    intHomeScore: null,
    intRound: "21",
    intAwayScore: null,
    intSpectators: null,
    strOfficial: "",
    strTimestamp: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    dateEvent: new Date().toISOString().split('T')[0],
    dateEventLocal: new Date().toISOString().split('T')[0],
    strTime: "17:30:00",
    strTimeLocal: "17:30:00",
    strGroup: "",
    idHomeTeam: "133602",
    strHomeTeamBadge: "https://r2.thesportsdb.com/images/media/team/badge/8jw8lx1704366005.png",
    idAwayTeam: "133610",
    strAwayTeamBadge: "https://r2.thesportsdb.com/images/media/team/badge/yvwvtu1448813215.png",
    intScore: null,
    intScoreVotes: null,
    strResult: "",
    idVenue: "28827",
    strVenue: "Anfield",
    strCountry: "England",
    strCity: "Liverpool",
    strPoster: "",
    strSquare: "",
    strFanart: null,
    strThumb: "https://r2.thesportsdb.com/images/media/event/thumb/33hoj51752494851.jpg",
    strBanner: "",
    strMap: null,
    strTweet1: "",
    strTweet2: "",
    strTweet3: "",
    strVideo: "",
    strStatus: "Match Finished",
    strPostponed: "no",
    strLocked: "unlocked"
  }
];

export async function fetchMatches(): Promise<TheSportsDBEvent[]> {
  try {
    // Try to fetch from TheSportsDB API
    // Using Bolton Wanderers as an example team (ID: 133606)
    const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=133606', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TheSportsDBResponse = await response.json();
    
    if (data.events && data.events.length > 0) {
      return data.events;
    }

    // If API calls fail, return fallback data
    console.log('Using fallback data due to API unavailability');
    return fallbackMatches;

  } catch (error) {
    console.error('Error fetching matches from TheSportsDB:', error);
    // Return fallback data if API fails
    return fallbackMatches;
  }
}

export function transformMatchData(apiMatch: TheSportsDBEvent): import('./betting-context').Match {
  const odds = generateOddsForMatch(apiMatch.strHomeTeam, apiMatch.strAwayTeam, apiMatch.strLeague);
  
  // Determine match status
  let status: 'upcoming' | 'live' | 'finished' = 'upcoming';
  if (apiMatch.strStatus === 'Match Finished' || apiMatch.intHomeScore !== null) {
    status = 'finished';
  } else if (apiMatch.strStatus === 'In Play' || apiMatch.strStatus === 'Live') {
    status = 'live';
  }

  return {
    id: apiMatch.idEvent,
    homeTeam: apiMatch.strHomeTeam,
    awayTeam: apiMatch.strAwayTeam,
    homeOdds: odds.home,
    awayOdds: odds.away,
    drawOdds: odds.draw,
    sport: apiMatch.strSport,
    league: apiMatch.strLeague,
    startTime: apiMatch.strTimestamp,
    status: status,
  };
}