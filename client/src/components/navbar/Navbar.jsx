import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Inicio</Link> | <Link to="/blog">Blog</Link> | <Link to="/coleccion"> Coleccion </Link>
    </nav>
  )
}

export default Navbar