//import packages
import { useState } from 'react';
import axios from 'axios';
//contexts
import { useMissionsContext } from '../hooks/useMissionsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const MissionForm = () => {
    const [missionName, setMissionName] = useState('');
    const [date, setDate] = useState('');
    const [importance, setImportance] = useState(1);
    const [tasks, setTasks] = useState('');
    const [error, setError] = useState(null)

    const { dispatch } = useMissionsContext()
    const { user } = useAuthContext()

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        axios.post('https://hitlist-api.onrender.com/mission/create', {
            missionsName: missionName,
            date: date,
            importance: importance,
            tasks: tasks,
        }, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            setMissionName('');
            setDate('');
            setImportance(1);
            setTasks('');
            setError(null);
            console.log('New mission added', response.data.mission);
            dispatch({ type: 'CREATE_MISSION', payload: response.data.mission })
        }).catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex justify-content-center mt-5">
            <div className="col-4">
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <label htmlFor="missionsName" className='me-2'>Mission name</label>
                    <input
                        type="text"
                        placeholder="Enter mission name"
                        name='missionsName'
                        value={missionName}
                        onChange={(e) => setMissionName(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <label htmlFor="date" className='me-2'>Mission date</label>
                    <input
                        type="date"
                        name='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <label htmlFor="importance" className='me-2'>Importance level</label>
                    <select
                        name="importance"
                        value={importance}
                        onChange={(e) => setImportance(e.target.value)}
                    >
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <label htmlFor="missionTasks" className='me-2'>Mission tasks</label>
                    <textarea
                        name="tasks"
                        placeholder="Enter all mission tasks, with a comma seperating them"
                        rows="4"
                        value={tasks}
                        onChange={(e) => setTasks(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button
                        type="submit"
                        className='btn btn-lg btn-primary'
                    >Submit
                    </button>
                </div>
                {error && <div className='alert alert-danger' >{error}</div>}
            </div>
        </form>
    )
}

export default MissionForm