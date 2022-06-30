import React, {useState, useEffect} from 'react';
import "../styles/match_col.css";
import link from '../utils/api_exam';
import { useLocation } from "react-router-dom";
// import {DndProvider, } from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';

// pagination
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


// let arr = [];
let toShow = false;

const allow = (e) => {
    e.preventDefault();
}

const drop = (e) => {
    e.preventDefault();
    let className = e.dataTransfer.getData("class");
    let idName = e.dataTransfer.getData("id");
    if (idName === "select1") {
        if (e.target.id === "select2") {
            const target = document.getElementsByClassName(className)[0];
            e.target.appendChild(target);
            target.style.backgroundColor = "blue";
        }
        else if (e.target.className === "colA") {
            const target = document.getElementsByClassName(className)[1];
            console.log(target);
            e.target.appendChild(target);
            target.style.backgroundColor = "#0f8870";
        }
    }
}

const drag = (e) => {
    e.dataTransfer.setData("class", e.target.className);
    e.dataTransfer.setData("id", e.target.id);
}

export default function ListQues() {
    const { state }  = useLocation();

    const [disp, setDisp] = useState(0  );
    const [disappear, setDisappear] = useState(false);
    const [count, setCount] = useState(1);
    const [len, setLength] = useState(0);
    const [ques, setQues] = useState([]);
    const [endTime, setEndTime] = useState(0);

    const fn = async () => {await link.get(`/exams/${state.test.test_id}/`).then(
        (res) => {
            setLength(res.data.questions.length);
            setEndTime(new Date(res.data.end.slice(0, res.data.end.length-1)).getTime());
            setQues(res.data.questions);
        }
    )};

    console.log(state);

    useEffect(() => {
        fn();
        let dist = endTime - new Date().getTime();
        let interval = setTimeout(() => {setDisp(dist)} , 1000);
        // return () => {clearTimeout(interval)};
    }, [fn]);

    // let endTime = new Date(list[0].end).getTime();

    let hours = Math.floor((disp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((disp % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((disp % (1000 * 60)) / 1000);

    const addTime = () => {
        // arr.push({"hours": hours, "minutes": minutes, "seconds": seconds});
        setCount(count + 1);
        // console.log(arr);
    };

    const editTime = () => {
        setCount(count - 1);
    };

    return  (
        <div>
            <Stack spacing={6} id="navigator">
                <Pagination count={len} 
                            size="large" 
                            color='primary'
                            page={count}
                            hideNextButton hidePrevButton
                            onChange={(e) => {
                                    // console.log(e.target.textContent);
                                    if (e.target.textContent === "") {
                                        console.log(count);
                                        setCount(count + 1);
                                    }
                                    setCount(parseInt(e.target.textContent))
                                }} />
            </Stack>
            <h1 id="timer">{hours > 0 ? hours : 0}:{minutes > 0 ? minutes : 0}:{seconds > 0 ? seconds : 0}</h1>
            <h3 className="questionNo">Question-{count}</h3>
            <p className="questionName">{ques.map(
                (e, i) => {
                   if (i === count - 1) {
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
                    {ques.map((e, i) => {
                        if (i === count - 1) {
                            const arr = e.colA.split(", ");
                            return (
                                <div key={i}>
                                    {
                                        arr.map((e, index) => {
                                            return (
                                                <div key={index} 
                                                    id="select1" 
                                                    className={"box" + (index + 1)}
                                                    draggable="true" 
                                                    onDragStart={(e) => drag(e)}>
                                                <h3>{e}</h3>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            ); 
                        }
                    })}
                </div>
                <div className="colB" 
                    onDrop={(e) => drop(e)} 
                    onDragOver={(e) => allow(e)}>
                    {ques.map((e, i) => {
                        if (i === count - 1) {
                            const arr = e.colB.split(", ");
                            return (
                                <div key={i}>
                                    {
                                        arr.map((e, index) => {
                                            return (
                                                <div key={index} 
                                                    id="select2" 
                                                    className={"box" + (index + 1)}>
                                                <h3>{e}</h3>
                                                </div>
                                            );
                                        })
                                    }
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
            {/* {toShow ? arr.map((item, index) => {
            return (
                <div key={index}>
                    <p>{item.hours}:{item.minutes}:{item.seconds}</p>
                </div>
                );
            }) : null} */}
        </div>
    );
}