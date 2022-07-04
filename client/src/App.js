import './styles/App.css';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Home from './components/Home';
import ListQues from './components/ListQues';
import Tests from './components/Tests';
import {BrowserRouter, Routes, Route} from "react-router-dom";

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
