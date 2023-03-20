import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'


//pages
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;