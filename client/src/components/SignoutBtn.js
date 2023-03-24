//import page routing w/o sending new server request
import { useNavigate } from 'react-router-dom';
//import signot from react auth kit
import { useSignOut } from 'react-auth-kit';
//import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';

function Logout() {
    const singOut = useSignOut();
    const navigate = useNavigate();

    const logout = () => {
        singOut();
        navigate("/signin")
    }

    return (
        <div className='position-fixed top-0 end-0 mt-2 me-2'>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Logout;