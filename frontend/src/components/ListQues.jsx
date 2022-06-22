import {useState, useEffect} from 'react';
import list from '../utils/question';
import "../styles/match_col.css";
// import {DndProvider, } from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';

let endTime = new Date(list[0].end).getTime();
let arr = [];
let toShow = false;
let len = list[0].questions.length;

const allow = (e) => {
    e.preventDefault();
}

const drop = (e) => {
    e.preventDefault();
    let className = e.dataTransfer.getData("class");
    let idName = e.dataTransfer.getData("id");
    if (idName === "select1") {
        if (e.target.id === "select2") {
            e.target.appendChild(document.getElementsByClassName(className)[0]);
        }
        else if (e.target.className === "colA") {
            console.log(document.getElementsByClassName(className)[1]);
            e.target.appendChild(document.getElementsByClassName(className)[1]);
        }
    }
}

const drag = (e) => {
    e.dataTransfer.setData("class", e.target.className);
    e.dataTransfer.setData("id", e.target.id);
}

export default function ListQues() {
    const [disp, setDisp] = useState("over");
    const [disappear, setDisappear] = useState(false);
    const [count, setCount] = useState(1);

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
        setCount(count + 1);
        console.log(arr);
    };

    const editTime = () => {
        setCount(count - 1);
    };

    return  (
        <div>
            <h1 id="timer">{hours > 0 ? hours : 0}:{minutes > 0 ? minutes : 0}:{seconds > 0 ? seconds : 0}</h1>
            <h3 className="questionNo">Question-{count}</h3>
            <p className="questionName">{list[0].questions.map(
                (e) => {
                   if (e.ques_id === count) {
                          return e.question_name;
                   } 
                }
            )}</p>

            {/* <DndProvider backend={HTML5Backend}>
                <Columns />
            </DndProvider> */}

            <div className='question'>
                <div className="colA" 
                    onDrop={(e) => drop(e)} 
                    onDragOver={(e) => allow(e)}>
                    {list[0].questions.map((e) => {
                        if (e.ques_id === count) {
                            return (
                                <div key={e.ques_id} >
                                    {e.rows.map((x) => {
                                        return (
                                            <div key={x.id} id="select1" draggable="true" onDragStart={(e) => drag(e)} className={"box" + x.id}>
                                                <h3>{x.colA}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="colB" 
                    onDrop={(e) => drop(e)} 
                    onDragOver={(e) => allow(e)}>
                    {list[0].questions.map((e) => {
                        if (e.ques_id === count) {
                            return (
                                <div key={e.ques_id} >
                                    {e.rows.map((x) => {
                                        return (
                                            <div key={x.id} id="select2" className={"box" + x.id}>
                                                <h3>{x.colB}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            {!disappear && count < len ? <button onClick={addTime} className="navButton">Next</button> : null}
            {count > 1 || count >= len ? <button onClick={editTime} className="navButton"> Previous</button> : null}
            <button onClick={() => {
                toShow = true;
                setDisappear(true);
            }} className="navButton">End Test</button>
            {toShow ? arr.map((item, index) => {
            return (
                <div key={index}>
                    <p>{item.hours}:{item.minutes}:{item.seconds}</p>
                </div>
                );
            }) : null}
        </div>
    );
}