import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/home/Home.jsx'
import Blog from './views/blog/Blog.jsx'
import Coleccion from './views/coleccion/Coleccion.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <>
      <AuthProvider>
      <BrowserRouter>
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/coleccion" element={<Coleccion/>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    
    </>
  )
}

export default App