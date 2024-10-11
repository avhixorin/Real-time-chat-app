import React from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup:React.FC = () => {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the
      })

      if(!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();

      console.log('Signup successful', data);
      navigate('/login');


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="absolute bg-gray-100 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>
        
        {/* Name Input */}
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="mb-4"
          InputLabelProps={{
            className: 'text-gray-600'
          }}
        />
        
        {/* Email Input */}
        <TextField
          label="Email Address"
          type="email"
          variant="outlined"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          fullWidth
          className="mb-4"
          InputLabelProps={{
            className: 'text-gray-600'
          }}
        />
        
        {/* Password Input */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="mb-4"
          InputLabelProps={{
            className: 'text-gray-600'
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        {/* Confirm Password Input */}
        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          className="mb-6"
          InputLabelProps={{
            className: 'text-gray-600'
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        {/* Signup Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type='submit'
          onSubmit={handleSubmit}
          className="mb-4"
        >
          Sign Up
        </Button>
        
        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600">
          Already have an account? 
          <a href="/login" className="text-blue-600 ml-1">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
