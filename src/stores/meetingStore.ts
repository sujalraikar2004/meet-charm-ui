import { create } from 'zustand';

export type MeetingStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface Participant {
  user: {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
  response: 'pending' | 'accepted' | 'declined';
  joinedAt?: string;
}

export interface Meeting {
  _id: string;
  title: string;
  description?: string;
  host: {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
  participants: Participant[];
  scheduledAt: string;
  duration: number; // in minutes
  status: MeetingStatus;
  meetingLink?: string;
  transcription?: string;
  createdAt: string;
  updatedAt: string;
}

interface MeetingState {
  meetings: Meeting[];
  selectedMeeting: Meeting | null;
  isLoading: boolean;
  setMeetings: (meetings: Meeting[]) => void;
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  setSelectedMeeting: (meeting: Meeting | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  meetings: [],
  selectedMeeting: null,
  isLoading: false,
  setMeetings: (meetings) => set({ meetings }),
  addMeeting: (meeting) => set((state) => ({ meetings: [...state.meetings, meeting] })),
  updateMeeting: (id, updates) =>
    set((state) => ({
      meetings: state.meetings.map((m) => (m._id === id ? { ...m, ...updates } : m)),
    })),
  deleteMeeting: (id) =>
    set((state) => ({
      meetings: state.meetings.filter((m) => m._id !== id),
    })),
  setSelectedMeeting: (meeting) => set({ selectedMeeting: meeting }),
  setLoading: (isLoading) => set({ isLoading }),
}));
