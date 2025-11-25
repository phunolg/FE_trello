import { Link } from 'react-router';
import { useState, useMemo } from 'react';
import { Folder, Search, ChevronDown } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import type { Workspace } from '@/shared/lib/types';
import { useCallback } from 'react';

interface NavWorkspacesProps {
  workspaces: Workspace[];
}

export function NavBoards({ workspaces }: NavWorkspacesProps) {
  const { boards } = useBoardStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const getWorkspaceBoards = useCallback((workspaceId: string) => 
    boards.filter(board => board.workspaceId === workspaceId), [boards]);

  // Filter workspaces based on search query
  const filteredWorkspaces = useMemo(() => {
    if (!searchQuery) return workspaces;
    return workspaces.filter(workspace => 
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [workspaces, searchQuery]);

  // Sort by most recently accessed (mock for now) and board count
  const sortedWorkspaces = useMemo(() => {
    return [...filteredWorkspaces].sort((a, b) => {
      const aBoardCount = getWorkspaceBoards(a.id).length;
      const bBoardCount = getWorkspaceBoards(b.id).length;
      return bBoardCount - aBoardCount; // Sort by board count descending
    });
  }, [filteredWorkspaces, getWorkspaceBoards]);

  // Limit display to prevent overwhelming UI
  const INITIAL_DISPLAY_LIMIT = 8;
  const displayedWorkspaces = showAll ? sortedWorkspaces : sortedWorkspaces.slice(0, INITIAL_DISPLAY_LIMIT);
  const hasMore = sortedWorkspaces.length > INITIAL_DISPLAY_LIMIT;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      
      {/* Search Input - Only show if there are many workspaces */}
      {workspaces.length > 5 && (
        <div className="px-2 mb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>
      )}

      {/* Scrollable Menu Container */}
      <div className="max-h-64 overflow-y-auto">
        <SidebarMenu>
          {displayedWorkspaces.map((workspace) => {
            const workspaceBoards = getWorkspaceBoards(workspace.id);
            
            return (
              <SidebarMenuItem key={workspace.id}>
                <SidebarMenuButton asChild>
                  <Link 
                    to={`/workspace/${workspace.id}`}
                    className="justify-start"
                    title={`${workspace.name} - ${workspaceBoards.length} boards`}
                  >
                    <Folder className="w-4 h-4" />
                    <span className="truncate">{workspace.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {workspaceBoards.length}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </div>

      {/* Show More/Less Button */}
      {hasMore && !searchQuery && (
        <div className="px-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full justify-center text-xs text-muted-foreground hover:text-foreground"
          >
            <ChevronDown className={`w-3 h-3 mr-1 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            {showAll ? `Show Less` : `Show ${sortedWorkspaces.length - INITIAL_DISPLAY_LIMIT} More`}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredWorkspaces.length === 0 && searchQuery && (
        <div className="px-2 py-4 text-center">
          <p className="text-xs text-muted-foreground">No workspaces found</p>
        </div>
      )}
    </SidebarGroup>
  );
}