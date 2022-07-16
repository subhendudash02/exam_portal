/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import parse from 'html-react-parser';

import saveState from '../../utils/ansState';

// template for the column object
const Row = (props) => (
  <div
    id={props.id}
    className={props.class}
    draggable={props.isdrag}
    onDragStart={props.ondragstart}
  >
    <h3>{props.content}</h3>
  </div>
);

const Column = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { question } = props;
  const c = props.count;
  return (
    <div
      className={props.col_class}
      onDrop={props.ondrop}
      onDragOver={props.ondragover}
    >
      {question.map((e, i) => {
        if (i === (c - 1)) {
          if (i in saveState) {
            return (
              <div
                key={i}
                onDrop={props.ondrop}
                onDragOver={props.ondragover}
              >
                {props.col_class === 'colA' ? parse(saveState[i].colA) : null}
                {props.col_class === 'colB' ? parse(saveState[i].colB) : null}
              </div>
            );
          }

          let arr = props.col_class === 'colA' ? e.colA : e.colB;
          arr = arr.split(', ');
          return (
            <div key={i}>
              {arr.map((p, ind) => (
                <Row
                  key={ind}
                  id={props.row_id}
                  class={`box${ind + 1}`}
                  isdrag={props.isdrag}
                  content={p}
                  ondragstart={props.ondragstart}
                />
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Column;
