import { useState } from 'react';
import { useParams } from 'react-router';
import { Users, MoreHorizontal, Edit } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { InviteDialog } from '../../../shared/components/InviteDialog.tsx';

export function Header() {
  const { boardId } = useParams();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  
  const { boards, users, updateBoard } = useBoardStore();
  const currentBoard = boards.find(board => board.id === boardId);
  
  const handleTitleEdit = () => {
    if (currentBoard) {
      setTempTitle(currentBoard.title);
      setIsEditingTitle(true);
    }
  };

  const handleTitleSave = () => {
    if (currentBoard && tempTitle.trim()) {
      updateBoard(currentBoard.id, { title: tempTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setIsEditingTitle(false);
    setTempTitle('');
  };

  if (!currentBoard) {
    return (
      <header className="h-16 border-b bg-white flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </div>
      </header>
    );
  }

  const boardMembers = currentBoard.members.map(memberId => users[memberId]).filter(Boolean);

  return (
    <>
      <header className="h-16 border-b bg-white flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') handleTitleCancel();
                }}
                className="text-lg font-semibold bg-transparent border-b-2 border-blue-500 outline-none"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-gray-900">{currentBoard.title}</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTitleEdit}
                className="h-6 w-6 p-0"
              >
                <Edit className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Board Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsInviteOpen(true)}
          >
            <Users className="w-4 h-4 mr-2" />
            Invite
          </Button>

          {/* Board Members */}
          <div className="flex items-center -space-x-2">
            {boardMembers.slice(0, 4).map((member) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            ))}
            {boardMembers.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                +{boardMembers.length - 4}
              </div>
            )}
          </div>

          {/* Board Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsInviteOpen(true)}>
                <Users className="w-4 h-4 mr-2" />
                Invite members
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTitleEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Rename board
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <InviteDialog 
        open={isInviteOpen} 
        onOpenChange={setIsInviteOpen}
        boardId={currentBoard.id}
      />
    </>
  );
}