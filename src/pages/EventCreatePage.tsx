import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventForm } from '../components/EventForm';
import { createEvent } from '../services/eventService';
import type { EventInput } from '../types/event';

export function EventCreatePage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: EventInput) => {
    setIsSubmitting(true);
    try {
      await createEvent(data);
      alert('Thêm sự kiện thành công!');
      navigate('/');
    } catch {
      alert('Lỗi khi thêm sự kiện!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center mb-4">Thêm sự kiện mới</h2>
      <EventForm isCreate={true} isSubmitting={isSubmitting} onSubmit={handleCreate} />
    </div>
  );
}
