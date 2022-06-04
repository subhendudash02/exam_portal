import '../styles/signin.css';

export default function SignUp() {
    return (
        <div className="signin">
            <h1 className='signinHeading'>Sign Up</h1>
            <p>Full Name: </p>
            <input type="text"></input><br />
            <p>Email: </p>
            <input type="text"></input><br />
            <p>Password: </p>
            <input type="password"></input><br />
            <p>Retype Password: </p>
            <input type="password"></input>
        </div>
    );
}