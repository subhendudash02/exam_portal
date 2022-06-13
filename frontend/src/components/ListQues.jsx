import {useState, useEffect} from 'react';
import list from '../utils/question';
import "../styles/match_col.css";
// import {DndProvider, } from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';

let endTime = new Date('Jun 8, 2022 21:00:00').getTime();
let arr = [];
let toShow = false;

const allow = (e) => {
    e.preventDefault();
}

const drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    if (e.target.className === "colB" || e.target.className === "colA") {
        e.target.appendChild(document.getElementsByClassName(data)[0]);
    }   
    else {
        console.log("invalid");
    }
}

const drag = (e) => {
    e.dataTransfer.setData("text", e.target.className);
}

export default function ListQues() {
    const [disp, setDisp] = useState("over");
    const [disappear, setDisappear] = useState(false);

    useEffect(() => {
        let dist = endTime - new Date().getTime();
        const interval = setInterval(() => {
            setDisp(dist)}, 1000);
        return () => {clearInterval(interval)};
    });

    let hours = Math.floor((disp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((disp % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((disp % (1000 * 60)) / 1000);

    const addTime = () => {
        arr.push({"hours": hours, "minutes": minutes, "seconds": seconds});
        console.log(arr);
    };

    return  (
        <div>
            <h1>{hours > 0 ? hours : 0}:{minutes > 0 ? minutes : 0}:{seconds > 0 ? seconds : 0}</h1>
            {!disappear ? <button onClick={addTime}>Next</button> : null}
            <button onClick={() => {
                toShow = true;
                setDisappear(true);
            }}>End Test</button>
            {toShow ? arr.map((item, index) => {
            return (
                <div key={index}>
                    <p>{item.hours}:{item.minutes}:{item.seconds}</p>
                </div>
                );
            }) : null}

            {/* <DndProvider backend={HTML5Backend}>
                <Columns />
            </DndProvider> */}

            <div className="question">
                <div className="colA" 
                    onDrop={(e) => drop(e)} 
                    onDragOver={(e) => allow(e)}>
                    {list.map((x) => {
                        return (
                            <div key={x.id} id="select" draggable="true" onDragStart={(e) => drag(e)} className={"box" + x.id}>
                                <h3>{x.desc}</h3>
                            </div>
                        );
                    })}
                </div>
                <div className="colB" 
                    onDrop={(e) => drop(e)} 
                    onDragOver={(e) => allow(e)}>
                </div>
            </div>
        </div>
    );
}