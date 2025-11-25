import { useState } from 'react';
import { Kanban, ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui/sidebar';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { CreateWorkspaceDialog } from './CreateWorkspaceDialog';
import type { Workspace } from '@/shared/lib/types';

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
}

export function WorkspaceSwitcher({ workspaces }: WorkspaceSwitcherProps) {
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const { isMobile } = useSidebar();
  const { currentWorkspace, setCurrentWorkspace } = useBoardStore();
  
  const activeWorkspace = workspaces.find(w => w.id === currentWorkspace) || workspaces[0];

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground">
                  <Kanban className="size-4 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{activeWorkspace?.name || 'Select Workspace'}</span>
                  <span className="truncate text-xs">{activeWorkspace?.description || ''}</span>
                </div>
                <ChevronDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Workspaces
              </DropdownMenuLabel>
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => setCurrentWorkspace(workspace.id)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border bg-blue-600">
                    <Kanban className="size-4 text-white" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{workspace.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {workspace.boardIds.length} boards
                    </span>
                  </div>
                  {workspace.id === currentWorkspace && (
                    <div className="size-2 rounded-full bg-blue-600" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsCreateWorkspaceOpen(true)}
                className="gap-2 p-2"
              >
                <Plus className="size-4" />
                <span>Create workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <CreateWorkspaceDialog 
        open={isCreateWorkspaceOpen} 
        onOpenChange={setIsCreateWorkspaceOpen} 
      />
    </>
  );
}