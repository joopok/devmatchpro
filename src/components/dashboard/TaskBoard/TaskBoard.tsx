import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { Task } from '../../../types/task';

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface TaskBoardProps {
  columns: Column[];
  onTaskMove: (taskId: string, sourceId: string, destinationId: string) => void;
  onAddTask: (columnId: string) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  columns,
  onTaskMove,
  onAddTask,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    onTaskMove(
      result.draggableId,
      result.source.droppableId,
      result.destination.droppableId
    );
  };

  const getTasksByStatus = (status: string) => 
    columns.find(column => column.id === status)?.tasks.filter(task => task.status === status) || [];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-6">
        {columns.map(column => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white dark:bg-gray-800 rounded-lg p-4"
              >
                <h3 className="font-medium mb-4">{column.title}</h3>
                {getTasksByStatus(column.id).map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded mb-2"
                      >
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500">{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}; 