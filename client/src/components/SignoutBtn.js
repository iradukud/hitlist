//import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
//hooks
import { useLogout } from '../hooks/useLogout';

function Logout() {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
        window.location = '/';
    }

    return (
        <div className='position-fixed top-0 end-0 mt-2 me-2'>
            <button onClick={handleClick}>
                Logout
            </button>
        </div>
    )
}

export default Logout;