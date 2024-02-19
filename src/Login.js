import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            
            fetch("http://localhost:8000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                //console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Inserta un Nombre valido');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username',username);
                        sessionStorage.setItem('userrole',resp.role);
                        usenavigate('/Home')
                    }else{
                        toast.error('Porfavor inserta bien los datos');
                    }
                }
            }).catch((err) => {
                toast.error('Login fallo por :' + err.message);
            });
        }
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
           
            let inputobj={"username": username,
            "password": password};
            fetch("https://localhost:44308/User/Authenticate",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                }else{
                     toast.success('Success');
                     sessionStorage.setItem('username',username);
                     sessionStorage.setItem('jwttoken',resp.jwtToken);
                   usenavigate('/')
                }
                
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Ingresar</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Ingresa tu nombre de usuario <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Contraseña <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Ingresar</button> |
                            <Link className="btn btn-black" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;