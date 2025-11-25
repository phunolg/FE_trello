import { useState } from 'react';
import { Trash2, MessageCircle, X, CheckSquare, UserPlus, Tag, Check, Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/popover';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Separator } from '@/shared/ui/separator';
import { Badge } from '@/shared/ui/badge';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import type { Card as CardType } from '@/shared/lib/types';

interface CardDialogProps {
  card: CardType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CardDialog({ card, open, onOpenChange }: CardDialogProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [newComment, setNewComment] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [selectedTagColor, setSelectedTagColor] = useState('#3B82F6');
  const [newTodoText, setNewTodoText] = useState('');
  
  const { 
    users, 
    comments, 
    lists,
    tags,
    todos,
    boards,
    updateCard, 
    deleteCard, 
    assignUserToCard,
    unassignUserFromCard,
    addComment,
    currentUser,
    createTag,
    addTagToCard,
    removeTagFromCard,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  } = useBoardStore();
  
  // Get the list this card belongs to
  const list = lists[card.listId];
  
  // Get board to find available tags
  const board = Object.values(boards).find(b => b.listIds.includes(card.listId));
  const availableTags = Object.values(tags).filter(tag => tag.boardId === board?.id);
  const cardTags = card.tagIds.map(tagId => tags[tagId]).filter(Boolean);
  const cardTodos = Object.values(todos).filter(todo => todo.cardId === card.id);
  
  const handleCreateTag = () => {
    if (newTagName.trim() && board) {
      const tagId = createTag(board.id, newTagName.trim(), selectedTagColor);
      addTagToCard(card.id, tagId);
      setNewTagName('');
    }
  };

  const handleCreateTodo = () => {
    if (newTodoText.trim()) {
      createTodo(card.id, newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleToggleTodo = (todoId: string) => {
    toggleTodo(todoId);
  };

  const handleDeleteTodo = (todoId: string) => {
    deleteTodo(todoId);
  };

  const handleToggleTag = (tagId: string) => {
    if (card.tagIds.includes(tagId)) {
      removeTagFromCard(card.id, tagId);
    } else {
      addTagToCard(card.id, tagId);
    }
  };

  const tagColors = [
    '#3B82F6', // Blue
    '#EF4444', // Red  
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
  ];

  const assignedUsers = card.assignedUsers.map(userId => users[userId]).filter(Boolean);
  const availableUsers = Object.values(users).filter(user => 
    !card.assignedUsers.includes(user.id)
  );
  
  const cardComments = Object.values(comments)
    .filter(comment => comment.cardId === card.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const handleSave = () => {
    updateCard(card.id, {
      title: title.trim() || card.title,
      description: description.trim()
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
      deleteCard(card.id);
      onOpenChange(false);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && currentUser) {
      addComment(card.id, newComment.trim());
      setNewComment('');
    }
  };

  const handleAssignUser = (userId: string) => {
    assignUserToCard(card.id, userId);
  };

  const handleUnassignUser = (userId: string) => {
    unassignUserFromCard(card.id, userId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              {list?.title || 'Card Details'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="sr-only">
            Edit card details, assign users, and manage comments
          </DialogDescription>
        </DialogHeader>
        
        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Add tags
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Tags</h3>
                  
                  {/* Display current tags */}
                  {cardTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cardTags.map((tag) => (
                        <Badge 
                          key={tag.id}
                          className="cursor-pointer text-white text-ellipsis"
                          style={{ backgroundColor: tag.color }}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleToggleTag(tag.id);
                          }}
                          title={`Remove ${tag.name}`}
                        >
                          <span className="truncate max-w-24">{tag.name}</span> ×
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Available tags */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Available tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.filter(tag => !card.tagIds.includes(tag.id)).map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100"
                          style={{ borderColor: tag.color, color: tag.color }}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleToggleTag(tag.id);
                          }}
                          title={`Add ${tag.name}`}
                        >
                          <span className="truncate max-w-24">{tag.name}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Create new tag */}
                  <div className="space-y-2 pt-3 border-t">
                    <p className="text-sm text-gray-600">Create new tag:</p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Tag name"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className="flex-1"
                      />
                      <div className="flex gap-1">
                        {tagColors.map((color) => (
                          <button
                            key={color}
                            className={`w-6 h-6 rounded-full border-2 ${
                              selectedTagColor === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              setSelectedTagColor(color);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleCreateTag();
                      }} 
                      disabled={!newTagName.trim()}
                    >
                      Create Tag
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                Add todo
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Todos</h3>
                  
                  {/* Display current todos */}
                  {cardTodos.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {cardTodos.map((todo) => (
                        <div 
                          key={todo.id}
                          className="flex items-center gap-2 p-2 border rounded-md"
                        >
                          <button
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              todo.completed 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              handleToggleTodo(todo.id);
                            }}
                          >
                            {todo.completed && <Check className="w-3 h-3" />}
                          </button>
                          <span 
                            className={`flex-1 text-sm ${
                              todo.completed ? 'line-through text-gray-500' : ''
                            }`}
                          >
                            {todo.text}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-red-100"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              handleDeleteTodo(todo.id);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new todo */}
                  <div className="space-y-2 pt-3 border-t">
                    <p className="text-sm text-gray-600">Add new todo:</p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter todo item"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleCreateTodo();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        size="sm" 
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleCreateTodo();
                        }} 
                        disabled={!newTodoText.trim()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add member
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Card Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              className="text-lg font-medium"
            />
          </div>

          {/* Card Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleSave}
              placeholder="Add a description..."
              className="w-full p-3 border rounded-md min-h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Card Tags */}
          {cardTags.length > 0 && (
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {cardTags.map((tag) => (
                  <Badge 
                    key={tag.id}
                    style={{ backgroundColor: tag.color }}
                    className="text-white"
                    title={tag.name}
                  >
                    <span className="truncate max-w-32">{tag.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Card Todos */}
          {cardTodos.length > 0 && (
            <div className="space-y-2">
              <Label>Todos ({cardTodos.filter(todo => todo.completed).length}/{cardTodos.length} completed)</Label>
              <div className="space-y-2">
                {cardTodos.map((todo) => (
                  <div 
                    key={todo.id}
                    className="flex items-center gap-2 p-2 border rounded-md bg-gray-50"
                  >
                    <button
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        todo.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => handleToggleTodo(todo.id)}
                    >
                      {todo.completed && <Check className="w-3 h-3" />}
                    </button>
                    <span 
                      className={`flex-1 text-sm ${
                        todo.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {todo.text}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assigned Users */}
          <div className="space-y-3">
            <Label>Assigned Users</Label>
            {assignedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {assignedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 hover:bg-red-100"
                      onClick={() => handleUnassignUser(user.id)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {availableUsers.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Available users:</p>
                <div className="flex flex-wrap gap-2">
                  {availableUsers.map((user) => (
                    <Button
                      key={user.id}
                      size="sm"
                      variant="outline"
                      onClick={() => handleAssignUser(user.id)}
                      className="flex items-center gap-2"
                    >
                      <Avatar className="w-4 h-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Comments */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Comments
            </Label>
            
            {/* Add Comment */}
            <div className="flex gap-2">
              <Avatar className="w-8 h-8">
                {currentUser && (
                  <>
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div className="flex-1 space-y-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
                {newComment && (
                  <Button size="sm" onClick={handleAddComment}>
                    Add Comment
                  </Button>
                )}
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {cardComments.map((comment) => {
                const commentUser = users[comment.userId];
                return (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={commentUser?.avatar} alt={commentUser?.name} />
                      <AvatarFallback className="text-xs">
                        {commentUser?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{commentUser?.name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Card
            </Button>
            
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}