import { Link } from 'react-router-dom';

import '../styles/App.css';

export default function Home() {
    return (
        <div className="home">
            <h1 className='heading'>Welcome to the portal</h1>
            <p className="para">One place for all exams!</p>
            <button className="signin"><Link to="/signin">Sign In</Link></button>
        </div>
    );
}