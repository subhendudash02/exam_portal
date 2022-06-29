import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import jwt from 'jwt-decode';
import auth from '../utils/api_auth';
import link from '../utils/api_exam';
import { useEffect } from 'react';
import "../styles/tests.css";

const currTime = Math.floor(new Date().getTime());

export default function Tests() {
    const [cookie, setCookie] = useCookies(['userdata']);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [test, setTest] = useState([]);
    const navigate = useNavigate();
    let decoded;

    useEffect(() => {
        link.get("/exams/5/").then(
            (res) => {
                setStartTime(new Date(res.data.start.slice(0, res.data.start.length-1)).getTime());
                setEndTime(new Date(res.data.end.slice(0, res.data.end.length-1)).getTime());
                setTest(res.data);
            }
        );
        if (cookie.jwt === "") {
            navigate("/signin");
        }
    }, [cookie, navigate]); 
    
    try {
        decoded = jwt(cookie.jwt);
    }
    catch (err) {
        console.log("Not signed in!");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submit = await auth.post("/logout", {});
            setCookie("jwt", "", {path : "/"});
            if (submit.status === 200) {
                navigate("/");
            }
        }
        catch (err) {
            console.log("Try to logout later!");
        }
    }

    return (
        <div className='tests'>
            <div className="navbar">
                <form onSubmit={handleSubmit}>
                    <button className='logout' type="submit">Logout</button>
                </form>
            </div>
            <div className="list">
                <h3>Hi, { decoded ? decoded.name : null } </h3>
                {/* {list.map((e) => {
                    return (
                        <div key={e.test_id} className="available_tests">
                            <h2>{e.test_name}</h2>
                            <p><strong>Start: </strong>{e.start}</p>
                            <p><strong>End: </strong>{e.end}</p>
                            {Math.floor(new Date(e.start).getTime() / 1000) <= currTime && 
                            Math.floor(new Date(e.end).getTime() / 1000) >= currTime ? 
                                <button className='start'><Link to="/exam">Start</Link></button> : 
                                <i>Not available</i>
                            }
                        </div>
                    )
                })} */}

                <div key={test.test_id} className="available_tests">
                    <h2>{test.test_name}</h2>
                    <p><strong>Faculty: </strong>{test.teacher_name}</p>
                    <p><strong>Start: </strong>{test.start}</p>
                    <p><strong>End: </strong>{test.end}</p>
                    <p>{test.category}</p>
                    {startTime <= currTime && endTime >= currTime ? 
                        <button className='start'><Link to="/exam">Start</Link></button> : 
                        <i>Not available</i>
                    }
                </div> 
            </div>
        </div>
    );
}