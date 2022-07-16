import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import {DndProvider, } from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';

import link from '../../utils/apiExam';
import Column from './Column';
import saveState from '../../utils/ansState';

import './Exam.scss';

const allow = (e) => {
  e.preventDefault();
};

const saveAns = (count) => {
  const tempObj = {};
  tempObj.colA = document.getElementsByClassName('colA')[0].innerHTML;
  tempObj.colB = document.getElementsByClassName('colB')[0].innerHTML;
  saveState[count - 1] = tempObj;
};

const drop = (e) => {
  e.preventDefault();
  const className = e.dataTransfer.getData('class');
  const idName = e.dataTransfer.getData('id');
  if (idName === 'select1') {
    if (e.target.id === 'select2') {
      const target = document.getElementsByClassName(className)[0];
      e.target.appendChild(target);
      target.style.backgroundColor = 'blue';
    } else if (e.target.className === 'colA') {
      const target = document.getElementsByClassName(className)[1];
      e.target.appendChild(target);
      target.style.backgroundColor = '#0f8870';
    }
  }
};

const drag = (e) => {
  e.dataTransfer.setData('class', e.target.className);
  e.dataTransfer.setData('id', e.target.id);
};

const ListQues = () => {
  const { state } = useLocation();

  const [disp, setDisp] = useState(0);
  const [disappear, setDisappear] = useState(false);
  const [count, setCount] = useState(1);
  const [len, setLength] = useState(0);
  const [ques, setQues] = useState([]);
  const [endTime, setEndTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [reset, setReset] = useState(false);
  const [times] = useState(new Array(50).fill(0));

  const fn = async () => {
    await link.get(`/exams/${state.test.test_id}/`).then(
      (res) => {
        setLength(res.data.questions.length);
        setEndTime(new Date(res.data.end.slice(0, res.data.end.length - 1)).getTime());
        setQues(res.data.questions);
      },
    );
  };

  useEffect(() => {
    fn();
    const dist = endTime - new Date().getTime();
    setTimeout(() => {
      setDisp(dist);
    }, 1000);
    setTimeout(() => {
      if (reset === true) {
        setCounter(0);
        setReset(false);
      } else {
        setCounter(counter + 1);
      }
    }, 1000);
    // return () => {clearTimeout(interval)};
  }, [fn]);

  // let endTime = new Date(list[0].end).getTime();

  const hours = Math.floor((disp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((disp % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((disp % (1000 * 60)) / 1000);

  const addTime = (c) => {
    // arr.push({"hours": hours, "minutes": minutes, "seconds": seconds});
    if (times.length > c) {
      times[c] += counter;
    } else {
      // setTimes([...times, counter]);
      times[c] = counter;
    }
    setReset(true);
    setCount(count + 1);
  };

  const editTime = (c) => {
    times[c - 1] += counter;
    setReset(true);
    setCount(count - 1);
  };

  return (
    <div>
      <Stack spacing={6} id="navigator">
        <Pagination
          count={len}
          size="large"
          color="primary"
          page={count}
          hideNextButton
          hidePrevButton
          onChange={(e) => {
            // console.log(e.target.textContent);
            times[count - 1] += counter;
            setCount(parseInt(e.target.textContent, 10));
          }}
        />
      </Stack>
      <h1 id="timer">{hours > 0 ? hours : 0}:{minutes > 0 ? minutes : 0}:{seconds > 0 ? seconds : 0}</h1>
      <h3 className="questionNo">Question-{count}</h3>
      <p className="questionName">{ques.map(
        (e, i) => {
          if (i === count - 1) {
            return e.question_name;
          }
          return null;
        },
      )}
      </p>

      {/* <DndProvider backend={HTML5Backend}>
            <Columns />
          </DndProvider> */}

      <div className="question">
        <Column count={count} ondrop={(e) => { drop(e); }} ondragover={(e) => { allow(e); }} question={ques} col_class="colA" row_id="select1" isdrag="true" ondragstart={(e) => drag(e)} />
        <Column count={count} ondrop={(e) => { drop(e); }} ondragover={(e) => { allow(e); }} question={ques} col_class="colB" row_id="select2" isdrag="false" />
      </div>

      <button
        type="button"
        onClick={() => {
          saveAns(count);
          addTime(count - 1);
        }}
      >
        Save
      </button>

      {!disappear && count < len ? <button type="button" data-testid="nextButton" onClick={() => { addTime(count - 1); }} className="navButton">Next</button> : null}
      {count > 1 || count >= len ? <button type="button" data-testid="prevButton" onClick={() => { editTime(count); }} className="navButton"> Previous</button> : null}
      <button
        type="button"
        onClick={() => {
          times[count - 1] += counter;
          setDisappear(true);
        }}
        className="navButton"
      >
        End Test
      </button>
    </div>
  );
};

export default ListQues;
