import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import url from '../utils/api';

var delete_cookie = (name) =>  {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}; // yet to be fixed for removeCookie()

export default function Tests() {
    const [cookie, setCookie] = useCookies(['userdata']);
    const navigate = useNavigate();
    let decoded;

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }
    
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
            delete_cookie("jwt");
            if (submit.status === 200) {
                routeChange();
            }
        }
        catch (err) {
            console.log("Try to logout later!");
        }
    }

    return (
        <div>
            <p>Hi, { decoded.name }</p>
            <form onSubmit={handleSubmit}>
                <button type="submit">Logout</button>
            </form>
        </div>
    );
}