import {useState, useEffect} from 'react'; 

let endTime = new Date('Jun 8, 2022 21:00:00').getTime();
let arr = [];
let toShow = false;

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
        </div>
    );
}