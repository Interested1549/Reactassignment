import axios from 'axios';
import type { EventItem } from '../types/event';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getEvents = async () => {
  const res = await api.get<EventItem[]>('/events');
  return res.data;
};

export const getEventById = async (id: string) => {
  const res = await api.get<EventItem>(`/events/${id}`);
  return res.data;
};

export const createEvent = async (data: Omit<EventItem, 'id'>) => {
  const res = await api.post<EventItem>('/events', data);
  return res.data;
};

export const updateEvent = async (id: string, data: Omit<EventItem, 'id'>) => {
  const res = await api.put<EventItem>(`/events/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  await api.delete(`/events/${id}`);
};
