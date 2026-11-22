import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventForm } from '../components/EventForm';
import { getEventById, updateEvent } from '../services/eventService';
import type { EventInput, EventItem } from '../types/event';

export function EventEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then((data) => setEvent(data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (data: EventInput) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updateEvent(id, data);
      alert('Cập nhật thành công!');
      navigate(`/su-kien/${id}`);
    } catch {
      alert('Lỗi khi cập nhật!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-8">Đang tải...</p>;
  if (!event) return <p className="text-center py-8 text-red-600">Không tìm thấy sự kiện.</p>;

  return (
    <div>
      <h2 className="text-lg font-bold text-center mb-4">Chỉnh sửa sự kiện</h2>
      <EventForm initialData={event} isCreate={false} isSubmitting={isSubmitting} onSubmit={handleUpdate} />
    </div>
  );
}
