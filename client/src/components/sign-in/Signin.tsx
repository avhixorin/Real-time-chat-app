import React, { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginUser } from '../../Redux/features/userSlice';
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(loginFormData)
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormData), // Send the login data
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      dispatch(setLoginUser(data));
      console.log('This is the login request');
      navigate('/dashboard');
      // Handle success (e.g., redirect, save token, etc.)
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error (e.g., show error message)
    }
  };
  

  return (
    <div className="absolute flex justify-center items-center bg-gray-100 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        {/* Email Input */}
        <TextField
          label="Email Address"
          name="email"
          type="email"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          className="mb-4"
          value={loginFormData.email}
          InputLabelProps={{
            className: 'text-gray-600',
          }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          onChange={handleChange}
          fullWidth
          className="mb-6"
          value={loginFormData.password}
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

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mb-4"
          onClick={handleSubmit}
        >
          Log In
        </Button>

        {/* Forgot Password and Signup Link */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <a href="/forgot-password" className="text-blue-600">Forgot Password?</a>
          <a href="/signup" className="text-blue-600">Create an Account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
