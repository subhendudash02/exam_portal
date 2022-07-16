import { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import auth from '../../utils/apiAuth';

import './Signup.scss';

const SignUp = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const repass = useRef();
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
    const path = '/signin';
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.current.value === repass.current.value) {
        const submit = await auth.post('/register', {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
        });
        if (submit.status === 200) {
          routeChange();
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.response.request.responseText);
    }
  };

  return (
    <div>
      <div id="right2">
        <form onSubmit={handleSubmit}>
          <h1 className="heading">Register</h1>
          <input className="name" type="text" ref={name} placeholder="Full Name" /><br />
          <input className="email" type="text" ref={email} placeholder="Email" /><br />
          <input className="password" type="password" ref={password} placeholder="Password" /><br />
          <input className="password" type="password" ref={repass} placeholder="Retype Password" /><br />
          <button className="submit" type="submit" data-testid="getRegister">Register</button>
        </form>
      </div>

      <div id="left2">
        <h1 className="heading">Already have an account?</h1>
        <button type="button" className="submit" id="link" data-testid="getSignin"><Link to="/signin">Sign In</Link></button>
      </div>
    </div>
  );
};

export default SignUp;
