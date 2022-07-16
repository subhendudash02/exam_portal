import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from './features/StudentSignin/Signin';
import SignUp from './features/StudentSignup/Signup';
import Home from './features/Homepage/Home';
import ListQues from './features/StudentExam/ListQues';
import StudentDB from './features/StudentDashboard/StudentDB';

import './App.scss';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route exact path="/tests" element={<StudentDB />} />
        <Route exact path="/exam/:test_id" element={<ListQues />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
