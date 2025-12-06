import { motion } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Clock, Users, Video, MoreVertical, Check, X } from 'lucide-react';
import { Meeting } from '@/stores/meetingStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface MeetingCardProps {
  meeting: Meeting;
  variant?: 'default' | 'compact';
}

const statusColors = {
  scheduled: 'bg-primary/10 text-primary border-primary/20',
  'in-progress': 'bg-success/10 text-success border-success/20',
  completed: 'bg-muted text-muted-foreground border-muted',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusLabels = {
  scheduled: 'Scheduled',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function MeetingCard({ meeting, variant = 'default' }: MeetingCardProps) {
  const meetingDate = new Date(meeting.scheduledAt);
  const isUpcoming = !isPast(meetingDate);
  
  const getDateLabel = () => {
    if (isToday(meetingDate)) return 'Today';
    if (isTomorrow(meetingDate)) return 'Tomorrow';
    return format(meetingDate, 'MMM d, yyyy');
  };

  const acceptedCount = meeting.participants.filter(p => p.response === 'accepted').length;

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="glass-card-hover rounded-xl p-4"
      >
        <Link to={`/meetings/${meeting._id}`} className="block">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-2 h-2 rounded-full',
              meeting.status === 'scheduled' && 'bg-primary',
              meeting.status === 'in-progress' && 'bg-success animate-pulse',
              meeting.status === 'completed' && 'bg-muted-foreground',
              meeting.status === 'cancelled' && 'bg-destructive'
            )} />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{meeting.title}</p>
              <p className="text-sm text-muted-foreground">
                {format(meetingDate, 'h:mm a')} · {meeting.duration}min
              </p>
            </div>
            <div className="flex -space-x-2">
              {meeting.participants.slice(0, 3).map((p) => (
                <img
                  key={p.user._id}
                  src={p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.fullName}`}
                  alt={p.user.fullName}
                  className="w-7 h-7 rounded-full ring-2 ring-card"
                />
              ))}
              {meeting.participants.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-medium ring-2 ring-card">
                  +{meeting.participants.length - 3}
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card-hover rounded-xl overflow-hidden"
    >
      <Link to={`/meetings/${meeting._id}`} className="block p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="font-semibold text-lg mb-1 truncate">{meeting.title}</h3>
            {meeting.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {meeting.description}
              </p>
            )}
          </div>
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium border',
            statusColors[meeting.status]
          )}>
            {statusLabels[meeting.status]}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{getDateLabel()}, {format(meetingDate, 'h:mm a')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Video className="w-4 h-4" />
            <span>{meeting.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{acceptedCount + 1} attending</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={meeting.host.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${meeting.host.fullName}`}
              alt={meeting.host.fullName}
              className="w-8 h-8 rounded-full ring-2 ring-primary/20"
            />
            <div className="flex -space-x-2">
              {meeting.participants.slice(0, 4).map((p) => (
                <img
                  key={p.user._id}
                  src={p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.fullName}`}
                  alt={p.user.fullName}
                  className={cn(
                    'w-8 h-8 rounded-full ring-2 ring-card',
                    p.response === 'declined' && 'opacity-50'
                  )}
                />
              ))}
            </div>
          </div>

          {isUpcoming && meeting.status === 'scheduled' && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-success">
                <Check className="w-4 h-4 mr-1" />
                Accept
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                <X className="w-4 h-4 mr-1" />
                Decline
              </Button>
            </div>
          )}

          {meeting.status === 'in-progress' && (
            <Button variant="gradient" size="sm">
              <Video className="w-4 h-4 mr-1" />
              Join Now
            </Button>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
