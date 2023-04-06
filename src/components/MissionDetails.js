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
import { useMissionsContext } from '../hooks/useMissionsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const MissionDetails = ({ mission }) => {
    const [error, setError] = useState(null);
    const { dispatch } = useMissionsContext();
    const { user } = useAuthContext();

    const deleteMission = (missionId) => {
        if (!user) {
            setError('You must be logged in')
            return
        }

        axios.delete(`/mission/deleteMission/${missionId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            console.log('mission deleted', response.data.mission);
            dispatch({ type: 'DELETE_MISSION', payload: response.data.mission })
        }).catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    }

    const deleteTask = ([missionId, task]) => {
        if (!user) {
            setError('You must be logged in')
            return
        }

        axios.delete(`/task/delete/${missionId}/${task}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            console.log('Task deleted', response.data.mission);
            dispatch({ type: 'EDIT_MISSION', payload: response.data.mission })
        }).catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    }

    const markCompletion = ([missionId, task]) => {
        if (!user) {
            setError('You must be logged in')
            return
        }

        axios.put(`/task/markCompletion/${missionId}`, {
            task: task,
        }, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            console.log('Task completion status changed', response.data.mission);
            dispatch({ type: 'EDIT_MISSION', payload: response.data.mission })
        }).catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    }

    return (
        <div className={`col-md-4 text-center ${mission.importance === '1' ? "low" : mission.importance === '2' ? 'medium' : 'high'}`}>
            <h3 >{`Mission: ${mission['mission']}`}
                <EditMission missionId={mission['_id']} name={mission['mission']} date={mission['date']} importance={mission['importance']} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteMission(mission['_id'])} />
            </h3>
            <ul className="list-unstyled">
                {mission.tasks.map((task, index) => {
                    return <li className='d-flex justify-content-around align-items-baseline' key={index} >
                        <div>
                            {task.completed ? <span><s>{task.task}</s></span> : <span>{task.task}</span>}
                        </div>
                        <div>
                            {
                                task.completed ?
                                    <FontAwesomeIcon icon={faXmark} onClick={() => markCompletion([mission['_id'], task.task])} />
                                    : <FontAwesomeIcon icon={faCheck} onClick={() => markCompletion([mission['_id'], task.task])} />
                            }
                            <EditTask missionId={mission['_id']} task={task.task} />
                            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask([mission['_id'], task.task])} />
                        </div>
                    </li>
                })}
                {error && <div className='alert alert-danger'>{error}</div>}
                <AddTask missionId={mission['_id']} />
            </ul>
        </div>
    )
}

export default MissionDetails