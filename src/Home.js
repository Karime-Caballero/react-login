
import { Link, useNavigate } from "react-router-dom";

const Home = () =>{
    const usenavigate=useNavigate();
   
    return(
        <div>
            <div className="header">
                <Link className="btn btn-secondary" to={'/'}>Home</Link>
                <a> </a>
                <a> </a>
                 <Link className="btn btn-secondary" to={'/login'}>cerrar</Link>
            </div>
            <h1>
                home funciona!
                Binvenido</h1>
                <div>
                    
                <a>A la pagina de Karime Alejandra Caballero Campos</a>
              
            </div>
        </div>
    )
}
export default Home;