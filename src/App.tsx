import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { lazy } from 'react';
import { AppLayout } from './features/app/ui/AppLayout';
import { BlankLayout } from './features/app/ui/BlankLayout';

// Lazy load all pages
const BoardView = lazy(() => import('./pages/BoardView').then(module => ({ default: module.BoardView })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const WorkspacePage = lazy(() => import('./pages/WorkspacePage').then(module => ({ default: module.WorkspacePage })));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const DashBoardPage = lazy(() => import('./pages/dashboard/DashBoardPage'));

function App() {
  return (
    <BrowserRouter basename="/my-vue-app/">
      <Routes>
        <Route path="/auth" element={<BlankLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashBoardPage />} />
          <Route path="workspace/:workspaceId" element={<WorkspacePage />} />
          <Route path="board/:boardId" element={<BoardView />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
