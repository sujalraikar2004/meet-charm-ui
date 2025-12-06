import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, isToday, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Video, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTransition, FadeIn } from '@/components/animations/PageTransition';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { useMeetingStore } from '@/stores/meetingStore';
import { mockMeetings } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function CalendarPage() {
  const { meetings, setMeetings } = useMeetingStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (!meetings.length) {
      setMeetings(mockMeetings);
    }
  }, [meetings.length, setMeetings]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getMeetingsForDay = (date: Date) => {
    return meetings.filter(meeting => {
      const meetingDate = parseISO(meeting.scheduledAt);
      return isSameDay(meetingDate, date);
    });
  };

  const selectedDayMeetings = selectedDate ? getMeetingsForDay(selectedDate) : [];

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Calendar</h1>
              <p className="text-muted-foreground">View and manage your schedule</p>
            </div>
            <Link to="/meetings/new">
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                New Meeting
              </Button>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <Card className="glass-card overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {format(currentMonth, 'MMMM yyyy')}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-3 hidden md:block">
                      {day}
                    </div>
                  ))}
                  {weekDays.map(day => (
                    <div key={`mobile-${day}`} className="text-center text-xs font-medium text-muted-foreground py-2 md:hidden">
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, idx) => {
                    const dayMeetings = getMeetingsForDay(day);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isDayToday = isToday(day);

                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDate(day)}
                        className={cn(
                          'min-h-[80px] md:min-h-[100px] p-2 rounded-xl text-left transition-all duration-200 flex flex-col',
                          !isCurrentMonth && 'opacity-30',
                          isCurrentMonth && 'hover:bg-secondary/50',
                          isSelected && 'bg-primary/10 ring-2 ring-primary',
                          isDayToday && !isSelected && 'bg-accent/30'
                        )}
                      >
                        <span className={cn(
                          'text-sm font-medium mb-1',
                          isDayToday && 'text-primary font-bold'
                        )}>
                          {format(day, 'd')}
                        </span>
                        <div className="flex-1 space-y-1 overflow-hidden">
                          {dayMeetings.slice(0, 2).map((meeting) => (
                            <div
                              key={meeting._id}
                              className={cn(
                                'text-xs p-1 rounded truncate',
                                meeting.status === 'scheduled' && 'bg-primary/10 text-primary',
                                meeting.status === 'in-progress' && 'bg-success/10 text-success',
                                meeting.status === 'completed' && 'bg-muted text-muted-foreground',
                                meeting.status === 'cancelled' && 'bg-destructive/10 text-destructive'
                              )}
                            >
                              {meeting.title}
                            </div>
                          ))}
                          {dayMeetings.length > 2 && (
                            <div className="text-xs text-muted-foreground pl-1">
                              +{dayMeetings.length - 2} more
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Selected Day Details */}
          <FadeIn delay={0.2}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate ? format(selectedDate, 'EEEE, MMM d') : 'Select a day'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDayMeetings.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDayMeetings.map((meeting) => (
                      <Link key={meeting._id} to={`/meetings/${meeting._id}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-all"
                        >
                          <h4 className="font-medium mb-1">{meeting.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {format(parseISO(meeting.scheduledAt), 'h:mm a')}
                            </div>
                            <span>·</span>
                            <span>{meeting.duration}min</span>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Video className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm mb-4">No meetings scheduled</p>
                    <Link to="/meetings/new">
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
