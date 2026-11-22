import { NavLink, Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="font-bold text-lg text-blue-600">CLB Sự Kiện</span>
          <nav className="flex gap-4 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'text-gray-600')}
            >
              Danh sách
            </NavLink>
            <NavLink
              to="/tao-moi"
              className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'text-gray-600')}
            >
              Thêm sự kiện
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-white border-t text-center p-3 text-xs text-gray-500">
        Quản lý sự kiện câu lạc bộ - 2026
      </footer>
    </div>
  );
}
