import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home">
            <h1>Welcome to the portal</h1>
            <Link to="/signin">Sign In</Link><br />
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}