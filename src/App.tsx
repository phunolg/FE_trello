import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { lazy, Suspense } from 'react';
import { AppLayout } from './features/app/ui/AppLayout';
import { BlankLayout } from './features/app/ui/BlankLayout';
import { PageLoader } from './shared/ui/page-loader';

// Lazy load all pages
const BoardView = lazy(() => import('./pages/BoardView'));
const Profile = lazy(() => import('./pages/Profile'));
const WorkspacePage = lazy(() => import('./pages/WorkspacePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const DashBoardPage = lazy(() => import('./pages/dashboard/DashBoardPage'));

function App() {
  return (
    <BrowserRouter basename="/FE_trello/">
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App
