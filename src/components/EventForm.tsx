import { useState } from 'react';
import type { EventErrors, EventInput } from '../types/event';
import { validateEvent } from '../utils/validateEvent';
import { TextField } from './TextField';

interface EventFormProps {
  initialData?: EventInput;
  isCreate: boolean;
  isSubmitting: boolean;
  onSubmit: (data: EventInput) => Promise<void>;
}

export function EventForm({ initialData, isCreate, isSubmitting, onSubmit }: EventFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [startTime, setStartTime] = useState(initialData?.startTime || '');
  const [endTime, setEndTime] = useState(initialData?.endTime || '');
  const [format, setFormat] = useState<'offline' | 'online'>(initialData?.format || 'offline');
  const [location, setLocation] = useState(initialData?.location || '');
  const [meetingUrl, setMeetingUrl] = useState(initialData?.meetingUrl || '');
  const [maxSeats, setMaxSeats] = useState<number>(initialData?.maxSeats ?? 30);
  const [errors, setErrors] = useState<EventErrors>({});

  const getValues = (): EventInput => ({
    title,
    date,
    startTime,
    endTime,
    format,
    location: format === 'offline' ? location : '',
    meetingUrl: format === 'online' ? meetingUrl : '',
    maxSeats,
  });

  const handleBlur = () => {
    setErrors(validateEvent(getValues(), isCreate));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = getValues();
    const errs = validateEvent(values, isCreate);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-5 rounded shadow">
      <TextField label="Tên sự kiện" value={title} error={errors.title} onChange={setTitle} onBlur={handleBlur} />
      <TextField label="Ngày tổ chức" type="date" value={date} error={errors.date} onChange={setDate} onBlur={handleBlur} />
      <TextField label="Giờ bắt đầu" type="time" value={startTime} error={errors.startTime} onChange={setStartTime} onBlur={handleBlur} />
      <TextField label="Giờ kết thúc" type="time" value={endTime} error={errors.endTime} onChange={setEndTime} onBlur={handleBlur} />

      <div className="mb-3">
        <span className="block text-sm font-medium mb-1">Hình thức</span>
        <label className="mr-4 text-sm">
          <input type="radio" checked={format === 'offline'} onChange={() => setFormat('offline')} /> Trực tiếp
        </label>
        <label className="text-sm">
          <input type="radio" checked={format === 'online'} onChange={() => setFormat('online')} /> Trực tuyến
        </label>
      </div>

      {format === 'offline' ? (
        <TextField label="Địa điểm" value={location} error={errors.location} onChange={setLocation} onBlur={handleBlur} />
      ) : (
        <TextField label="Đường dẫn tham gia" value={meetingUrl} error={errors.meetingUrl} onChange={setMeetingUrl} onBlur={handleBlur} />
      )}

      <TextField
        label="Số chỗ tối đa"
        type="number"
        value={Number.isNaN(maxSeats) ? '' : maxSeats}
        error={errors.maxSeats}
        onChange={(v) => setMaxSeats(v === '' ? NaN : Number(v))}
        onBlur={handleBlur}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded font-medium disabled:bg-gray-400"
      >
        {isSubmitting ? 'Đang lưu...' : isCreate ? 'Thêm mới' : 'Lưu thay đổi'}
      </button>
    </form>
  );
}
