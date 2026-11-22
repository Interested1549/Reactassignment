import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, getEventById } from '../services/eventService';
import type { EventItem } from '../types/event';

export function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then((data) => setEvent(data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!event) return;
    if (!window.confirm(`Xóa sự kiện "${event.title}"?`)) return;
    await deleteEvent(event.id);
    alert('Đã xóa!');
    navigate('/');
  };

  if (loading) return <p className="text-center py-8">Đang tải...</p>;
  if (!event) return <p className="text-center py-8 text-red-600">Không tìm thấy sự kiện.</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-5 rounded shadow space-y-2">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>Ngày: {event.date}</p>
      <p>Giờ: {event.startTime} - {event.endTime}</p>
      <p>Hình thức: {event.format === 'offline' ? 'Trực tiếp' : 'Trực tuyến'}</p>
      {event.format === 'offline' ? (
        <p>Địa điểm: {event.location}</p>
      ) : (
        <p>Link: {event.meetingUrl}</p>
      )}
      <p>Số chỗ tối đa: {event.maxSeats}</p>

      <div className="pt-4 flex gap-3">
        <Link to={`/su-kien/${event.id}/sua`} className="px-3 py-1 bg-amber-500 text-white rounded">Sửa</Link>
        <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded">Xóa</button>
        <Link to="/" className="px-3 py-1 border rounded ml-auto">Quay lại</Link>
      </div>
    </div>
  );
}
