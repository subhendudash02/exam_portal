import './styles/App.css';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Home from './components/home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Tests from './components/tests';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/signup" element= {<SignUp />} />
          <Route path="/signin" element= {<SignIn />} />
          <Route path="/tests" element= {<Tests />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
