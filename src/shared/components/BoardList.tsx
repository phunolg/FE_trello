import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreVertical, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { BoardCard } from './BoardCard.tsx';
import type { List } from '@/shared/lib/types';

interface BoardListProps {
  list: List;
  dragHandleProps?: any;
  isDragging?: boolean;
}

export function BoardList({ list, dragHandleProps, isDragging }: BoardListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(list.title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  
  const { cards, updateList, deleteList, createCard } = useBoardStore();
  
  const listCards = list.cardIds
    .map(cardId => cards[cardId])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);

  const handleTitleSave = () => {
    if (tempTitle.trim()) {
      updateList(list.id, { title: tempTitle.trim() });
    } else {
      setTempTitle(list.title);
    }
    setIsEditing(false);
  };

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      createCard(list.id, newCardTitle.trim());
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleDeleteList = () => {
    if (confirm('Are you sure you want to delete this list? This action cannot be undone.')) {
      deleteList(list.id);
    }
  };

  return (
    <Card className={`w-72 bg-gray-50 ${isDragging ? 'shadow-lg' : ''}`}>
      <CardHeader className="pb-2" {...dragHandleProps}>
        <div className="flex items-center justify-between">
          {isEditing ? (
            <Input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTitleSave();
                if (e.key === 'Escape') {
                  setTempTitle(list.title);
                  setIsEditing(false);
                }
              }}
              className="text-sm font-semibold bg-white"
              autoFocus
            />
          ) : (
            <h3 
              className="text-sm font-semibold cursor-pointer hover:bg-gray-200 rounded px-2 py-1 -mx-2 -my-1"
              onClick={() => setIsEditing(true)}
            >
              {list.title}
            </h3>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDeleteList}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Droppable droppableId={list.id} type="card">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-2 min-h-2 ${
                snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
              }`}
            >
              {listCards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BoardCard 
                        card={card} 
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              {isAddingCard ? (
                <div className="space-y-2">
                  <Input
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddCard();
                      if (e.key === 'Escape') {
                        setNewCardTitle('');
                        setIsAddingCard(false);
                      }
                    }}
                    placeholder="Enter card title..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddCard}>
                      Add Card
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setNewCardTitle('');
                        setIsAddingCard(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-500 hover:text-gray-700"
                  onClick={() => setIsAddingCard(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add a card
                </Button>
              )}
            </div>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
}