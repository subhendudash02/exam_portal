import React, {useRef, useState} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css';
import url from "../utils/api";

export default function SignIn() {
    const email = useRef();
    const password = useRef();

    const navigate = useNavigate();

    const routeChange = () => {
        let path = `/tests`;
        navigate(path);
    }

    const [name, setName] = useState("");
    const [cookie, setCookie] = useCookies(['userdata']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submit = await url.post("/login", {
                email: email.current.value,
                password: password.current.value
            })
            setCookie("jwt", submit.data.jwt, {path:"/"});
        }
        catch (err) {
            console.log("wrong credentials");
        }
    }

    return (
        <div className="signin">
            <form onSubmit={handleSubmit}>
                <h1 className='signinHeading'>Sign In</h1>
                <p>Email: </p>
                <input type="text" ref={email}></input><br />
                <p>Password: </p>
                <input type="password" ref={password}></input><br />
                <button type="submit" onClick={routeChange}>Login</button>
            </form>
        </div>
    );
}