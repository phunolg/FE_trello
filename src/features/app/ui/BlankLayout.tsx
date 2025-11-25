import { Outlet } from 'react-router';

export function BlankLayout() {
  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <Outlet />
    </div>
  );
}
