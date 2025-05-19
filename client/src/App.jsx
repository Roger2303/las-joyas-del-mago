import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/home/Home.jsx'
import Blog from './views/blog/Blog.jsx'
import Coleccion from './views/coleccion/Coleccion.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
         <Route path="/coleccion" element={<Coleccion/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App