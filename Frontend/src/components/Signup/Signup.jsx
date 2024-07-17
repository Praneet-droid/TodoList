import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
function Signup() {

  const initialFormData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
       
      } );
     
      const result = await response.json();
      if (response.ok) {
        console.log('Signup successful:', result);
        navigate('/login');
        // Handle successful signup (e.g., redirect to login page)
      } else {
        console.error('Signup failed:', result);
        setError(result.message || 'Signup failed');
      }
      setFormData(initialFormData)
      
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again later.');
    }

   
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
       <div className="background-blur"></div>
      <form className="signup-form border p-4 shadow" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Signup</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-4">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" className="form-control " id="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control " id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control " id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-100">Signup</button>
        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
