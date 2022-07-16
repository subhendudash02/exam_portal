import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';

import auth from '../../utils/apiAuth';

import './Signin.scss';

const SignIn = () => {
  const email = useRef();
  const password = useRef();
  const [cookie, setCookie] = useCookies(['userdata']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.jwt === undefined) {
      setCookie('jwt', '', { path: '/' });
    } else if (cookie.jwt !== '') {
      navigate('/tests');
    }
  });

  const routeChange = () => {
    let path = '/tests';
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submit = await auth.post('/login', {
        email: email.current.value,
        password: password.current.value,
      });
      setCookie('jwt', submit.data.jwt, { path: '/' });
      if (submit.status) {
        routeChange();
      }
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('wrong credentials');
    }
  };

  return (
    <div>
      <div id="left">
        <form onSubmit={handleSubmit}>
          <h1 className="heading">Login to Your Account</h1>
          <input className="email" type="text" ref={email} placeholder="Email" /><br />
          <input className="password" type="password" ref={password} placeholder="Password" /><br />
          <button className="submit" data-testid="getSignin" type="submit">Login</button>
        </form>
      </div>

      <div id="right">
        <h1 className="heading">New Student?</h1>
        <p className="para">Sign up now!</p>
        <button type="button" className="submit" id="link" data-testid="getSignup"><Link to="/signup">Sign Up</Link></button>
      </div>
    </div>
  );
};

export default SignIn;
