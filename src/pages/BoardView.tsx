import { useParams } from 'react-router';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { BoardList } from '../shared/components/BoardList.tsx';
import { CreateListButton } from '../shared/components/CreateListButton.tsx';

export function BoardView() {
  const { boardId } = useParams<{ boardId: string }>();
  const { boards, lists, moveCard, moveList } = useBoardStore();
  
  const currentBoard = boards.find(board => board.id === boardId);
  
  if (!currentBoard) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Board not found</h2>
          <p className="text-gray-600">The board you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const boardLists = currentBoard.listIds
    .map(listId => lists[listId])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);

  const handleDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      // Handle list reordering
      const listId = result.draggableId;
      moveList(listId, destination.index);
    } else {
      // Handle card movement
      const cardId = result.draggableId;
      const sourceListId = source.droppableId;
      const destinationListId = destination.droppableId;

      if (sourceListId === destinationListId) {
        // Moving within the same list
        moveCard(cardId, destinationListId, destination.index);
      } else {
        // Moving to a different list
        moveCard(cardId, destinationListId, destination.index);
      }
    }
  };

  return (
    <div className="h-full overflow-hidden">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 p-4 h-full overflow-x-auto"
            >
              {boardLists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`shrink-0 ${
                        snapshot.isDragging ? 'rotate-2' : ''
                      }`}
                    >
                      <BoardList
                        list={list}
                        dragHandleProps={provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              <div className="shrink-0">
                <CreateListButton boardId={currentBoard.id} />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default BoardView;