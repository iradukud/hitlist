import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit';

//pages
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';
import Missions from './pages/Missions';


function App() {
  const isAuthenticated = useIsAuthenticated()
  console.log(isAuthenticated())

  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/missions' element={<Missions />} />
      </Routes>
    </main>
  );
}

export default App;

//<RequireAuth loginPath='/signin'>
//<Missions />
//</RequireAuth>} />
