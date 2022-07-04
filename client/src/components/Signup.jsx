import { Link } from 'react-router-dom';
import React, {useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../styles/signin_up.css';
import auth from "../utils/api_auth";

export default function SignUp() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const repass = useRef();
    const [cookie, setCookie] = useCookies(['userdata']);

    const navigate = useNavigate();

    useEffect(() => {
        if (cookie.jwt === undefined) {
            setCookie("jwt", "", {path : "/"});
        }
        else if (cookie.jwt !== "") {
            navigate("/tests");
        }
    });

    const routeChange = () => {
        let path = `/signin`;
        navigate(path);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password.current.value === repass.current.value) {
                const submit = await auth.post("/register", {
                    name: name.current.value,
                    email: email.current.value,
                    password: password.current.value
                })
                if (submit.status === 200) {
                   routeChange();
                }
            }
            
        }
        catch (err) {
            console.log(err.response.request.responseText);
        }
    }

    return (
        <React.Fragment>
            <div id="right2">
                <form onSubmit={handleSubmit}>
                    <h1 className='heading'>Register</h1>
                    <input className="name" type="text" ref={ name } placeholder="Full Name"></input><br />
                    <input className="email" type="text" ref={ email } placeholder="Email"></input><br />
                    <input className="password" type="password" ref={ password } placeholder="Password"></input><br />
                    <input className="password" type="password" ref={ repass } placeholder="Retype Password"></input>< br/>
                    <button className="submit" type="submit">Register</button>
                </form>
            </div>

            <div id="left2">
                <h1 className='heading'>Already have an account?</h1>
                <button className='submit' id="link"><Link to="/signin">Sign In</Link></button>
            </div>
        </React.Fragment>
    );
}