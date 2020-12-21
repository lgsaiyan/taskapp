import React, { useState } from 'react'
import Card from './Card'
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';

const TaskList = ({ tasks, onDelete, onCheck, onReorder }) => {
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        onReorder(items); //update tasks state object in Tasks component 
    };

    let i = 0
    const renderedList = tasks.map((task) => {
        const index = i
        i++ 
        return (
            <Draggable  key={task.id} draggableId={task.id} index={index} >
                {(provided) => (
                  <Card 
                    id={task.id}
                    name={task.name} 
                    category={task.category} 
                    description={task.description} 
                    due={task.due} 
                    status={task.status} 
                    onDelete={onDelete} 
                    onCheck={onCheck}
                    refProp={provided.innerRef}
                    dragProps={{...provided.draggableProps}}
                    dragHandleProps={{...provided.dragHandleProps}}
                />  
                )}
            </Draggable>
        )
    });


    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" direction="horizontal">
                {(provided) => (
                  <ul className="board" {...provided.droppableProps} ref={provided.innerRef}>
                    {renderedList}
                    {provided.placeholder}
                </ul>  
                )}
            </Droppable>
        </DragDropContext>
    )
};

export default TaskList