import type { EventErrors, EventInput } from '../types/event';

export function validateEvent(values: EventInput, isCreate: boolean): EventErrors {
  const errors: EventErrors = {};

  // 1. Tên sự kiện: 5 - 100 ký tự
  const title = values.title.trim();
  if (!title) {
    errors.title = 'Vui lòng nhập tên sự kiện.';
  } else if (title.length < 5 || title.length > 100) {
    errors.title = 'Tên sự kiện phải từ 5 đến 100 ký tự.';
  }

  // 2. Ngày tổ chức: không ở quá khứ khi thêm mới
  const today = new Date().toISOString().split('T')[0];
  if (!values.date) {
    errors.date = 'Vui lòng chọn ngày tổ chức.';
  } else if (isCreate && values.date < today) {
    errors.date = 'Ngày tổ chức không được là ngày trong quá khứ.';
  }

  // 3. Giờ bắt đầu & Giờ kết thúc
  if (!values.startTime) {
    errors.startTime = 'Vui lòng chọn giờ bắt đầu.';
  }
  if (!values.endTime) {
    errors.endTime = 'Vui lòng chọn giờ kết thúc.';
  } else if (values.startTime && values.endTime <= values.startTime) {
    errors.endTime = 'Giờ kết thúc phải sau giờ bắt đầu.';
  }

  // 4. Địa điểm (Trực tiếp) hoặc Đường dẫn (Trực tuyến)
  if (values.format === 'offline') {
    if (!values.location.trim()) {
      errors.location = 'Vui lòng nhập địa điểm.';
    }
  } else {
    const url = values.meetingUrl.trim();
    if (!url) {
      errors.meetingUrl = 'Vui lòng nhập đường dẫn tham gia.';
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      errors.meetingUrl = 'Đường dẫn phải bắt đầu bằng http:// hoặc https://';
    }
  }

  // 5. Số chỗ tối đa: số nguyên 1 - 500
  if (!values.maxSeats && values.maxSeats !== 0) {
    errors.maxSeats = 'Vui lòng nhập số chỗ tối đa.';
  } else if (!Number.isInteger(values.maxSeats) || values.maxSeats < 1 || values.maxSeats > 500) {
    errors.maxSeats = 'Số chỗ tối đa phải là số nguyên từ 1 đến 500.';
  }

  return errors;
}
