//import packages
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
//import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import SignoutBtn from '../components/SignoutBtn';
import MissionDetails from '../components/MissionDetails';
import MissionForm from '../components/MissionForm'
//contexts
import { useMissionsContext } from '../hooks/useMissionsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Missions = () => {
    const { missions, dispatch } = useMissionsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const getMissions = async () => {
            await axios.get('https://hitlist-api.onrender.com/mission/missions',
                {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                }).then((response) => {
                    console.log('Data has been received!!', response.data.missions);
                    dispatch({ type: 'SET_MISSIONS', payload: response.data.missions })
                }).catch(() => {
                    console.log('Missions could not be retrieved');
                })
        };

        getMissions();
    }, [dispatch, user])

    return (
        <>
        <Helmet>
        <title>{'Hitlist - Mission'}</title>
      </Helmet>

        <div>
            <SignoutBtn />

            <MissionForm />

            <div className='d-flex justify-content-center row mt-5 px-5'>
                {missions && missions.map((mission) => (
                    <MissionDetails key={mission['_id']} mission={mission} />
                ))}
            </div>

        </div>
        </>
    )
}


export default Missions;