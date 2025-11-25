import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useBoardStore } from '@/shared/stores/useBoardStore';

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardId: string;
}

export function InviteDialog({ open, onOpenChange, boardId }: InviteDialogProps) {
  const [email, setEmail] = useState('');
  const { users, addMemberToBoard } = useBoardStore();
  
  // Mock available users (in a real app, this would come from your user API)
  const availableUsers = Object.values(users);

  const handleInvite = (userId: string) => {
    addMemberToBoard(boardId, userId);
    onOpenChange(false);
  };

  const handleEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send an email invitation
    console.log('Inviting user by email:', email);
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to Board</DialogTitle>
          <DialogDescription>
            Invite team members to collaborate on this board.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Invite by Email */}
          <form onSubmit={handleEmailInvite} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Invite by Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <Button type="submit" disabled={!email.trim()} className="w-full">
              Send Invitation
            </Button>
          </form>

          {/* Quick Invite Available Users */}
          <div className="space-y-3">
            <Label>Quick Invite</Label>
            <div className="space-y-2">
              {availableUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleInvite(user.id)}
                  >
                    Invite
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}