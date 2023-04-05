import { useState } from 'react';
//axios
import axios from 'axios';
//contexts
//import { useMissionsContext } from '../hooks/useMissionsContext';
//import { useAuthContext } from '../hooks/useAuthContext';

const MissionForm = () => {
    const [missionName, setMissionName] = useState('');
    const [date, setDate] = useState('');
    const [importance, setImportance] = useState('');
    const [tasks, setTasks] = useState('');
    const [error, setError] = useState(null)

    //const { dispatch } = useMissionsContext()
    //const { user } = useAuthContext()

    const handleSubmit = (event) => {
        event.preventDefault();

        //if (!user) {
        //    setError('You must be logged in')
        //    return
        //}

        axios.post('/mission/create', {
            missionsName: missionName,
            date: date,
            importance: importance,
            tasks: tasks,
        }, {
            //headers: { 'Authorization': `Bearer ${user.token}` }
        }).then((response) => {
            setMissionName('');
            setDate('');
            setImportance('');
            setTasks('');
            setError(null);
            console.log('New mission added', response.data.mission);
            //dispatch({ type: 'CREATE_MISSION', payload: response.data })
        }).catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex justify-content-center mt-5">
            <div className="col-3">
                <div className="d-flex justify-content-between mb-2">
                    <label htmlFor="missionsName">Mission name</label>
                    <input
                        type="text"
                        placeholder="Enter mission name"
                        name='missionsName'
                        value={missionName}
                        onChange={(e) => setMissionName(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <label htmlFor="date">Mission date</label>
                    <input
                        type="date"
                        name='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <label htmlFor="importance">Importance level</label>
                    <select
                        name="importance"
                        value={importance}
                        onChange={(e) => setImportance(e.target.value)}
                    >
                        <option disabled defaultValue value="0">-- select an option --</option>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label htmlFor="missionTasks">Mission tasks</label>
                    <textarea
                        name="tasks"
                        placeholder="Enter all mission tasks, with a comma seperating them"
                        rows="4"
                        value={tasks}
                        onChange={(e) => setTasks(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button type="submit">Submit</button>
                </div>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
    )
}

export default MissionForm