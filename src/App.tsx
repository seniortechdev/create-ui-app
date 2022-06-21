import { Link, Route, BrowserRouter as Router, Routes, Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Home from './pages/Home';
import InterstateTrade from './pages/InterstateTrade';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StateEconomySearch from './pages/StateEconomySearch';
import StateSearch from './pages/StateSearch';
import * as auth from './api/auth';

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }: any) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export interface User {
  id: number;
}

export interface WithUserProps {
  user: User | null;
}

function App() {
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  useEffect(() => {
    const loadUser = async () => {
      const user = await auth.getCurrentUser();
      console.log('user', user);
      if (!!user) {
        setSessionUser(user);
      }
    };
    loadUser();
  }, []);

  const protectRoute = (Element: JSX.Element, isAllowed: boolean) => {
    return <ProtectedRoute isAllowed={isAllowed} children={Element} />;
  };

  return (
    <Router>
      <div className='App' style={{ margin: '1rem' }}>
        <header className='App-header'>
          <h1>Frontend UI</h1>
        </header>
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
            marginBottom: '1rem',
          }}
        >
          <Link to='/'>Home</Link>| <Link to='/states'>States Search Example</Link>| <Link to='/trade'>Interstate Trade Search</Link>| <Link to='/economy'>State Economy Search</Link>| <Link to='/login'>Login</Link> | <Link to='/signup'>Signup</Link> |{' '}
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/states' element={protectRoute(<StateSearch />, !!sessionUser)} />
          <Route path='/trade' element={protectRoute(<InterstateTrade />, !!sessionUser)} />
          <Route path='/economy' element={protectRoute(<StateEconomySearch />, !!sessionUser)} />

          <Route path='/login' element={protectRoute(<Login />, !sessionUser)} />
          <Route path='/signup' element={protectRoute(<Signup />, !sessionUser)} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
