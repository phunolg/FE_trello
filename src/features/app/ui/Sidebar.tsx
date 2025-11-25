"use client"

import * as React from "react"
import { useState } from 'react';
import { 
  Layout,
  Kanban,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/shared/ui/sidebar';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { CreateBoardDialog } from '../../../shared/components/CreateBoardDialog';
import { NavMain } from './nav-main';
import { NavBoards } from './nav-boards';
import { NavUser } from './nav-user';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const { currentUser, workspaces } = useBoardStore();

  const navMain = [
    {
      title: "Dashboard",
      url: "/",
      icon: Layout,
      isActive: true,
    },
  ];

  const userData = currentUser ? {
    name: currentUser.name,
    email: currentUser.email,
    avatar: currentUser.avatar,
  } : {
    name: "Guest",
    email: "guest@example.com",
    avatar: "",
  };

  // Get all workspaces
  const allWorkspaces = Object.values(workspaces);

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Kanban className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Trello</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navMain} />
          <NavBoards workspaces={allWorkspaces} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <CreateBoardDialog 
        open={isCreateBoardOpen} 
        onOpenChange={setIsCreateBoardOpen} 
      />
    </>
  );
}
