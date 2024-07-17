import { useState } from "react";
import "./Login.css"; // Assuming you will add styles here
import { useNavigate } from 'react-router-dom';
import { setUserId } from "../../store/AuthSlice";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
 const dispatch=useDispatch();
  const initialLoginData = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(initialLoginData);
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
     
      });

      const result = await response.json();

  
      if (response.ok) {
       
        const { userId } = result; // Adjust according to your server response
      
        setLoginData(initialLoginData);
        
       dispatch(setUserId(userId)); // Pass userId to fetchTodos
        navigate('/todo');
      } else {
        console.error('Login failed:', result);
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };
  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="background-blur"></div>
      <form className="login-form border p-4 shadow" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onChangeHandler}
            id="email"
            value={loginData.email}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onChangeHandler}
            id="password"
            value={loginData.password}
            required
          />
        </div>
        <div className="mb-4 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-100">
          Submit
        </button>
        <div className="text-center mt-3">
          <a href="#">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
