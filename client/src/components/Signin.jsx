import { Link } from 'react-router-dom';
import React, {useEffect, useRef} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import auth from "../utils/api_auth";

import '../styles/signin_up.css';

export default function SignIn() {
    const email = useRef();
    const password = useRef();
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
        let path = `/tests`;
        navigate(path);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submit = await auth.post("/login", {
                email: email.current.value,
                password: password.current.value
            })
            setCookie("jwt", submit.data.jwt, {path:"/"});
            if (submit.status) {
               routeChange();
            }
        }
        catch (err) {
            console.log("wrong credentials");
        }
    }

    return (
        <React.Fragment>
            <div id="left">
                <form onSubmit={handleSubmit}>
                    <h1 className='heading'>Login to Your Account</h1>
                    <input className="email" type="text" ref={email} placeholder="Email"></input><br />
                    <input className="password" type="password" ref={password} placeholder="Password"></input><br />
                    <button className="submit" type="submit">Login</button>
                </form>
            </div>

            <div id="right">
                <h1 className='heading'>New Student?</h1>
                <p className="para">Sign up now!</p>
                <button className='submit' id="link"><Link to="/signup">Sign Up</Link></button>
            </div>
        </React.Fragment>
    );
}