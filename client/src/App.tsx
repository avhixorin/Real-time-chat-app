// App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
// Lazy load components

const Login = React.lazy(() => import('./components/sign-in/Signin'));
const Signup = React.lazy(() => import('./components/sign-up/Signup'));
const Dashboard = React.lazy(() => import('./components/dashboard/Chat/Parent'));
const RestyledDashboard = React.lazy(() => import('./components/Dashboard (Restyled))/Dashboard'));
const App: React.FC = () => {
  

  return (
    <Router>
      <div className='w-full h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'>

            <Suspense fallback={<div>Loading...</div>}>
              {/* Routing logic */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/secret-dashboard' element={<RestyledDashboard />} />
              </Routes>
            </Suspense>
      </div>
          
        
    </Router>
  );
};

export default App;
