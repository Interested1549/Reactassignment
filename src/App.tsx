import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/Mainlayout';
import { EventCreatePage } from './pages/EventCreatePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { EventEditPage } from './pages/EventEditPage';
import { EventListPage } from './pages/EventListPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<EventListPage />} />
          <Route path="/tao-moi" element={<EventCreatePage />} />
          <Route path="/su-kien/:id" element={<EventDetailPage />} />
          <Route path="/su-kien/:id/sua" element={<EventEditPage />} />
          <Route path="*" element={<p className="text-center py-10">404 - Không tìm thấy trang</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
