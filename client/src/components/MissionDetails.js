import { useState } from 'react';
//axios
import axios from 'axios';
//bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
//components
import EditMission from './EditMission';
import EditTask from './EditTask';
import AddTask from './AddTask';
//context
//import { useAuthContext } from '../hooks/useAuthContext';
//import { useMissionsContext } from '../hooks/useMissionsContext';

const MissionDetails = ({ mission }) => {
    const [error, setError] = useState(null);
    //const { dispatch } = useMissionsContext();
    //const { user } = useAuthContext();

    const deleteMission = (missionId) => {
        //if (!user) {
        //    setError('You must be logged in')
        //    return
        //}

        axios.delete(`/mission/deleteMission/${missionId}`, {
        }, {
            //headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            console.log('mission deleted', response.data.mission);
            //dispatch({ type: 'DELETE_MISSION', payload: response.data })
        }).catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    }

    const deleteTask = ([missionId, task]) => {
        //if (!user) {
        //    setError('You must be logged in')
        //    return
        //}

        axios.delete(`/task/delete/${missionId}/${task}`, {
        }, {
            //headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            console.log('Task deleted', response.data.mission);
            //dispatch({ type: 'EDIT_MISSION', payload: response.data.mission })
        }).catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    }

    const markCompletion = ([missionId, task]) => {
        //if (!user) {
        //    setError('You must be logged in')
        //    return
        //}

        axios.put(`/task/markCompletion/${missionId}`, {
            task: task,
        }, {
            //headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            console.log('Task completion status changed', response.data.mission);
            //dispatch({ type: 'EDIT_MISSION', payload: response.data })
        }).catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    }

    return (
        <div>
            <h3 >{'Mission: '}
                <span className={mission.importance === 1 ? "low" : mission.importance === 2 ? 'medium' : 'high'}>{mission['mission']}</span>

                <EditMission missionId={mission['_id']} name={mission['mission']} date={mission['date']} importance={mission['importance']}/>
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteMission(mission['_id'])} />
            </h3>
            <ul>
                {mission.tasks.map((task, index) => {
                    return <li key={index} >
                        <span className={task.completed === true ? ' completed' : 'not'}>{task.task}</span>

                        {
                            task.completed ?
                                <FontAwesomeIcon icon={faXmark} onClick={() => markCompletion([mission['_id'], task.task])} />
                                : <FontAwesomeIcon icon={faCheck} onClick={() => markCompletion([mission['_id'], task.task])} />
                        }
                        <EditTask missionId={mission['_id']} task={task.task} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask([mission['_id'], task.task])} />
                    </li>
                })}
                {error && <div className='error'>{error}</div>}
                <AddTask missionId={mission['_id']} />
            </ul>
        </div>
    )
}

export default MissionDetails