import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteEvent, getEvents } from '../services/eventService';
import type { EventItem } from '../types/event';

export function EventListPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
      .catch(() => setError('Không thể tải dữ liệu. Hãy kiểm tra json-server!'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa "${title}"?`)) return;
    await deleteEvent(id);
    setEvents(events.filter((item) => item.id !== id));
    alert('Xóa thành công!');
  };

  if (loading) return <p className="text-center py-8">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;
  if (events.length === 0) return <p className="text-center py-8">Danh sách trống.</p>;

  const today = new Date().toISOString().split('T')[0];
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-3 text-blue-700">Sắp diễn ra ({upcoming.length})</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {upcoming.map((ev) => (
            <div key={ev.id} className="bg-white p-4 rounded shadow border">
              <h3 className="font-bold">{ev.title}</h3>
              <p className="text-sm text-gray-600">{ev.date} | {ev.startTime} - {ev.endTime}</p>
              <p className="text-sm text-gray-600">
                {ev.format === 'offline' ? `Trực tiếp: ${ev.location}` : 'Trực tuyến'}
              </p>
              <div className="mt-3 flex gap-3 text-sm">
                <Link to={`/su-kien/${ev.id}`} className="text-blue-600 underline">Chi tiết</Link>
                <Link to={`/su-kien/${ev.id}/sua`} className="text-amber-600 underline">Sửa</Link>
                <button onClick={() => handleDelete(ev.id, ev.title)} className="text-red-600 underline ml-auto">
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3 text-gray-700">Đã diễn ra ({past.length})</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {past.map((ev) => (
            <div key={ev.id} className="bg-white p-4 rounded shadow border opacity-80">
              <h3 className="font-bold">{ev.title}</h3>
              <p className="text-sm text-gray-600">{ev.date} | {ev.startTime} - {ev.endTime}</p>
              <div className="mt-3 flex gap-3 text-sm">
                <Link to={`/su-kien/${ev.id}`} className="text-blue-600 underline">Chi tiết</Link>
                <Link to={`/su-kien/${ev.id}/sua`} className="text-amber-600 underline">Sửa</Link>
                <button onClick={() => handleDelete(ev.id, ev.title)} className="text-red-600 underline ml-auto">
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
