export interface EventItem {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  format: 'offline' | 'online';
  location: string;
  meetingUrl: string;
  maxSeats: number;
}

export interface EventErrors {
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  meetingUrl?: string;
  maxSeats?: string;
}

export interface EventInput {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  format: 'offline' | 'online';
  location: string;
  meetingUrl: string;
  maxSeats: number;
}
