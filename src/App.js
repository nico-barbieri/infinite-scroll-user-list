import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Style
import './App.css'

//Components
import Header from './components/Header';

//Pages
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UserInfo from './pages/UserInfo';
import UserList from './pages/UserList';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='*' element={<NotFound />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/users' element={<UserList />}/>
        <Route path='/users/:username' element={<UserInfo />}/>
        <Route path='/about' element={<AboutUs />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;