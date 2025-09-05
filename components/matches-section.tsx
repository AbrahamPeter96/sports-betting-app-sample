'use client';

import { useState, useEffect } from 'react';
import { MatchCard } from './match-card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchMatches, transformMatchData } from '@/lib/sports-api';
import { Match } from '@/lib/betting-context';
import { Loader2, Trophy, Clock, Flame } from 'lucide-react';

export function MatchesSection() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const apiMatches = await fetchMatches();
        const transformedMatches = apiMatches.map(transformMatchData);
        setMatches(transformedMatches);
      } catch (error) {
        console.error('Failed to load matches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  const filteredMatches = matches.filter(match => {
    if (activeTab === 'all') return true;
    if (activeTab === 'live') return match.status === 'live';
    if (activeTab === 'upcoming') return match.status === 'upcoming';
    return match.league.toLowerCase().includes(activeTab);
  });

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg text-gray-600">Loading matches...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sports" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-600 text-white mb-4">
            <Trophy className="w-3 h-3 mr-1" />
            Live Sports
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Today's Matches
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Place your bets on today's top matches with competitive odds and real-time updates.
          </p>
        </div>

        {/* Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="all" className="flex items-center space-x-1">
              <Trophy className="w-3 h-3" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center space-x-1">
              <Flame className="w-3 h-3" />
              <span>Live</span>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="premier">Premier</TabsTrigger>
            <TabsTrigger value="la liga">La Liga</TabsTrigger>
            <TabsTrigger value="serie a">Serie A</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            {filteredMatches.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No matches found for this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}