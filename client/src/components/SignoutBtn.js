//import page routing w/o sending new server request
import { useNavigate } from 'react-router-dom';
//import axios - enables communication with server
import axios from 'axios';
//import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';

function Logout() {
    const logout = async () => {
        try {
            console.log('signout')
        } catch (err) {
            console.log(err)
        };
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