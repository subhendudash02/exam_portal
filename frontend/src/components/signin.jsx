import React, {useRef} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css';
import url from "../utils/api";

export default function SignIn() {
    const email = useRef();
    const password = useRef();
    const [cookie, setCookie] = useCookies(['userdata']);

    const navigate = useNavigate();

    const routeChange = () => {
        let path = `/tests`;
        navigate(path);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submit = await url.post("/login", {
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
        <div className="signin">
            <form onSubmit={handleSubmit}>
                <h1 className='signinHeading'>Sign In</h1>
                <p>Email: </p>
                <input type="text" ref={email}></input><br />
                <p>Password: </p>
                <input type="password" ref={password}></input><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}