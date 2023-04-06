//import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
//hooks
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Logout() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout()
        if (!user) {
            window.location = '/';
        }
    }

    return (
        <div className='position-fixed top-0 end-0 mt-2 me-2'>
            <button
                type='button'
                className='btn btn-lg btn-primary'
                onClick={handleClick}
            >
                Logout
            </button>
        </div>
    )
}

export default Logout;