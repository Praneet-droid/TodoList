import "./App.css";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Todo from "./components/Todo";
import Signup from "./components/Signup/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";

import { Provider } from "react-redux";
import store from './store/store'

function App() {


  return (
    <>
    <Provider store={store}>
    <Router>
         <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/todo" element={<Todo/>} />
        
      </Routes>
      </Router>
    
      </Provider>
    </>
  );
}

export default App;
