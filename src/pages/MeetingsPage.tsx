import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { MeetingCardSkeleton } from '@/components/ui/skeleton-loaders';
import { useMeetingStore, MeetingStatus } from '@/stores/meetingStore';
import { mockMeetings } from '@/data/mockData';
import { isPast, parseISO } from 'date-fns';

export default function MeetingsPage() {
  const { meetings, setMeetings, isLoading, setLoading } = useMeetingStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setMeetings(mockMeetings);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [setMeetings, setLoading]);

  const filterMeetings = () => {
    let filtered = meetings;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tab
    switch (activeTab) {
      case 'upcoming':
        filtered = filtered.filter(m => 
          !isPast(parseISO(m.scheduledAt)) && m.status !== 'cancelled'
        );
        break;
      case 'past':
        filtered = filtered.filter(m => 
          isPast(parseISO(m.scheduledAt)) || m.status === 'completed'
        );
        break;
      case 'cancelled':
        filtered = filtered.filter(m => m.status === 'cancelled');
        break;
    }

    return filtered;
  };

  const filteredMeetings = filterMeetings();

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Meetings</h1>
            <p className="text-muted-foreground">Manage and view all your meetings</p>
          </div>
          <Link to="/meetings/new">
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              New Meeting
            </Button>
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="glass-card">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <MeetingCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredMeetings.length > 0 ? (
              <StaggerContainer className="space-y-4">
                {filteredMeetings.map((meeting) => (
                  <StaggerItem key={meeting._id}>
                    <MeetingCard meeting={meeting} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-12 text-center"
              >
                <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No meetings found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Get started by scheduling your first meeting'}
                </p>
                {!searchQuery && (
                  <Link to="/meetings/new">
                    <Button variant="gradient">
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </Link>
                )}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
