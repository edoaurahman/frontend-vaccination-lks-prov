import { Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './component/Navigation';
import Login from './pages/Login';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import { API_URL } from './utils/API_URL';
import Dashboard from './pages/Dashboard';
import Consultation from './pages/Consultation';
import Footer from './component/Footer';
import Registration from './pages/Registration';
import SpotDetail from './pages/SpotDetail';

function App() {
  const navigate = useNavigate()
  function getUser() {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"))
    }
  }
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login")
    }
  }, [navigate])
  function postLogin(data) {
    axios.post(API_URL + '/v1/auth/login', data)
    .then(res => {
        if (res.data.status === "200") {
          localStorage.setItem("user", JSON.stringify(res.data.data))
          setUser(res.data.data)
          navigate('/dashboard')
        }else{
          alert(res.data.message)
        }
    })
  }
  const [user,setUser] = useState(getUser)

  return (
    <div>
        <Navigation user={user} setUser={setUser} />
        <Routes>
          <Route path='/login' element={<Login user={user} setUser={setUser} postLogin={postLogin} />} />
          <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser} postLogin={postLogin} />} />
          <Route path='/consultation' element={<Consultation user={user} setUser={setUser} postLogin={postLogin} />} />
          <Route path='/registration' element={<Registration user={user} setUser={setUser} postLogin={postLogin} />} />
          <Route path='/spot/:id' element={<SpotDetail user={user} setUser={setUser} postLogin={postLogin} />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
