import parse from "html-react-parser";

import saveState from "../utils/ans_state";

// template for the column object
function Row(props) {
    return (
        <div 
            id={props.id}
            className={props.class}
            draggable={props.isdrag}
            onDragStart={props.ondragstart}>
        <h3>{props.content}</h3>
        </div>
    );
}

export default function Column(props) {
    const question = props.question;
    const c = props.count;
    return (
        <div 
            className={props.col_class}
            onDrop={props.ondrop}
            onDragOver={props.ondragover}>
                {question.map((e, i) => {
                    if (i === (c - 1)) {
                        if (i in saveState) {
                            return (
                                <div key={i} onDrop={props.ondrop}
                                onDragOver={props.ondragover}>
                                    {props.col_class === "colA" ? parse(saveState[i].colA) : null}
                                    {props.col_class === "colB" ? parse(saveState[i].colB) : null}
                                </div>
                            );
                        }
                        else {
                            let arr = props.col_class === "colA" ? e.colA : e.colB;
                            arr = arr.split(", ");
                            return (
                                <div key={i}>
                                    {arr.map((e, ind) => {
                                        return (
                                            <Row key={ind} id={props.row_id} class={"box" + (ind + 1)} 
                                            isdrag={props.isdrag} content={e} ondragstart={props.ondragstart} />
                                        );
                                    })}
                                </div>
                            );
                        }
                    }
                })}
        </div>
    );
}