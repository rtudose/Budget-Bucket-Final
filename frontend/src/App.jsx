import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import useAuthStore from './features/auth/authStore';

function App() {

  const checkUser = useAuthStore((state) => state.checkUser);

  // Run once on mount
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <>
      <Router>
        <div className='container mx-auto px-4'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;