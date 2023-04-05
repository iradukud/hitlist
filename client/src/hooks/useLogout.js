//contexts
import { useAuthContext } from "./useAuthContext";
import { useMissionsContext } from './useMissionsContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: missionsDispatch } = useMissionsContext();

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch logout account
        dispatch({ type: 'LOGOUT' });
        missionsDispatch({ type: 'SET_MISSIONS', payload: null });
    }
    return { logout }
}