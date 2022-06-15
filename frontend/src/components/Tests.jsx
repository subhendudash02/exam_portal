import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import url from '../utils/api';
import { useEffect } from 'react';
import "../styles/tests.css";
import list from '../utils/question';

export default function Tests() {
    const [cookie, setCookie] = useCookies(['userdata']);
    const navigate = useNavigate();
    let decoded;

    useEffect(() => {
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
            const submit = await url.post("/logout", {});
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
                {list.map((e) => {
                    return (
                        <div key={e.test_id} className="available_tests">
                            <h2>{e.test_name}</h2>
                            <p><strong>Start: </strong>{e.start}</p>
                            <p><strong>End: </strong>{e.end}</p>
                            {Math.floor(new Date(e.start).getTime() / 1000) <= Math.floor(new Date().getTime() / 1000) ? 
                                <button className='start'><Link to="/exam">Start</Link></button> : <i>Not available</i>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}