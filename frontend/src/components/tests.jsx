import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import url from '../utils/api';
import { useEffect } from 'react';

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
        <div>
            <p>Hi, { decoded ? decoded.name : null } </p>
            <form onSubmit={handleSubmit}>
                <button type="submit">Logout</button>
            </form>
        </div>
    );
}