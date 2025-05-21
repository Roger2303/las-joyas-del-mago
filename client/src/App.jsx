import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/home/Home.jsx'
import Blog from './views/blog/Blog.jsx'
import Coleccion from './views/coleccion/Coleccion.jsx'
import Carousel from './components/carousel/Carousel.jsx'

function App() {
  return (
    <>
      <Carousel/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/coleccion" element={<Coleccion/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App