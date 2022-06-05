import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css';
import url from "../utils/api";

export default function SignUp() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const repass = useRef();

    const navigate = useNavigate();

    const routeChange = () => {
        let path = `/signin`;
        navigate(path);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password.current.value === repass.current.value) {
                const submit = await url.post("/register", {
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
        <div className="signin">
            <form onSubmit={handleSubmit}>
                <h1 className='signinHeading'>Sign Up</h1>
                <p>Full Name: </p>
                <input type="text" ref={ name }></input><br />
                <p>Email: </p>
                <input type="text" ref={ email }></input><br />
                <p>Password: </p>
                <input type="password" ref = { password }></input><br />
                <p>Retype Password: </p>
                <input type="password" ref={ repass }></input>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}