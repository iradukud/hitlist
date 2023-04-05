import { useEffect } from 'react';
//import axios - enables communication with server
import axios from 'axios';
//import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import SignoutBtn from '../components/SignoutBtn';
import MissionDetails from '../components/MissionDetails';
import MissionForm from '../components/MissionForm'
//contexts
import { useMissionsContext } from '../hooks/useMissionsContext';
//import { useAuthContext } from '../hooks/useAuthContext';

const Missions = () => {
    const { missions, dispatch } = useMissionsContext()

    useEffect(() => {
        const getMissions = async () => {
            await axios.get('/mission/missions',
                {},
                {
                    //headers: { 'Authorization': `Bearer ${user.token}` }
                }).then((response) => {
                    console.log('Data has been received!!', response.data.missions);
                    dispatch({ type: 'SET_MISSIONS', payload: response.data.missions })
                }).catch(() => {
                    console.log('Missions could not be retrieved');
                })
        };

        getMissions();
    }, [dispatch])

    return (
        <div>
            <SignoutBtn />

            <MissionForm />

            <div className='mt-5'>
                {missions && missions.map((mission) => (
                    <MissionDetails key={mission['_id']} mission={mission} />
                ))}
            </div>

        </div>
    )
}


export default Missions;