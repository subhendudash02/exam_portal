import {BrowserRouter, Routes, Route} from "react-router-dom";

import SignIn from '../src/features/Signin/Signin';
import SignUp from '../src/features/Signup/Signup';
import Home from '../src/features/Homepage/Home';
import ListQues from '../src/features/Exam/ListQues';
import Tests from '../src/features/Dashboard/Tests';

import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/signup" element= {<SignUp />} />
          <Route path="/signin" element= { <SignIn /> } />
          <Route exact path="/tests" element= { <Tests /> } />
          <Route exact path="/exam/:test_id" element= { <ListQues /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 
