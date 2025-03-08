import React from 'react';
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface DragDropWrapperProps {
  onDragEnd: (result: DropResult) => void;
  children: React.ReactNode;
}

export const DragDropWrapper: React.FC<DragDropWrapperProps> = ({
  onDragEnd,
  children,
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    {children}
  </DragDropContext>
);

interface DroppableWrapperProps {
  droppableId: string;
  children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement;
}

export const DroppableWrapper: React.FC<DroppableWrapperProps> = ({
  droppableId,
  children,
}) => (
  <Droppable droppableId={droppableId}>
    {(provided, snapshot) => children(provided, snapshot)}
  </Droppable>
);

interface DraggableWrapperProps {
  draggableId: string;
  index: number;
  children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactElement;
}

export const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  draggableId,
  index,
  children,
}) => (
  <Draggable draggableId={draggableId} index={index}>
    {(provided, snapshot) => children(provided, snapshot)}
  </Draggable>
); 