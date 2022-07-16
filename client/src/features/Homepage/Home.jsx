import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => (
  <div>
    <h1 className="heading">Welcome to the portal</h1>
    <p className="para">One place for all exams!</p>
    <button type="button" className="signin" data-testid="getSignin"><Link to="/signin">Sign In</Link></button>
  </div>
);

export default Home;
