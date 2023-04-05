import './App.css';
//react router dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//pages
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';
import Missions from './pages/Missions';
//context
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div>
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={!user ? <Home /> : <Navigate to='/missions' />}
            />
            <Route
              path='/signin'
              element={!user ? <SignIn /> : <Navigate to='/missions' />}
            />
            <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/missions' />}
            />
            <Route
              path='/missions'
              element={user ? <Missions /> : <Navigate to='/' />}
            />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;