import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import url from '../utils/api';

export default function Tests() {
    const [cookie, setCookie, removeCookie] = useCookies(['userdata']);
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
        console.log(err);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submit = await url.post("/logout", {});
            removeCookie('userdata');
        }
        catch (err) {
            console.log("wrong credentials");
        }
    }

    return (
        <div>
            <p>Hi, { decoded.name }</p>
            <form onSubmit={handleSubmit}>
                <button type="submit" onClick={routeChange}>Logout</button>
            </form>
        </div>
    );
}