import { Outlet, useLocation } from 'react-router';
import { Suspense } from 'react';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { PageLoader } from '@/shared/ui/page-loader';
import { AppSidebar } from './Sidebar';
import { Header } from './Header';

export function AppLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-hidden">
              <Suspense key={location.pathname} fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}