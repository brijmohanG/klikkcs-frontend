import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Login} from "./component/Login"
import { Register } from './component/registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element ={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
