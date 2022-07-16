import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import jwt from 'jwt-decode';
import auth from '../../utils/apiAuth';
import link from '../../utils/apiExam';

import './Tests.scss';

const currTime = Math.floor(new Date().getTime());

const StudentDB = () => {
  const [cookie, setCookie] = useCookies(['userdata']);
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  let decoded;

  const fn = async () => {
    await link.get('/exams/').then(
      (res) => {
        setArray(res.data);
      },
    );
  };

  useEffect(() => {
    fn();
    if (cookie.jwt === '') {
      navigate('/signin');
    }
  }, [cookie, navigate]);

  try {
    decoded = jwt(cookie.jwt);
  } catch (err) {
    // eslint-disable-next-line no-alert
    alert('Not signed in!');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submit = await auth.post('/logout', {});
      setCookie('jwt', '', { path: '/' });
      if (submit.status === 200) {
        navigate('/');
      }
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Try to logout later!');
    }
  };

  return (
    <div className="tests">
      <div className="navbar">
        <form onSubmit={handleSubmit}>
          <button className="logout" type="submit" data-testid="getLogout">Logout</button>
        </form>
      </div>
      <div className="list">
        <h3>Hi, { decoded ? decoded.name : null } </h3>

        {array.map((test) => {
          const startTime = new Date(test.start.slice(0, test.start.length - 1)).getTime();
          const endTime = new Date(test.end.slice(0, test.start.length - 1)).getTime();
          return (
            <div key={test.test_id} className="available_tests">
              <h2>{test.test_name}</h2>
              <p><strong>Faculty: </strong>{test.teacher_name}</p>
              <p><strong>Start: </strong>{test.start}</p>
              <p><strong>End: </strong>{test.end}</p>
              <p>{test.category}</p>
              {startTime <= currTime && endTime >= currTime
                ? <Link to={`/exam/${test.test_id}`} state={{ test }}><button type="button" className="start">Start</button></Link>
                : <i>Not available</i>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentDB;
