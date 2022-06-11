import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import "../styles/match_col.css";
import Picture from './picture';

const PictureList = [
    {
        id: 1,
        desc: "one",
    },
    {
        id: 2, 
        desc: "two",
    },
    {
        id: 3,
        desc: "three",
    }
];

function Columns() {
    const [ans, setAns] = useState([]);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (id) => {
        const list = PictureList.filter((picture) => id === picture.id);
        setAns((board) => [...board, list[0]]);
    };

    return (
        <div className="board">
            <div className="colA">
                {PictureList.map((picture) => {
                    return <Picture 
                            key={picture.id} 
                            desc={picture.desc} 
                            id={picture.id} 
                             />;
                })}
            </div>
            <div className="colB" ref={drop}>
                {ans.map((picture) => {
                    return <Picture 
                            key={picture.id} 
                            desc={picture.desc} 
                            id={picture.id} />;
                })}
            </div>
        </div>
    )
}

export default Columns;