import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Download, Share2, Clock, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTransition, FadeIn } from '@/components/animations/PageTransition';
import { AvatarGroup } from '@/components/shared/UserAvatar';
import { useMeetingStore } from '@/stores/meetingStore';
import { mockMeetings } from '@/data/mockData';
import { toast } from 'sonner';

export default function TranscriptionPage() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { meetings, setMeetings } = useMeetingStore();
  const meeting = meetings.find(m => m._id === meetingId);

  useEffect(() => {
    if (!meetings.length) {
      setMeetings(mockMeetings);
    }
  }, [meetings.length, setMeetings]);

  if (!meeting || !meeting.transcription) {
    return (
      <PageTransition>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Transcription not available</h2>
          <p className="text-muted-foreground mb-4">This meeting doesn't have a transcription yet.</p>
          <Link to="/meetings">
            <Button variant="outline">Back to Meetings</Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const meetingDate = parseISO(meeting.scheduledAt);

  const handleDownload = () => {
    const blob = new Blob([meeting.transcription!], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${meeting.title}-transcription.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Transcription downloaded');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(meeting.transcription!);
    toast.success('Transcription copied to clipboard');
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
              <p className="text-muted-foreground">Meeting Transcription</p>
            </div>
          </div>
        </FadeIn>

        {/* Meeting Info */}
        <FadeIn delay={0.1}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(meetingDate, 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {format(meetingDate, 'h:mm a')} · {meeting.duration} min
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <AvatarGroup
                    users={[
                      { name: meeting.host.fullName, avatar: meeting.host.avatar },
                      ...meeting.participants.map(p => ({
                        name: p.user.fullName,
                        avatar: p.user.avatar,
                      })),
                    ]}
                    max={5}
                    size="sm"
                  />
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Transcription Content */}
        <FadeIn delay={0.2}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Full Transcription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {meeting.transcription.split('\n').map((line, idx) => {
                  if (line.startsWith('##')) {
                    return (
                      <h2 key={idx} className="text-lg font-semibold mt-4 mb-2">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return null; // Handle in next line
                  }
                  if (line.includes(':**')) {
                    const [speaker, text] = line.split(':** ');
                    return (
                      <div key={idx} className="mb-4">
                        <span className="font-semibold text-primary">
                          {speaker.replace('**', '')}:
                        </span>
                        <span className="ml-2 text-foreground">{text}</span>
                      </div>
                    );
                  }
                  if (line.trim()) {
                    return <p key={idx} className="text-muted-foreground">{line}</p>;
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
