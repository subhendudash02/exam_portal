import React from 'react';
import { useDrag } from 'react-dnd';

function Picture({id, desc}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'image',
        item: {id: id},
        collect: (e) => ({
            isDragging: !!e.isDragging(),
        })
    }));
    return (
        <div className="box" draggable="true" ref={drag}>
            <h3>{desc}</h3>
        </div>
    );
}

export default Picture