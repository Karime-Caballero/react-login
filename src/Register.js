import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { toast } from "react-toastify";


const Register = () => {

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[password,passwordchange]=useState("");
    const[email,emailchange]=useState("");
    
    const navigate=useNavigate();

const IsVaidate=()=>{
    let isproceed=true;
    let errormessage = 'rellene correctamente el campo';
    if (id === null || id === ''){
        isproceed = false;
        errormessage += ' Nombre';
    }
    if (name === null || name === ''){
        isproceed = false;
        errormessage += ' Apellidos';
    }
    if (email === null || email === ''){
        isproceed = false;
        errormessage += ' Correo';
    }
    if (password === null || password === ''){
        isproceed = false;
        errormessage += ' Contraseña';
    }

    if(!isproceed){
        toast.warning(errormessage)
    }else{
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

        }else{
            isproceed = false;
            toast.warning('Inserte un correo valido')
        }
    }
    return isproceed;
    
}


    const handlesubmit=(e)=>{
        
      e.preventDefault();
      let regobj={id,name,password,email};
      if(IsVaidate()){
      //console.log(regobj);
      fetch("http://localhost:8000/user",{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(regobj)

      }).then((res)=>{
        toast.success('Registro exitoso')
        navigate('/login');

      }).catch((err)=>{
        toast.error('Failed: '+err.message);

      });
    }
    }
    return ( 
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                        <h1> Registro Usuario</h1>
                        </div>
                        <div className="card-body">
                           
                        <div className="row">
                            <div className="col-lg-6"></div>
                            <div className="form-group">
                                <label>Nombre de usuario<span className="errmsg">*</span></label>
                                <input  value={id} onChange={e=>idchange(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="col-lg-6"></div>
                            <div className="form-group">
                                <label>Apellidos<span className="errmsg">*</span></label>
                                <input value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                            </div>


                            <div className="col-lg-6"></div>
                            <div className="form-group">
                                <label>correo <span className="errmsg">*</span></label>
                                <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                            </div>

                            <div className="col-lg-6"></div>
                            <div className="form-group">
                                <label>Contraseña <span className="errmsg">*</span></label>
                                <input value={password} onChange={e=>passwordchange(e.target.value)} type="password" className="form-control"></input>
                            </div>
                        </div>
                     </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Registrate</button>
                            <a>     </a>
                            <Link className="btn btn-black" to={'/login'}>Regresar</Link>
                        </div>
                    </div>

                </form>
            </div>

           
        </div>
     );
}
 
export default Register;