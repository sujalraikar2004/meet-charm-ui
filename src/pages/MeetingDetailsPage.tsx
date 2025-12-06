import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO, isPast } from 'date-fns';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Video,
  Link2,
  Edit2,
  Trash2,
  Play,
  Square,
  Check,
  X,
  FileText,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTransition, FadeIn } from '@/components/animations/PageTransition';
import { UserAvatar, AvatarGroup } from '@/components/shared/UserAvatar';
import { useMeetingStore } from '@/stores/meetingStore';
import { useAuthStore } from '@/stores/authStore';
import { mockMeetings } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const statusStyles = {
  scheduled: 'bg-primary/10 text-primary border-primary/20',
  'in-progress': 'bg-success/10 text-success border-success/20',
  completed: 'bg-muted text-muted-foreground border-muted',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function MeetingDetailsPage() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { meetings, setMeetings, updateMeeting } = useMeetingStore();
  const [meeting, setMeeting] = useState(meetings.find(m => m._id === meetingId));

  useEffect(() => {
    if (!meetings.length) {
      setMeetings(mockMeetings);
    }
  }, [meetings.length, setMeetings]);

  useEffect(() => {
    const found = meetings.find(m => m._id === meetingId);
    if (found) setMeeting(found);
  }, [meetingId, meetings]);

  if (!meeting) {
    return (
      <PageTransition>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Meeting not found</h2>
          <p className="text-muted-foreground mb-4">The meeting you're looking for doesn't exist.</p>
          <Link to="/meetings">
            <Button variant="outline">Back to Meetings</Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const meetingDate = parseISO(meeting.scheduledAt);
  const isHost = meeting.host._id === user?._id;
  const isUpcoming = !isPast(meetingDate) && meeting.status === 'scheduled';
  const acceptedCount = meeting.participants.filter(p => p.response === 'accepted').length;

  const handleCopyLink = () => {
    if (meeting.meetingLink) {
      navigator.clipboard.writeText(meeting.meetingLink);
      toast.success('Meeting link copied!');
    }
  };

  const handleStartMeeting = () => {
    updateMeeting(meeting._id, { status: 'in-progress' });
    toast.success('Meeting started!');
  };

  const handleEndMeeting = () => {
    updateMeeting(meeting._id, { status: 'completed' });
    toast.success('Meeting ended');
  };

  const handleCancelMeeting = () => {
    updateMeeting(meeting._id, { status: 'cancelled' });
    toast.success('Meeting cancelled');
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{meeting.title}</h1>
              <p className="text-muted-foreground">Meeting Details</p>
            </div>
            <Badge className={cn('border', statusStyles[meeting.status])}>
              {meeting.status === 'in-progress' && (
                <span className="w-2 h-2 rounded-full bg-success animate-pulse mr-2" />
              )}
              {meeting.status.replace('-', ' ')}
            </Badge>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <Card className="glass-card">
                <CardContent className="p-6 space-y-6">
                  {meeting.description && (
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">{meeting.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{format(meetingDate, 'EEEE, MMM d, yyyy')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{format(meetingDate, 'h:mm a')} · {meeting.duration}min</p>
                      </div>
                    </div>
                  </div>

                  {meeting.meetingLink && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                      <Link2 className="w-5 h-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">Meeting Link</p>
                        <p className="font-medium truncate">{meeting.meetingLink}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>

            {/* Participants */}
            <FadeIn delay={0.2}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participants ({acceptedCount + 1} / {meeting.participants.length + 1})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Host */}
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <UserAvatar
                      src={meeting.host.avatar}
                      name={meeting.host.fullName}
                      size="md"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{meeting.host.fullName}</p>
                      <p className="text-sm text-muted-foreground">{meeting.host.email}</p>
                    </div>
                    <Badge variant="secondary">Host</Badge>
                  </div>

                  {/* Participants List */}
                  {meeting.participants.map((p) => (
                    <div
                      key={p.user._id}
                      className="flex items-center gap-4 p-3 rounded-xl border border-border/50"
                    >
                      <UserAvatar
                        src={p.user.avatar}
                        name={p.user.fullName}
                        size="md"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{p.user.fullName}</p>
                        <p className="text-sm text-muted-foreground">{p.user.email}</p>
                      </div>
                      <Badge
                        className={cn(
                          p.response === 'accepted' && 'bg-success/10 text-success border-success/20',
                          p.response === 'pending' && 'bg-warning/10 text-warning border-warning/20',
                          p.response === 'declined' && 'bg-destructive/10 text-destructive border-destructive/20'
                        )}
                      >
                        {p.response}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>

            {/* Transcription */}
            {meeting.transcription && (
              <FadeIn delay={0.3}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Transcription
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link to={`/meetings/${meeting._id}/transcription`}>
                      <Button variant="outline" className="w-full">
                        View Full Transcription
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </FadeIn>
            )}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-4">
            <FadeIn delay={0.2}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {meeting.status === 'scheduled' && isUpcoming && (
                    <Button variant="gradient" className="w-full" onClick={handleStartMeeting}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Meeting
                    </Button>
                  )}

                  {meeting.status === 'in-progress' && (
                    <Button variant="destructive" className="w-full" onClick={handleEndMeeting}>
                      <Square className="w-4 h-4 mr-2" />
                      End Meeting
                    </Button>
                  )}

                  {meeting.status === 'scheduled' && meeting.meetingLink && (
                    <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        <Video className="w-4 h-4 mr-2" />
                        Join Meeting
                      </Button>
                    </a>
                  )}

                  {isHost && meeting.status === 'scheduled' && (
                    <>
                      <Link to={`/meetings/${meeting._id}/edit`}>
                        <Button variant="outline" className="w-full">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Meeting
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full text-destructive hover:text-destructive"
                        onClick={handleCancelMeeting}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Cancel Meeting
                      </Button>
                    </>
                  )}

                  {!isHost && meeting.status === 'scheduled' && (
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 text-success hover:text-success">
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button variant="outline" className="flex-1 text-destructive hover:text-destructive">
                        <X className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
