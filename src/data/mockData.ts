import { User } from '@/stores/authStore';
import { Meeting } from '@/stores/meetingStore';

export const mockUser: User = {
  _id: '1',
  fullName: 'Alex Johnson',
  email: 'alex@ekaiva.com',
  username: 'alexj',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
};

export const mockMeetings: Meeting[] = [
  {
    _id: '1',
    title: 'Product Roadmap Review',
    description: 'Quarterly review of our product roadmap and priorities for Q2.',
    host: mockUser,
    participants: [
      {
        user: {
          _id: '2',
          fullName: 'Sarah Chen',
          email: 'sarah@ekaiva.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        response: 'accepted',
      },
      {
        user: {
          _id: '3',
          fullName: 'Mike Peters',
          email: 'mike@ekaiva.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        },
        response: 'pending',
      },
    ],
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    status: 'scheduled',
    meetingLink: 'https://meet.ekaiva.com/abc123',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    _id: '2',
    title: 'Design Sprint Kickoff',
    description: 'Starting our 5-day design sprint for the new dashboard features.',
    host: {
      _id: '2',
      fullName: 'Sarah Chen',
      email: 'sarah@ekaiva.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    participants: [
      {
        user: mockUser,
        response: 'accepted',
      },
    ],
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    duration: 90,
    status: 'scheduled',
    meetingLink: 'https://meet.ekaiva.com/def456',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  {
    _id: '3',
    title: 'Weekly Standup',
    description: 'Weekly team standup to sync on progress and blockers.',
    host: mockUser,
    participants: [
      {
        user: {
          _id: '2',
          fullName: 'Sarah Chen',
          email: 'sarah@ekaiva.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        response: 'accepted',
      },
      {
        user: {
          _id: '3',
          fullName: 'Mike Peters',
          email: 'mike@ekaiva.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        },
        response: 'accepted',
      },
      {
        user: {
          _id: '4',
          fullName: 'Emily Davis',
          email: 'emily@ekaiva.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        },
        response: 'declined',
      },
    ],
    scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 30,
    status: 'completed',
    meetingLink: 'https://meet.ekaiva.com/ghi789',
    transcription: `## Meeting Transcription

**Alex Johnson (Host):** Good morning everyone. Let's start with Sarah.

**Sarah Chen:** Thanks Alex. I've completed the new component library and it's ready for review. No blockers on my end.

**Mike Peters:** I'm wrapping up the API integration. Should be done by EOD. One small blocker - I need access to the staging environment.

**Alex Johnson:** I'll get that sorted for you right after this call. Emily, any updates?

**Emily Davis:** Working on the user testing documentation. All on track for the Friday deadline.

**Alex Johnson:** Great progress everyone. Let's reconnect tomorrow. Meeting adjourned.`,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  {
    _id: '4',
    title: 'Client Presentation',
    description: 'Presenting Q1 results to our enterprise client.',
    host: mockUser,
    participants: [
      {
        user: {
          _id: '5',
          fullName: 'John Smith',
          email: 'john@client.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        },
        response: 'accepted',
      },
    ],
    scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 45,
    status: 'scheduled',
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
  },
  {
    _id: '5',
    title: 'Technical Architecture Review',
    description: 'Deep dive into our microservices architecture.',
    host: {
      _id: '3',
      fullName: 'Mike Peters',
      email: 'mike@ekaiva.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    participants: [
      {
        user: mockUser,
        response: 'pending',
      },
    ],
    scheduledAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 120,
    status: 'cancelled',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z',
  },
];

export const mockStaff = [
  {
    _id: '2',
    fullName: 'Sarah Chen',
    email: 'sarah@ekaiva.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    available: true,
  },
  {
    _id: '3',
    fullName: 'Mike Peters',
    email: 'mike@ekaiva.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    available: true,
  },
  {
    _id: '4',
    fullName: 'Emily Davis',
    email: 'emily@ekaiva.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    available: false,
  },
  {
    _id: '5',
    fullName: 'David Wilson',
    email: 'david@ekaiva.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    available: true,
  },
];
