import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import jwt from 'jwt-decode';
import auth from '../utils/api_auth';
import link from '../utils/api_exam';

import "../styles/tests.css";

const currTime = Math.floor(new Date().getTime());

export default function Tests() {
    const [cookie, setCookie] = useCookies(['userdata']);
    const navigate = useNavigate();
    const [array, setArray] = useState([]);
    let decoded;

    const fn = async () => {
        await link.get("/exams/").then(
            (res) => {
                setArray(res.data);
            }
        );
    }

    useEffect(() => {
        fn();
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
                
                {array.map((test) => {
                    console.log(test.test_id);
                    let startTime = new Date(test.start.slice(0, test.start.length-1)).getTime();
                    let endTime = new Date(test.end.slice(0, test.start.length-1)).getTime();
                    return (
                        <div key={test.test_id} className="available_tests">
                            <h2>{test.test_name}</h2>
                            <p><strong>Faculty: </strong>{test.teacher_name}</p>
                            <p><strong>Start: </strong>{test.start}</p>
                            <p><strong>End: </strong>{test.end}</p>
                            <p>{test.category}</p>
                            {startTime <= currTime && endTime >= currTime ? 
                                <Link to={`/exam/${test.test_id}`} state={{test: test}}><button className='start'>Start</button></Link> : 
                                <i>Not available</i>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
