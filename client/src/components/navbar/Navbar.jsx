import { Link } from 'react-router-dom'

const Navbar = () => {
  return ( 
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Las Joyas del Mago </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" > Inicio </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog"> Blog</Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to="/coleccion"> Colección </Link>
            </li>
    
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar

  {/* <nav>
    Link to="/">Inicio</Link> | <Link to="/blog">Blog</Link> | <Link to="/coleccion"> Coleccion </Link>
    </nav> */}