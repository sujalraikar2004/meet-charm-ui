import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Video, Clock, Users, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { CalendarWidget } from '@/components/meetings/CalendarWidget';
import { useMeetingStore } from '@/stores/meetingStore';
import { isPast, parseISO } from 'date-fns';

export default function DashboardPage() {
  const { meetings } = useMeetingStore();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const upcomingMeetings = meetings
    .filter(m => !isPast(parseISO(m.scheduledAt)) && m.status !== 'cancelled')
    .slice(0, 5);

  const pastMeetings = meetings
    .filter(m => isPast(parseISO(m.scheduledAt)) || m.status === 'completed')
    .slice(0, 3);

  const stats = [
    {
      icon: Video,
      label: 'Total Meetings',
      value: meetings.length.toString(),
      change: '+12%',
      positive: true,
    },
    {
      icon: CalendarDays,
      label: 'Upcoming',
      value: upcomingMeetings.length.toString(),
      change: '2 today',
      positive: true,
    },
    {
      icon: Clock,
      label: 'Hours Scheduled',
      value: (meetings.reduce((acc, m) => acc + m.duration, 0) / 60).toFixed(1),
      change: '+5h this week',
      positive: true,
    },
    {
      icon: Users,
      label: 'Participants',
      value: meetings.reduce((acc, m) => acc + m.participants.length + 1, 0).toString(),
      change: '+8 new',
      positive: true,
    },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StaggerItem key={idx}>
              <Card className="glass-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-success font-medium bg-success/10 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Meetings */}
          <div className="lg:col-span-2 space-y-4">
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
                <Link to="/meetings">
                  <Button variant="ghost" size="sm">View all</Button>
                </Link>
              </div>
            </FadeIn>

            {upcomingMeetings.length > 0 ? (
              <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                {upcomingMeetings.map((meeting) => (
                  <StaggerItem key={meeting._id}>
                    <MeetingCard meeting={meeting} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <Card className="glass-card p-12 text-center">
                <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No upcoming meetings</p>
                <Link to="/meetings/new">
                  <Button variant="gradient" className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </Link>
              </Card>
            )}

            {/* Past Meetings */}
            <FadeIn delay={0.3}>
              <h2 className="text-xl font-semibold mt-8 mb-4">Recent Meetings</h2>
              {pastMeetings.length > 0 ? (
                <div className="space-y-3">
                  {pastMeetings.map((meeting) => (
                    <MeetingCard key={meeting._id} meeting={meeting} variant="compact" />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No past meetings yet</p>
              )}
            </FadeIn>
          </div>

          {/* Calendar Sidebar */}
          <div className="space-y-4">
            <FadeIn delay={0.3}>
              <CalendarWidget
                meetings={meetings}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </FadeIn>

            {/* Quick Actions */}
            <FadeIn delay={0.4}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/meetings/new" className="block">
                    <Button variant="gradient" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      New Meeting
                    </Button>
                  </Link>
                  <Link to="/calendar" className="block">
                    <Button variant="outline" className="w-full">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Open Calendar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="floating-button lg:hidden"
        >
          <Link to="/meetings/new">
            <Button variant="gradient" size="icon" className="w-14 h-14 rounded-full shadow-glow">
              <Plus className="w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}
